import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    /*A Schema is the blueprint (structure) of a document.
It tells MongoDB:
"Every user document should look like this."*/
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{
        type:String, required:true
    },
    creditBalance:{
        type:Number,default:5
    }
})
//const userModel=mongoose.model("user",userSchema)
// it will create the model again and again with name user
const userModel=mongoose.models.user || mongoose.model("user",userSchema)
export default userModel