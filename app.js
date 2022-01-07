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
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})
app.get('/search', (req, res) => {
  // console.log(req.query.keyword)
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurants: restaurants })
})

// Start and Listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})