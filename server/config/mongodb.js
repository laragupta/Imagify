import mongoose from "mongoose";
const connectDB= async ()=>{
    /*Why async?

Because connecting to MongoDB takes time.

The server sends a request to MongoDB.

It waits until MongoDB responds.
*/

    mongoose.connection.on('connected',()=>{
        console.log("Database connected")
    })
    //This is an event listener.
    //When the database connection is successfully established, run this function."
    await mongoose.connect(process.env.MONGODB_URI + "/imagify");
    //Why + "/imagify"?

//MongoDB has multiple databases.
// it tell connnedct top imagify 
    //returns a Promise.
}
export default connectDB