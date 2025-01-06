import React from 'react'
import {motion} from 'framer-motion';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { PlusIcon, Sparkles } from 'lucide-react';



const ResumeCreateHeader = () => {
  return (
    <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-20 bg-gray-800 w-[95vw] rounded m-5 mb-0 flex items-center  px-5 justify-between"
        >
          <h2 className=" text-[1.3rem] bg-gradient-to-t from-gray-200 to-blue-900 font-semibold bg-clip-text text-transparent flex items-center justify-center "><IoDocumentTextOutline className='text-[#0ef] text-3xl mr-2' />Create Resume</h2>
          <div className="flex gap-10 w-[52vw]">
            
            <button className="px-4 py-2 bg-blue-700 items-center content-center text-white rounded flex hover:bg-blue-800 text-nowrap transition">
           Add Job Description <PlusIcon  className='ml-2' /> 
            </button>
            <button className="px-4 py-2 items-center content-center bg-blue-700 text-nowrap text-white rounded hover:bg-blue-800 transition">
              ATS Score 
            </button>
            <button className="px-4 py-2 items-center content-center bg-blue-700 text-nowrap text-white rounded flex hover:bg-blue-800 transition">
              AI Enhancement<Sparkles className="h-5 w-5 ml-2" />
            </button>
            <button className="px-4 py-2 bg-blue-700 text-white rounded text-nowrap hover:bg-blue-800 transition">
              ATS Keywords
            </button>
          </div>
        </motion.div>
  )
}

export default ResumeCreateHeader