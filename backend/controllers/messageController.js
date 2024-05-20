import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import mongoose from 'mongoose'
export const sendMessage=async(req,res)=>{
    // const ObjectId = mongoose.Types.ObjectId;
    try {
        const {message}=req.body
        const {id:receiverId}=req.params
        const senderId=req.user._id.toString()
        
        
      
       
        console.log("sender",senderId);
        console.log("receiver",receiverId);


        let conversation =await Conversation.findOne({
            participants: {$all:[senderId,receiverId]}
        })
      
        if(!conversation){
       
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage=new Message({
            senderId:senderId,
            receiverId: receiverId,
            message: message
        })
        if(newMessage){
             conversation.messages.push(newMessage._id)
        }
        // await conversation.save()
        // await newMessage.save()
        await Promise.all([conversation.save(),newMessage.save()])
        res.status(201).json(newMessage)
       
    } catch (error) {
        console.log("error in sendmessage controllerj", error.message);
        res.status(500).json({error:"internal server error"})
        
    }
   
}

export const getMessages=async(req,res)=>{
    try {
        
        const {id:userToChatId}=req.params
        const senderId=req.user._id
        const conversation =await Conversation.findOne({
            participants: {$all:[senderId,userToChatId]}
        }).populate("messages")
        if(!conversation)  res.status(200).json([])
            const messages=conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in gwtMessages controllerj", error.message);
        res.status(500).json({error:"internal server error"})
        
    }
}