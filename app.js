// Require packages and  set related variables
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// Includes main data
const restaurantList = require('./restaurant.json')

// Set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Set routes
app.get('/', (req, res) => {
  res.render('index')
})

// Start and Listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})