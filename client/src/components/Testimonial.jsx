import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from 'motion/react';

function Testimonial() {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
     className='flex flex-col items-center
      justify-center my-20 py-12 '>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'> 
            Customer textimonials</h1>
        <p className='text-gray-500 mb-12'>
            What Our Users Are Saying</p>
            <div className='flex flex-wrap gap-6'>
                {testimonialsData.map((testimonial,index)=>{
                    return(
                        <div className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                            <img  className='rounded-full w-16 h-16 mx-auto object-cover'src={testimonial.image} alt=""></img>
                            <h2 className='text-xl text-center font-semibold mt-3'>{testimonial.name}</h2>
                            <p className='text-gray-500 text-center mb-4'>{testimonial.role}</p>
                            <div className=' flex justify-center mb-4 '>
                                {Array(testimonial.stars).fill().map((item,index)=>{
                                    return(
                                        <img  key={index }src={assets.rating_star} alt=''></img>
                                    )
                                })}
                            </div>
                            <p className='text-center text-sm '>{testimonial.text}</p>
                        </div>

                    )
                })}
            </div>

      
    </motion.div>
  );
}

export default Testimonial;
