const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const catsController = require("../controllers/cats.controller");
const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares");

router.use(catsRouteMiddleware);

// /cats/ Get endpoint level middleware
router.get("/", catsGetRouteMiddleware, catsController.read);


router.post("/",
  body("name").isString().notEmpty().withMessage("Name is required"),
  catsController.create
);


router.put("/", 
  body("id").notEmpty().withMessage("ID is required"),
  body("name").isString().notEmpty().withMessage("Name is required"),
  catsController.update
);
router.delete("/", 
  body("id").notEmpty().withMessage("ID is required"),
  catsController.delete
);

module.exports = router;