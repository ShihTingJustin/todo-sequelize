const express = require('express')
const router = express.Router()

const db = require('../../models')
const e = require('express')
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
// Todos all done
router.put('/all_done', (req, res) => {
  const UserId = req.user.id
  return Todo.update(
    { isDone: true },
    { where: { UserId, isDone: false, isTrash: false } }
  )
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// all todos move to trash
router.put('/all_trash', (req, res) => {
  const UserId = req.user.id
  return Todo.update(
    { isTrash: true },
    { where: { UserId, isDone: false, isTrash: false } }
  )
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', {
      todo: todo.get()
    }))
    .catch(err => console.log(err))
})

// UNDO
router.put('/:id/undo', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      if (todo.isDone && todo.isTrash) {
        todo.isTrash = false
      } else if (todo.isDone) {
        todo.isDone = false
      } else if (todo.isTrash) {
        todo.isTrash = false
      }
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// done with checkbox
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

// DONE with one click
router.put('/:id/done', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.isDone = true
      todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// DELETE
// all todos delete
router.delete('/all', (req, res) => {
  const UserId = req.user.id

  return Todo.destroy({ where: { UserId, isTrash: true } })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// one todo delete
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      if (todo.isTrash === false) {
        // SOFT DELETE
        todo.isTrash = true
        return todo.save()
      } else {
        // HARD DELETE
        return todo.destroy()
      }
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router