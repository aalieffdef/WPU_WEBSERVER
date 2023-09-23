const express = require('express')
const expressLayout = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.use(express.static("./public"))

app.set("view engine", 'ejs')

// MORGAN
app.use(expressLayout)
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.render('index', {
    layout: "layout/mainLayout",
    title: "Halaman index"
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: "layout/mainLayout",
    title: "Halaman kontak"
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