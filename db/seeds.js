var fetch = require('node-fetch')
var users = require('../services/users')

fetch('http://api.randomuser.me?nat=us&results=100')
  .then(function(res) {
    return res.json()
  }).then(function(json) {
    for(var result of json.results) {
      users.createUser({
        password: result.user.password,
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
      },
        function(user){
        console.log('Created User', user)
      })
    }
  })
