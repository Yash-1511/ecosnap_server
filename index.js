const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const setupDB = require('./utils/dbconnection');
const routes = require("./routes")
// configure port
const PORT = process.env.PORT;

// some basic configuration
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// database connection
setupDB();
// passport configuration
require('./config/passport')(app);

// routes
app.get('/',(req,res)=>{
    res.send("<h1> Welcome To EcoSnap </h1>")
})
app.use('/api',routes);
app.use("*", (req, res) => res.status(404).json('No API route found'));

app.listen(PORT,()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
})