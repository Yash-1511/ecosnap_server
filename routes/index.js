const router = require('express').Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const eventRoutes = require("./event");
router.get('/check',(req,res)=>{
    res.send("Welcome to our API");
})

router.use('/',authRoutes);
router.use('/',userRoutes);
router.use('/',eventRoutes);
module.exports = router;