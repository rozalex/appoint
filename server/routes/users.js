const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = "12345";
  const isProvider = true;

  const newUser = new User({username, password, isProvider});
  
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/authenticate').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({error: err});
      } else if (!user) {
        var err = new Error('User not found.');
        return res.status(404).json({error: err});
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return res.status(200).json({user: user});
        } else {
          var err = new Error('Incorrect password');
          return res.status(401).json({error: err});
        }
      })
    });
});

module.exports = router;