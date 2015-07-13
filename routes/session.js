var router = require('express').Router()

var users = require('../services/users')



router.get('/sign_up', function(req, res) {
  res.render('sign_up')
})

router.post('/sign_up', function(req, res) {
  console.log('Looking for email=', req.body.emailAddress)
  users.findByEmailAddress(req.body.emailAddress, function(user) {
    if(user) {
      res.render('session/sign_up', { emailAddress: req.body.emailAddress, error: 'User already exists' })
    } else {
      users.createUser({ emailAddress: req.body.emailAddress, password: req.body.password }, function(user){
        console.log("User created id=", user.id)
        res.cookie('userId', user.id, { signed: true }).redirect('/')
      })
    }
  })
})

router.get('/log_in', function(req, res) {
  res.render('session/log_in')
})

router.post('/log_in', function(req, res) {
  users.authenticate(req.body.emailAddress, req.body.password, function(user) {
    if(user) {
      res.cookie('userId', user.id, { signed: true }).redirect('/')
    } else {
      res.render('session/log_in', { emailAddress: req.body.emailAddress, error: 'Log In Failed' })
    }
  })
})

router.get('/log_out', function(req, res) {
  res.clearCookie('userId').redirect('/')
})

router.get('/password_reset_sent', function(req, res) {
  res.render('session/password_reset_sent')
})

module.exports = router
