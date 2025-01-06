
import { Loader, PlusSquare } from 'lucide-react'
import { useState } from 'react'
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



const AddResume = () => {
  const [openDailog,setopenDailog]=useState(false);
  const [loader,setloader]=useState(false);
  const navigate=useNavigate();
  const {updatePosition} =useResumeStore();
  const Create=()=>{
    setloader(true);
    setTimeout(() => {
      navigate('/resume/23/edit');
      setloader(false);
      setopenDailog(false); 
    }, 1000);
  }
  return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center backdrop-blur-lg bg-[#999]/50 
         rounded-xl h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' onClick={()=>setopenDailog(true)}>
            <PlusSquare/>
        </div>
        <Dialog open={openDailog}  >
  
  <DialogContent className='bg-white  text-black '>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
      <p>Add title for your new resume that you Applied</p>
    
      <Input  className='mt-2 placeholder-opacity-5 rounded ' onChange={(e)=>updatePosition(e.target.value)}  placeholder='Ex. Full Stack Developer'></Input>
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