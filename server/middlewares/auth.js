//  in this we w find the user id from token 
import jwt from 'jsonwebtoken'
const userAuth= async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false, message:'Not Authorized,Login Again'})
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
              
           req.userId = tokenDecode.id;
        }
        else{
            return  res.json({success:false, message:'Not Authorized,Login Again'})
        }
        next();// it will execute the controllers function that will return user credits
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}
export default userAuth