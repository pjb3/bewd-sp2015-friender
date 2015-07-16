var fetch = require('node-fetch')
var users = require('../services/users')
var async = require('async')

fetch('http://api.randomuser.me?nat=us&results=100')
  .then(function(res) {
    return res.json()
  }).then(function(json) {
    async.eachLimit(json.results, 10, function(result, cb){
      var user = {
        password: 'password',
        emailAddress: result.user.email,
        firstName: result.user.name.first,
        lastName: result.user.name.last,
        gender: result.user.gender,
        seeMen: Math.random() > 0.5,
        seeWomen: Math.random() > 0.5,
        bornOn: new Date(parseInt(result.user.dob)*1000),
        pictureUrl: result.user.picture.large,
        city: result.user.location.city,
        state: result.user.location.state
      }
      console.log('Creating user', user.emailAddress)
      users.createUser(user,
        function(newUser){
          console.log('Created user', newUser.emailAddress, 'with id', newUser.id)
          cb()
        }
      )
    }, function(err){
      if(err) {
        console.log("Failed to load user", err)
      } else {
        console.log("Users Loaded")
      }
    })
  })
