const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')

router.use('/u', users)
router.use('/', home)

module.exports = router