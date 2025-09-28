const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { todoRouteMiddleware, todoGetRouteMiddleware } = require("../middlewares/todo.middlewares");

router.use(todoRouteMiddleware);

router.get("/", todoGetRouteMiddleware, todoController.read);

router.get("/admin", todoController.readAllTodos);

router.put("/admin/toggle",
    body("id").notEmpty().withMessage("ID is required"),
    todoController.toggleDeleted
)

router.post("/",
    body("title").isString().notEmpty().withMessage("Title is required"),
    todoController.create
);

router.put("/",
    body("id").notEmpty().withMessage("ID is required"),
    body("title").isString().notEmpty().withMessage("Title is required"),
    todoController.update
);

router.delete("/",
    body("id").notEmpty().withMessage("ID is required"),
    todoController.delete
);

module.exports = router;