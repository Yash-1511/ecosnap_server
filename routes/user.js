const { getMe } = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me",auth,getMe);

module.exports = router;