const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const {AuthModel}= require("../model/auth.model")
const {Router} = require("express");
const userController = Router();

userController.post("/signup",(req,res)=>{
    const {fullName,email,phone,password,confirmPassword} = req.body;

    if(password!==confirmPassword){
     return res.status(400).send("Password and confirmPassword do not match")
    }


    bcrypt.hash(password, 10, async function(err, hash) {
    if(err){
        res.send(err)
    }

    const user = new AuthModel({
        fullName,
        email,
        phone,
        password: hash,
        confirmPassword: hash
    });

    try {
        await user.save();
        res.send("Signup Sucessfull")
    } catch (error) {
        console.log(error);
        res.send("Signup Failed")
    }
    });

    userController.post("/login",async (req,res)=>{
        const{email,password}=req.body;

        const user = await AuthModel.findOne({email});
        const hash = user.password;

        bcrypt.compare(password, hash, function(err, result) {
          if(err){
            res.send(err)
          }

          if(result){
            const token = jwt.sign({userID: user._id }, 'shhhhh');
            res.send({message: "Login Successfull",token: token})
          }
          else{
            res.send("invalid")
          }
        })

    })
})
module.exports={
    userController
}