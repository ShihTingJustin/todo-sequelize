const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))