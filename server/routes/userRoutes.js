import express from 'express'
//We import Express because we need its Router feature.
import {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay} from'../controllers/userController.js'
import userAuth from '../middlewares/auth.js'
//This is your JWT authentication middleware.
 const userRouter= express.Router()
 userRouter.post('/register',registerUser)
 // here We're passing the function.
//Express calls it when a request arrives.
// beacuse of this we write registerUser not registerUser()
 userRouter.post('/login',loginUser)
 userRouter.get('/credits',userAuth,userCredits)
 //Why is userAuth placed before userCredits?

//Because middleware executes from left to right.
 // first user auth will run when this route run then useerCredits
 userRouter.post('/pay-razor',userAuth,paymentRazorpay)
 userRouter.post('/verify-razor',verifyRazorpay)
 //4. Which routes are protected?

//Protected routes are those using userAuth.


 export default userRouter
 // A POST request to http://localhost:4000/api/user/register is matched by userRouter.post('/register', registerUser), and Express then calls the registerUser controller function.
 