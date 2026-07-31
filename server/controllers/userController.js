import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay'
import tranactionModel from "../models/tranactionModel.js";

const registerUser=async(req,res)=>{
    try {
        const {name,email, password}=req.body;
        // as frontend send email,name , passowder with axios post express.json convert it
        // into js and store in req.body 
        if(!name || ! email || ! password){
            return res.json({success:false,message:"Missing Details"})
        }
        /* we generate a random string name salt because there might be a
         case if two password are same  beacuse of this we add random string in it */

        const salt=await bcrypt.genSalt(10)
        // before storing the password we encrypt it 
        const hashedPassword=await bcrypt.hash(password,salt)
        // we make a object of user data that we need to store in the database
        const userData={
            name
            ,email
            ,password:hashedPassword
        }
        const newUser= new userModel(userData)
        //"Create a new document using the User model."
       
        const user =await newUser.save()
        // Mongoose automatically saves it into the users collection.
        /*userModel is a Mongoose model, not the MongoDB collection name. The model acts as a bridge between the
         application and the MongoDB collection.
         By default, Mongoose converts the model name (e.g., "user") into the collection name ("users").*/
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token,user:{name:user.name}})
        
    } catch (error) {
        console.log(error)
        // display error in backened terminal
        // Response is send to the server 
        /*{
          success:false,
          message:"
          "
        }
        */ 
        res.json({success:false, message:error.message})
    }
}
const loginUser= async (req, res)=>{
    try {
        const {email, password}= req.body;
        const user =await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        /*We never compare passwords directly because the database stores hashed passwords.
         bcrypt.compare() hashes the entered password 
        using the same salt and compares it with the stored hash*/
        if(isMatch){
              const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token,user:{name:user.name}})

        }
        else{
             return res.json({success:false,message:"Invalid Credentials"})

        }
        
    } catch (error) {
        console.log(error)
         
        res.json({success:false, message:error.message})
 
    }

}
const userCredits = async(req,res)=>{
     try {
        const userId = req.userId;
        // we will create a middleware which find the user id from token
  /*Where did req.userId come from?
It does not come from the frontend.
It comes from the userAuth middleware.
        */const user= await userModel.findById(userId)
        // Now Mongoose searches the users collection
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
     } catch (error) {
       console.log(error)
         
        res.json({success:false, message:error.message})

     }
}
const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
//his creates an object through which your backend communicates with Razorpay.
const paymentRazorpay=async(req,res)=>{
    try {
        const userId = req.userId          
        const { planId } = req.body        
        const userData=await userModel.findById(userId)
        if(!userId || !planId){
            return  res.json({success:false,message:'Missing Details'})
        }
        let credits,plan,amount,date
        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;

                case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;

                case 'Business':
                plan='Business'
                credits=5000
                amount=250
                
                break;
        
            default:
               return res.json({success:false,message:'plan not found'})
        }
        date=Date.now();
        const tranactionData={
            userId,plan,amount,credits,date
        }
        /*const transactionModel = mongoose.model("transaction", transactionSchema);
        this create a model  with transaction */
        // store the data in the database
        const newTransaction =await tranactionModel .create(tranactionData)
        // Create a new record in the transactions collection using this data."
        /*mongoose.model(...) creates and returns a Model object.
        transactionModel is just the variable that stores that Model.
        Why save the transaction before payment?

        Because later, when Razorpay tells us "Payment completed", 
        we already have a transaction record to update.
        */ 
        const options={
            amount:amount*100,
            currency:process.env.CURRENCY,
            receipt:newTransaction._id
            // when new transaction stored in mongpdb it create a id we use this in receipt
        
        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})


        })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
const verifyRazorpay= async(req,res)=>{
    try {
        const {razorpay_order_id}= req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            const transactionData=await transacationModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false,message:'Payment Failed'})
            }
            const userData=await userModel.findById(transactionData.userId)
            const creditBalance=userData.creditBalance+transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
            res.json({success:true,message:'Credits Added'})
        }
        else{
            res.json({success:false,message:"payment failed"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

        
    }
}

export  {
    registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay
}
