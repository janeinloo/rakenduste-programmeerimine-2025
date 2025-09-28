const crypto = require("crypto");
const { create } = require("domain");
const { validationResult } = require("express-validator");

const todos = [
    {
        id: crypto.randomUUID(),
        title: "Learn React",
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

  const { title, completed } = req.body;

  const newTodo = {
    id: crypto.randomUUID(),
    title,
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

  const { id, title, completed } = req.body;
  const todo = todos.find(todo => todo.id === id && !todo.deleted);
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }

  todo.title = title;
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

exports.readAllTodos = (req, res) => {
  res.json(todos);
};

exports.toggleDeleted = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send({ message: "ID is required" });

  const todo = todos.find(todo => todo.id === id);
  if (!todo) return res.status(404).send({ message: "Todo not found" });

  todo.deleted = !todo.deleted;
  todo.updatedAt = Date.now();

  res.json(todo);
};