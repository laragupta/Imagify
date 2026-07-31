import express from 'express'
import cors from 'cors'
//CORS (Cross-Origin Resource Sharing) allows the frontend and backend
//  running on different origins to communicate securely.
import 'dotenv/config'
import connectDB from './config/mongodb.js'
//This imports the function that connects your server to MongoDB.
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoute.js'

const app = express()
// create  our eexpress appliaction 
// it is like a object everything will be attached to the app
app.use(express.json())
//middleware frontend send the json which express not undeerstand need to convert into js into req.body
app.use(cors())
// enables cross-origin resourcee sharing
// react->axios->express  can work now

await connectDB()
// import function executees that connect databasee
// server start-> connedct db()-> wait until it connect 

app.use('/api/user', userRouter)
//"If any request starts with /api/user, send it to userRoutes.js."
//Any request beginning with /api/user is handled by the routes defined in userRoutes.js.
app.use('/api/image', imageRouter)

app.get("/", (req, res) => {
    res.send("API WORKING")
})

// Only listen locally, not on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    // if port is given than start on that server otherwisee on port 4000
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT)
    })
    // start the server 
}

export default app