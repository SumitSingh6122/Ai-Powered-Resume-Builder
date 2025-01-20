import { X } from 'lucide-react'
import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion';
import { TemplateSection } from '../TemplateSection';
import { FaSearch } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Height } from '@mui/icons-material';





const TemplateStore = ({isOpen,onClose}) => {

  
    
    const templates = [
        {
          id: '1',
          name: 'Modern Professional',
          description: 'Clean and contemporary design with a focus on readability',
          popular: true,
          preview: '/TemplateImage/template1.png'
        },
        {
          id: '2',
          name: 'Creative Portfolio',
          description: 'Stand out with a unique layout perfect for creative roles',
          preview: '/TemplateImage/template2.png'
        },
        {
          id: '3',
          name: 'Executive Suite',
          
          description: 'Professional template ideal for senior positions',
          preview: '/TemplateImage/template3.png'
        },
        {
          id: '4',
          name: 'Minimal Classic',
          description: 'Traditional layout with a modern minimal twist',
          preview: '/TemplateImage/template4.png'
        },
        {
          id: '5',
          name: 'Classical professional',
          description: 'Traditional layout with a modern minimal twist',
          preview: '/TemplateImage/template4.png'
        }
      ];
      
      const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      };
  return (
    <AnimatePresence className='z-50' >
    { isOpen &&
    <div onClick={onClose} className='bg-gray-800 h-[90vh] top-10 left-20 w-[90vw] z-50 fixed overflow-auto'>
 <div  className='h-full   m-5   '>

    <div className='flex items-center content-around relative'>  
        <h2 className='text-[1.5rem] text-white ml-4 '>Select Resume</h2>
        <div className='w-[60vw] h-[45px] bg-white rounded ml-[10vw] mt-5 relative '><input type="text" className='w-[40vw] outline-none bg-transparent absolute py-3 px-5 ' placeholder='search here ' />
        <button onClick={onClose}  className='absolute right-5  '><CiSearch className='text-2xl mt-2' /></button></div>
        <span onClick={onClose} className='absolute right-2 top-2 font-semibold  ' ><X  className='h-10 w-7 '/></span>   
    </div>
    <div className='mt-10 '><h1 className='text-white '>Top Rated Resume</h1>
    <hr className='mt-1 text-2xl' /></div>
    <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-5 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {templates.map((template) => (
            <TemplateSection key={template.id} {...template}   />
          ))}
        </motion.div>
 </div>
    </div>
        }
        </AnimatePresence>
  )
}

export default TemplateStore;