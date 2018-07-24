const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const mailer = require('../services/mailer.service');

module.exports.create = (req, res, next) => {
  res.render('users/create');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('users/create', {
          user: req.body,
          errors: { email: 'Email already registered' },
          toastr: {
            message: 'Email already registered',
            type: 'error'
          }
        });
      } else {
        user = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        return user.save();
      }
    })
    .then(() => {
      res.render('index/home', {
        toastr: {
          message: 'User registered!',
          type: 'success'
        }
      })
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/create', {
          user: req.body,
          errors: error.errors,
          toastr: {
            message: `User validation errors`,
            type: 'error'
          }
        });
      } else {
        next(error);
      }
    })
}

module.exports.listUsers = (req, res, next) => {
  User.find({})
  .then(users => {
    res.render('users/list', {
      users: users
    })
  })
  .catch(error => {
    next(error)
  })
}

module.exports.confirm = (req, res, next) => {
  const token = req.query.token

  User.findOne({ token: token, active: false })
    .then(async (user) => {
      if (user) {
        console.log(`Now activating user ${user.email}`)
        user.active = true;
        return user.save();
      }
    })
    .then(() => {
      res.redirect("/sessions/create")
    })
    .catch(error => {
      next(error);
    });
}