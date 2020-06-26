const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const { id } = req.user

  User.findByPk(id)
    .then(user => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: id }
      })
        .then(todos => res.render('index', { todos }))
        .catch(error => res.status(422).json(error))
    })
})

module.exports = router