const express = require("express");
const { userController} = require("./Routes/auth.route");
const {connection }= require("./config/db")
const passport = require("./config/google-auth")
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("BASED API ENDPOINT")
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });

app.use("/",userController)

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("db is connect to server");
    } catch (error) {
        console.log(error)
    }

    console.log(`server is running`);
})
