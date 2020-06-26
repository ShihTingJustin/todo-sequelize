const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/u/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email && !password && !confirmPassword) {
    errors.push({ message: 'Please fill in Email, password and confirm password.' })
  } else if (!email) {
    errors.push({ message: 'Please fill in Email.' })
  } else if (!password) {
    errors.push({ message: 'Please fill in password.' })
  } else if (!confirmPassword) {
    errors.push({ message: 'Please fill in confirm password.' })
  }

  if ((password.length && confirmPassword.length) && (password !== confirmPassword)) {
    errors.push({ message: 'Password or confirm password incorrect.' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      errors.push({ message: 'This email is registered.' })
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are now logged out.')
  res.redirect('/u/login')
})

module.exports = router