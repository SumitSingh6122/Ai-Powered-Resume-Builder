import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Link2 } from 'lucide-react';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useResumeStore } from '@/Pages/Store/useResumeStore';

const PersonalDetail = () => {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
   <>
     <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
     <h2 className="text-xl font-semibold text-white flex items-center">
       <User className="w-5 h-5 mr-2 text-blue-400" />
       Personal Information
     </h2>
     
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
           Full Name
         </label>
         <input
          
           type="text"
          
           onChange={(e) => updatePersonalInfo({ name: e.target.value })}
           className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
           placeholder="Desi Trogen"
         />
       </div>
       
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
           Email
         </label>
         <div className="relative">
           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
         
             onChange={(e)=>updatePersonalInfo({email:e.target.value})}
             type="email"
             className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
             placeholder="desiTrogen@example.com"
           />
         </div>
       </div>
       
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
           Phone
         </label>
         <div className="relative">
           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
           onChange={(e)=>updatePersonalInfo({phone:e.target.value})}
             type="tel"
             className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
             placeholder="(+91) 9186465384"
           />
         </div>
       </div>
       
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
           Location
         </label>
         <div className="relative">
           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
            onChange={(e)=>updatePersonalInfo({location:e.target.value})}
             type="text"
             className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
             placeholder="City, State"
           />
         </div>
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
           Social Link
         </label>
         <div className="relative">
           <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
             onChange={(e)=>updatePersonalInfo({website:e.target.value})}
             type="tel"
             className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
             placeholder="Portfolio website"
           />
         </div>
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
         Linkedin  profile
         </label>
         <div className="relative">
           <FaLinkedin  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
             onChange={(e)=>updatePersonalInfo({link:e.target.value})}
             type="tel"
             className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
             placeholder="Portfolio website"
           />
         </div>    
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">
           Social Link
         </label>
         <div className="relative">
           <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
           
             type="text"
             className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
             placeholder="Github URL"
           />
         </div>
       </div>
     </div> 
   </div>

   </>
  )
}

export default PersonalDetail