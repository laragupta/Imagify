import React, { useContext, useState } from 'react';
import {assets} from "../assets/assets"
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';

function Result() {
   const[image,setimage]=useState(assets.sample_img_1)
   const[isImageLoaded, setIsImageLoaded]=useState(false)
   const[loading ,setLoading]=useState(false)
   const[input, setInput]=useState('')
   const {generateImage}=useContext(AppContext)
   const onSumbitHandler=async(e)=>{
        e.preventDefault()
        setLoading(true)
        if(input){
          const image=await generateImage(input)
          if(image){
            setIsImageLoaded(true)
            setimage(image)
          }
        }
        setLoading(false);
     
   }
  return (
    <motion.form 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
      
     onSubmit={onSumbitHandler}className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
     <div className='relative'> 
      <img src= {image} alt='' className='max-w-sm rounded'></img>
      <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading?'w-full transition-all duration-[10s]':'w-0'} 
      `}></span>
     </div>
     <p className={!loading?'hidden':''}>Loading....</p>
    </div>
    {!isImageLoaded ?
    <div className='flex w-full max-w-xl bg-neutral-500
     text-white text-sm p-0.5 mt-10 rounded-full'>
<input onChange={e=>setInput(e.target.value)}  value={input} className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'type="text" placeholder='Describe 
what you want to generate placeholder-color'></input>
<button  className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'type='submit'>Generate</button>
    </div>
    :
   
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0,5 mt-10 rounded-full'>
      <p onClick={()=>{
        setIsImageLoaded(false)
      }} className='bg-transparentborder border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer' >Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
}
    </motion.form>
  );
}

export default Result;
// bug here download button is not correct here i pass href="" easrlier now check on github 
