import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import connectmongoDB from "./db/connectmongodb.js"
import cookieParser from "cookie-parser"

const app= express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
const PORT=process.env.PORT || 5000
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.get("/",(req,res)=>{
    res.send("wyesahh hellllo bloody world")
})
app.listen(5000,()=> {
    connectmongoDB()
    console.log(`server running on port ${PORT}`)
})