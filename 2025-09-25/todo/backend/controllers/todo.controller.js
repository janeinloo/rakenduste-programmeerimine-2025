const crypto = require("crypto");
const { create } = require("domain");
const { validationResult } = require("express-validator");

const todos = [
    {
        id: crypto.randomUUID(),
        text: "Learn React",
        completed: false,
        createdAt: Date.now(),
        updatedAt: null,
        deleted: false,
    },
    {
        id: crypto.randomUUID(),
        title: "Write backend",
        completed: false,
        createdAt: Date.now(),
        updatedAt: null,
        deleted: false,
    },
];

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text, completed } = req.body;

  const newTodo = {
    id: crypto.randomUUID(),
    text,
    createdAt: Date.now(),
    updatedAt: null,
    completed: completed || false,
    deleted: false,
  };

  todos.push(newTodo);
  res.status(201).send(newTodo);
}

exports.read = (req, res) => {
  const activeTodos = todos.filter(todo => !todo.deleted);
  res.send(activeTodos);
}

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, text, completed } = req.body;
  const todo = todos.find(todo => todo.id === id && !todo.deleted);
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }

  todo.text = text;
  todo.updatedAt = Date.now();
  todo.completed = completed;

  res.json(todo);
};

exports.delete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.body;

  const todo = todos.find(todo => todo.id === id && !todo.deleted);
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }

  todo.deleted = true;
  res.json({ message: "Todo deleted", todo });
};