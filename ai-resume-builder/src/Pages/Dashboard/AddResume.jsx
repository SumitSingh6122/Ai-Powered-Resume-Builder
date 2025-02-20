
import { Loader, PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { useNavigate} from 'react-router-dom'
import { useResumeStore } from '../Store/useResumeStore';
import RecentResumeCard from './RecentResumeCard';




const AddResume = () => {
  const [openDailog,setopenDailog]=useState(false);
  const [loader,setloader]=useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const navigate=useNavigate();
  const {updateTitle ,Resumetitle} =useResumeStore();
  useEffect(() => {
    console.log("title", Resumetitle);
  }, [Resumetitle]);  
  
  const Create=()=>{
    
    setloader(true);
    setTimeout(() => {
      navigate('/resume/create');
      setloader(false);
      setopenDailog(false); 
    }, 1000);
  }
 
  return (
    <div className='flex '>
     
        <div className='p-14 py-24 w-60 mr-4 border items-center flex justify-center backdrop-blur-lg bg-[#999]/50 
         rounded-xl  h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' onClick={()=>setopenDailog(true)}>
            <PlusSquare/>

       
        </div>
        <RecentResumeCard  />
        <Dialog open={openDailog}  >
  
  <DialogContent className='bg-white  text-black '>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
      <p>Add title for your new resume that you Applied</p>
    
      <Input   className='mt-2 placeholder-opacity-5 rounded ' onChange={(e)=>updateTitle(e.target.value)}  placeholder='Ex. Full Stack Developer'></Input>
      </DialogDescription>
     
      <div className='flex justify-end gap-5 '>
        <Button variant='ghost' onClick={()=>setopenDailog(false)} className='border-2 rounded'>Cancel</Button>
        <Button className='text-white rounded' onClick={()=>Create()} > {!loader?"Create":<Loader className='animate-spin w-5 text-xl'/>}</Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddResume