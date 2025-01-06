import { ResumeInfoContext } from "@/Pages/Context/ResumeInfoContext";
import React, { useContext, useState} from "react";
import PersonalDetail from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillPreview";
import { Button } from "@/components/ui/button";
import { ModernTemplate } from "@/Pages/ResumetemplateSection/Template/Template4";
import { PreviewModal } from "@/Pages/ResumetemplateSection/TemplatePreview";
import { set } from "mongoose";
import { CreativeTemplate } from "@/Pages/ResumetemplateSection/Template/Template1";
import { ExecutiveTemplate } from "@/Pages/ResumetemplateSection/Template/Template2";
import { MinimalTemplate } from "@/Pages/ResumetemplateSection/Template/Template3";
import TemplateStore from "@/Pages/ResumetemplateSection/Template/TemplateStore";
import { useResumeStore } from "@/Pages/Store/useResumeStore";








const ResumePreview = () => {
  const {resumeInfo}=useContext(ResumeInfoContext);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [templatestoreview,settemplatestoreview]=useState(false);
    const {ResumeTemplateId}=useResumeStore(); 
    const templates = {
      1: ModernTemplate,
      2: CreativeTemplate,
      3: ExecutiveTemplate,
      4: MinimalTemplate,
    };
    
   
  
  return (
    <>
    <div className="z-10 rounded shadow-xl relative  ">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
     <div className="ml-10 flex-1 items-start content-center">
      <button onClick={()=>settemplatestoreview(true)} className="px-6 py-2 shadow-2xl  rounded bg-blue-600 mr-3 whitespace-nowrap box-shadow-lg hover:bg-blue-700 transition-colors text-white" >Change Template</button>
     <button className=" px-8 py-2  rounded shadow-2xl text-white bg-gray-700 whitespace-nowrap hover:bg-gray-600 transition-colors "
     onClick={()=>setIsPreviewOpen(true)} >Preview</button> 
  </div>
        <button  className="px-4 py-2 bg-blue-600 rounded text-white  hover:bg-blue-700 transition-colors">
          Download PDF
        </button>
      </div>
      <div className="h-full scrollbar-hideee overflow-y-auto">
      { React.createElement(templates[ResumeTemplateId]) }
      </div>
    </div>
    <PreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            templateId={1}
          />
         
<TemplateStore  
isOpen={templatestoreview}
onClose={() => settemplatestoreview(false)}
/>

          </>
  );
}

export default ResumePreview;