const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 3000

app.set("view engine", 'ejs')
app.use(expressLayout)

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
  res.send(`<h1>Halaman tidak ditemukan</h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})