const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let users = []

//CREATE
// app.post('/users', (req, res) => {
//   res.send("User created!")
// })
app.post('/users', (req, res) => {
  const user = {id: users.length + 1, name: req.body.name}
  users.push(user)
  res.status(201).send(user)
})

//READ
app.get('/users', (req, res) => {
  res.send(users)
})

//UPDATE
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).send('User not found')
  user.name = req.body.name
  res.send(user)
})

//DELETE
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id))
  res.send('User deleted')
})

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send('User ID: ' + req.params.userId + ' Book ID: ' + req.params.bookId)
})

app.get('/flights/:from-:to', (req, res) => {
  res.send('Flight from: ' + req.params.from + ' To: ' + req.params.to)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})