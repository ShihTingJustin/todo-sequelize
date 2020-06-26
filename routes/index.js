const express = require('express')
const router = express.Router()

const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')
const auth = require('./modules/auth')


router.use('/todos', authenticator, todos)
router.use('/u', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router