import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// insteead of alert() we use toast because it provides a better user experience.

import axios from 'axios'
//Axios is used to communicate with the backend.
//fetch()you chose Axios because it automatically parses JSON, provides cleaner syntax, 
// and makes it easy to attach JWT tokens in request headers.
import { useNavigate } from "react-router-dom";
export const AppContext=createContext()
//createContext() creates a Context object, which acts like a shared data channel. 
// By itself, it doesn't store any data. 
// The data is provided through AppContext.Provider 
// using its value prop. Any child component can then 
// use useContext(AppContext) to access that shared data 
// directly without passing it through props.


const AppContextProvider=(props)=>{
     const[user,setUser]=useState(null)
     const[showLogin,setShowLogin]=useState(false);
     // get the token which are store in local storage of the browser
     const[token,setToken]=useState(localStorage.getItem('token'))
     //React state is temporary and is lost when the page is refreshed. Therefore, we initialize the token state from localStorage, where the JWT
     //  token is permanently stored in the browser. 
     // This keeps the user logged in even after refreshing or reopening the website.
     const [credit,setCredit]=useState(0)

     const backenedUrl=import.meta.env.VITE_BACKENED_URL
     const navigate=useNavigate()
     const loadCreditsData=async()=>{
          try {
            const {data}=await axios.get(backenedUrl+'/api/user/credits',{headers:{token}})
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)


            }
            
            
          } catch (error) {
            console.log(error)
            toast.error(error.message);
            
          }
     }
//It is an asynchronous function because it makes an API request to the backend.
//It receives the prompt entered by the user
     const generateImage=async(prompt)=>{
        try {
        const {data}  =  await axios.post(backenedUrl+'/api/image/generate-image',{prompt},{headers:{token}})
            if(data.success){
                loadCreditsData()
                return data.resultImage
            } else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance===0){
                    navigate('/buyCredit')

                }
            }
        } catch (error) {
            toast.error(error.message)
            
        }
         
     }
     const logout=()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
     }
     useEffect(()=>{
        if(token){
            loadCreditsData()
            // FETCH THE LATEST USER DETAILS AND CREDITS FROM THE BACKENED 
        }

     },[token])
     const value={
        // to pass components in other place where needed
         user,setUser,showLogin,setShowLogin,backenedUrl,token,
         setToken,credit,setCredit,loadCreditsData,logout,generateImage
     }
     return (
        <AppContext.Provider value={value}>
            {props.children} 
        </AppContext.Provider>
     )
}
export default AppContextProvider
//<AppContext.Provider ("Share the data stored in value with all child components.") value={value}>
//Store all these variables and functions inside the Context.
// PROVIDE DATA TO THE CHILD 