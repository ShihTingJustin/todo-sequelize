const express = require('express')
const router = express.Router()

const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')


router.use('/todos', authenticator, todos)
router.use('/u', users)
router.use('/', authenticator, home)

module.exports = router