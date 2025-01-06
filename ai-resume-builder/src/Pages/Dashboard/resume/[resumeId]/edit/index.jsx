import React, { useEffect, useState } from 'react';
import Params from 'params';
import { useParams } from 'react-router-dom';
import FormSection from '../../Component/FormSection';
import ResumePreview from '../../Component/ResumePreview';
import { ResumeInfoContext } from '@/Pages/Context/ResumeInfoContext';
import dummydata from '@/Pages/data/dummydata';
import { motion } from 'framer-motion';
import ResumeCreateHeader from '../../ResumeCreateHeader';

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState(null);
  const params = useParams();
  useEffect(() => {
    setResumeInfo(dummydata);

  }, [])
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='bg-gray-900 min-h-full text-black  overflow-x-hidden'>
      <ResumeCreateHeader/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-10 '>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormSection />
          </motion.div>
          <ResumePreview />
        </div></div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume;