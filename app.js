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
  const restaurants = restaurantList.results.filter((restaurant) => {
    if (restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())) {
      return true
    }
  })
  res.render('index', { restaurants: restaurants, keywords: req.query.keyword })
})


app.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    if (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
      return true
    }
  })
  res.render('index', { restaurants: restaurants, keywords: keyword })
})
// Start and Listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})