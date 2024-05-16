import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"
export const signup = async (req,res) =>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body
      
        if(password!==confirmPassword){
            return res.status(400).json({error:"passwords dont match"})
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exist"})
        }
         const salt= await bcrypt.genSalt(10)
         const hashedPassword= await bcrypt.hash(password,salt)
        const boyProfilePic=`https://avatar.iran.liara.run/public/49`
        const girlProfilePic=`https://avatar.iran.liara.run/public/98`
        
        const newUser = new User({
            fullName:fullName,
            username:username,
            password:hashedPassword,
            gender:gender,
            profilePic: gender==="male" ? boyProfilePic: girlProfilePic
        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
              _id:newUser._id,
              fullName: newUser.fullName,
              username:newUser.username,
              profilePic:newUser.profilePic
            })

        }else{
            res.status(400).json({error:"invalid userdata"})
        }

    } catch (error) {
      console.log("error in mongodb",error.message);
      res.status(500).json({error:"internal server error"})
    }
}
export const logout = (req,res) =>{
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logout successfully"})
} catch (error) {
    console.log("error in logout");
    
    res.status(500).json({message:"Logout failure"})
  }
}
export const login =async (req,res) =>{
    try {
        const {username,password}=req.body
        const user= await User.findOne({username})
        const isPasswordCorrect= await bcrypt.compare(password,user.password)
      if(!user || !isPasswordCorrect){
      res.status(400).json({error:"invalid password or username"})
      } 
      generateTokenAndSetCookie(user._id,res)
      res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic,
      })
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({error:"Internal server error"})
    }
    console.log("login");
}  