import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app= express()

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))


app.use(cookieParser())

app.use(express.json({limit: "16kb"}))

//routes import

import router from './routes/user.route.js'


//routes declaration
app.use("/api/v1/user", router)

export { app }