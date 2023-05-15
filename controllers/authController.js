const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// assume that here i am using the name and password for the authentication
const login = async(req,res)=>{
    const {name,password} = req.body

    if(!name || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    const foundUser = await User.findOne({name}).exec()

    if(!foundUser){
        return res.status(401).json({message:'Sorry user not found'})
    }

    const comparePwd = await bcrypt.compare(password,foundUser.password)

    if(!comparePwd) return res.status(401).json({message:'Wrong password'})

    const accessToken = jwt.sign(
        {userId: foundUser._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10m'}
    )

    res.json(accessToken)

}

module.exports = {
    login
}