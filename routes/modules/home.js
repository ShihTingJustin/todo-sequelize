const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const UserId = req.user.id

  User.findByPk(UserId)
    .then(user => {
      if (!user) throw new Error('user not found')

      const findAllTodos = new Promise((resolve, reject) => {
        Todo.findAll({
          raw: true,
          nest: true,
          where: { UserId, isDone: false }
        })
          .then(todos => resolve(todos))
          .catch(err => console.log(err))
      })

      const findAllDone = new Promise((resolve, reject) => {
        Todo.findAll({
          raw: true,
          nest: true,
          where: { UserId, isDone: true }
        })
          .then(dones => resolve(dones))
          .catch(err => console.log(err))
      })

      async function setHomePage() {
        const todos = await findAllTodos
        const dones = await findAllDone

        res.render('index', { todos, dones })
      }

      setHomePage()

    })
    .catch(error => res.status(422).json(error))
})

module.exports = router