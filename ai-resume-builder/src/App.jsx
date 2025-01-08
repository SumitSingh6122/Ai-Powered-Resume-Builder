
import './App.css'

import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/auth/SignIn';
import Header from './Pages/Header';
import Dashbord from './Pages/Dashboard/Dashbord';
import EditResume from './Pages/Dashboard/resume/[resumeId]/edit';
import ResumePreview from './Pages/Dashboard/resume/Component/ResumePreview';


function App() {
  

  return (
    <>
   
    <BrowserRouter>
    <Header/>
   <Routes>
  
    <Route path='/' element={<Home/>} />
   
    <Route path='/auth/sign-in' element={<SignIn/>} />
    <Route path='/dashboard' element={<Dashbord/>} />
    <Route path='/resume/:resumeId/edit' element={<EditResume/>} />
    <Route path='/preview' element={<ResumePreview/>} />
   
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
