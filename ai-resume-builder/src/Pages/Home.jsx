
import '../Styles/style.css';

import Footer from './footer';
import { Hero } from './hero';
import { Features } from './feature';
import { Templates } from './Templates';
import ClassicProfessional from './ResumetemplateSection/Template/template5';




const Home = () => {
  return (
    <div className='h-screen bg-[#323946]'>
     <Hero/>
    
  <Templates/>
     <Features/>
   
  
    
  <Footer/>
    </div>
  )
}

export default Home
