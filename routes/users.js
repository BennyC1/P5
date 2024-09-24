var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/user', (req, res, next) => {
  console.log('Router middleware - Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Router middleware - Request Type:', req.method)
  next()
})

router.get('/user', (req, res) => {
  res.send("Hello dari contoh router middleware");
});

router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // render a regular page
  res.send('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.send('special')
})


module.exports = router;
