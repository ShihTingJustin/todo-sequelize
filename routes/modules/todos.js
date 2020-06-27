const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

//CREATE
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const UserId = req.user.id

  Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// READ
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('detail', {
      todo: todo.toJSON()
    }))
    .catch(err => console.log(err))
})


//UPDATE
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', {
      todo: todo.get()
    }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if (isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // } 
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})


// SOFT DELETE
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.isTrash = true
      return todo.save()
      //todo.destroy()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// UNDO
router.get('/:id/undo', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.isDone = false
      todo.isTrash = false
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router