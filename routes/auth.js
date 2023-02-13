const { register, login } = require("../controllers/auth.controller");
const { body } = require("express-validator");

const router = require("express").Router();
/*
Register route
@username - string
@email - string
@password - string
*/
router.post(
  "/signup",
  [
    body("username")
      .isString()
      .withMessage("username must be valid")
      .isLength({ min: 4, max: 20 })
      .withMessage("Username must be greater than 4 character"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be in range"),
  ],
  register
);

/*
Login route
@username or email - string
@password - string
*/
router.post(
  "/signin",
  body("username").isString().withMessage("username must be valid"),
  body("password").trim(),
  login
);

module.exports = router;
