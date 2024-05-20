import User from "../models/user.model.js";

export const getUsersForSidebar= async(req,res)=>{
    try {
         console.log(req.user);
        const loggedUserId=req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in getUsers SIDEBAR",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export default getUsersForSidebar