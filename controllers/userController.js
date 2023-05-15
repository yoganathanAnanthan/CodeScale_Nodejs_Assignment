const User = require("../models/userModel")
const bcrypt = require('bcrypt')


//register a new user
const userRegistration = async(req,res)=>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message:'All fields are required'})
    }

    //validation 
    const emailRegex = /^\S+@\S+\.\S+$/;
    const MIN_PASSWORD_LENGTH = 8;
    //check validation
    if (password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` });
      }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }

    const duplicate = await User.findOne({name}).exec()

    //check is there any duplicate user
    if(duplicate){
        return res.status(409).json({message:'Duplicate username'})
    }

    //encrypt the password
    const hashedPwd = await bcrypt.hash(password,10)

    //store new user details in userObj
    const userObj = {name, email, "password": hashedPwd }

    const createdUser = await User.create(userObj)

    if(createdUser){//created
        res.status(201).json({message:`New user ${name} created`})
    }else{
        res.status(400).json({message: 'Invalid user data'})
    }
}
//get the specific user profile
const userProfile = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password').exec()
      res.json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

module.exports={
    userRegistration,
    userProfile
}