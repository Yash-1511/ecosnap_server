const router = require('express').Router();
const authRoutes = require("./auth");
const userRoutes = require("./user")
router.get('/check',(req,res)=>{
    res.send("Welcome to our API");
})

router.use('/',authRoutes);
router.use('/',userRoutes);


module.exports = router;