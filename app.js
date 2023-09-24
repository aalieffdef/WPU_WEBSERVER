const express = require('express')
const {
  loadKontak,
  findContact,
  addContact,
  cekDuplikat
} = require("./utils/contacts")
const expressLayout = require('express-ejs-layouts')
const port = 3000
const app = express()
const {
  body,
  validationResult,
  check
} = require("express-validator")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

app.use(cookieParser('secret'))
app.use(
  session({
    cookie: {
      maxAge: 6000
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)
app.use(flash())

app.use(express.static("./public"))
app.use(express.urlencoded({
  extended: true
}))

app.set("view engine", 'ejs')
app.use(expressLayout)

app.get('/', (req, res) => {
  res.render('index', {
    layout: "layout/mainLayout",
    title: "Halaman index"
  })
})

app.get('/contact', (req, res) => {
  const contacts = loadKontak()
  res.render('contact', {
    layout: "layout/mainLayout",
    title: "Halaman kontak",
    contacts,
    msg: req.flash('msg')
  })
})

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: "layout/mainLayout",
    title: "Halaman tambah kontak",
  })
})

// Prosses tambah kontak
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value)
    if (duplikat) {
      throw new Error("Nama sudah digunakan")
    }

    return true
  }),
  check('email', "Email tidak valid!").isEmail(),
  check("noHp", "Nomor Hp tidak valid!").isMobilePhone("id-ID")
], (req, res) => {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    // return res.status(400).json({err: err.array()})
    res.render("add-contact", {
      title: "Halaman tambah kontak",
      layout: "layout/mainLayout",
      errors: err.array()
    })
  } else {
    addContact(req.body)
    req.flash('msg', 'Data berhasil ditambahkan')
    res.redirect("/contact")
  }
})

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('detail', {
    layout: "layout/mainLayout",
    title: "Halaman detail kontak",
    contact
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: "layout/mainLayout",
    title: "Halaman about"
  })
})

app.use('/', (req, res) => {
  res.status(404)
  res.send(`404`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})