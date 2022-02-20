const express = require("express");
const router = express.Router();
const User = require("../models/userModel")


router.post("/login", async(req, res) => {
    console.log('danterjadilagi')
      const {email , password} = req.body
      console.log(req.body)

      try {
          const user = await User.findOne({email , password})
          if(user) {
              res.send(user)
          }
          else{
              return res.status(404).json(error);
          }
      } catch (error) {
        return res.status(400).json(error.message);
      }
  
});

router.post("/register", async(req, res) => {
    // console.log(req.body)
    const {email, username, password, role} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(oldUser) return res.status(404).json({message: 'user already exist'})
        const newuser = new User(req.body)
        // const result = await User.create({email, username, password, role})
        await newuser.save()
        // res.status(201).json({newuser})
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});


module.exports = router

