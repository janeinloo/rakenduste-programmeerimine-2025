const crypto = require("crypto");
const { validationResult } = require("express-validator");

const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: 1727098952739,
    updatedAt: null,
    deleted: false,
  },
];

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  const newCat = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  }

  cats.push(newCat);
  res.status(201).send(newCat);
};

exports.read = (req, res) => {
  const activeCats = cats.filter(cat => !cat.deleted);
  res.send(activeCats);
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, name } = req.body;

  const cat = cats.find(cat => cat.id === id && !cat.deleted);
  if (!cat) {
    return res.status(404).send({ message: "Cat not found" });
  }

  cat.name = name;
  cat.updatedAt = Date.now();

  res.json(cat);
};

exports.delete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.body;

  const cat = cats.find(cat => cat.id === id && !cat.deleted);
  if (!cat) {
    return res.status(404).send({ message: "Cat not found" });
  }

  cat.deleted = true;
  res.json({ message: "Cat deleted", cat });
};