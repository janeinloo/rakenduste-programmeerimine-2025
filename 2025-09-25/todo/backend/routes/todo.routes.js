const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { todoRouteMiddleware, todoGetRouteMiddleware } = require("../middlewares/todo.middlewares");

router.use(todoRouteMiddleware);

router.get("/", todoGetRouteMiddleware, todoController.read);

router.post("/",
    body("text").isString().notEmpty().withMessage("Text is required"),
    todoController.create
);

router.put("/",
    body("id").notEmpty().withMessage("ID is required"),
    body("text").isString().notEmpty().withMessage("Text is required"),
    todoController.update
);

router.delete("/",
    body("id").notEmpty().withMessage("ID is required"),
    todoController.delete
);

module.exports = router;