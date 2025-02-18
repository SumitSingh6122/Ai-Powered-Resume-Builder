import React, { useState } from 'react';
import { FileText, Star, Cpu, KeyRound, X } from 'lucide-react';
import { useResumeStore } from '@/Pages/Store/useResumeStore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AichatSession } from '@/Pages/Service/geminiapi';

export default function ResumeCreateHeader() {
  const [activeTab, setActiveTab] = useState('description');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [AtScores,setAtsScore]=useState();
  const [AtSKeywords,setAtsKeyword]=useState([]);
  const[visible,setvisible]=useState(false);
  const [loading,setloading]=useState(false);
  const [jobDescription,setJobDescription]=useState();
  
  const {
    personalInfo,
 
    position,
    level,
    summary,
    experience,
    education,
    projects,
    certifications,
    skills,
  } = useResumeStore();


  const HandleResumeEnhancement = async () => {
    let prompt = `
      Analyze the following resume and provide suggestions for enhancing it to improve alignment with the role "${position}" at a "${level}" level in software development. Focus on improving keyword usage, highlighting relevant skills, and optimizing the overall content for better ATS alignment. Provide the following:
      
      1. An overall suggestion to improve the resume's ATS compatibility.
      2. A list of key areas where the resume could be enhanced.
      3. Specific keyword suggestions that should be included or emphasized.
      
      Here are the details:
      - **Job Description**: ${jobDescription}
      - **Position**: ${position}
      - **Level**: ${level}
      - **Summary**: ${summary}
      - **Skills**: ${JSON.stringify(skills)}
      - **Education**: ${JSON.stringify(education)}
      - **Projects**: ${JSON.stringify(projects)}
  
      Additional Information:
      ${experience?.length > 0 ? `- **Experience**: ${JSON.stringify(experience)}` : ''}
      ${certifications?.length > 0 ? `- **Certifications**: ${JSON.stringify(certifications)}` : ''}
  
      **Output Format**:
      {
        "suggestion": "<overall suggestion to improve ATS alignment>", 
        "areasToEnhance": [
          "<area1>", 
          "<area2>", 
          ...
        ],
        "keywordSuggestions": [
        "<keyword1>", 
        "<keyword2>", 
        ...
      ]
      }
    `;
 console.log("process")
    const result = await AichatSession.sendMessage(prompt);
      const rawData = await result.response.text();
      console.log(rawData);
  
   
  };
  
    
   
  const HandelAtsScore = async () => {
    let prompt = `
      Analyze the following resume and calculate its ATS (Applicant Tracking System) score based on its alignment with the role "${position}" at a "${level}" level in software development. Provide the following:
      1. An ATS score out of 100.
      2. A list of relevant keywords that improve ATS alignment.
  
      Here are the details:
      - **Job Description**: ${jobDescription}
      - **Position**: ${position}
      - **Level**: ${level}
      - **Summary**: ${summary}
      - **Skills**: ${JSON.stringify(skills)}
      - **Education**: ${JSON.stringify(education)}
      - **Projects**: ${JSON.stringify(projects)}
     
  
      Additional Information:
      ${experience?.length > 0 ? `- **Experience**: ${JSON.stringify(experience)}` : ''}
      ${certifications?.length > 0 ? `- **Certifications**: ${JSON.stringify(certifications)}` : ''}
  
      **Output Format**:
      {
        "atsScore": <number>, 
        "atsKeywords": ["<keyword1>", "<keyword2>", ...]
      }
    `;
  
    try {
      setloading(true);
  
      const result = await AichatSession.sendMessage(prompt);
      const rawData = await result.response.text();
  
      // Clean up the response to ensure it's valid JSON
      const cleanedData = rawData
        .replace(/```json/g, '') // Remove any starting code block markers
        .replace(/```/g, '');    // Remove any ending code block markers
  
      // Parse the cleaned JSON response
      const data = JSON.parse(cleanedData);
  
      // Update state with ATS score and keywords
      setAtsScore(data.atsScore);
      setAtsKeyword(data.atsKeywords);
      setvisible(true);
    } catch (error) {
      console.error("Error calculating ATS score:", error);
    } finally {
      setloading(false);
    }
  };
  
  
  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className=''>
            <textarea 
            value={jobDescription}
          onChange={(e)=>setJobDescription(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your professional description..."
          />
            
          </div>
        );
      case 'ats-score':
        return (
          <div className="space-y-4 h-28">
            <button onClick={HandelAtsScore} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90">
              Check ATS Score
            </button>
            {loading ? (
              <SkeletonTheme baseColor="#b3b1b1" highlightColor="#444">
                <div className='h-3'>
                  <Skeleton count={3} />
                </div>
              </SkeletonTheme>
            ) : (
              <div>
                {visible && (
                  <>
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500" />
                      <span className="text-lg font-semibold text-white">
                        ATS Score: {AtScores}/100
                      </span>
                    </div>
                    <p className="text-gray-300">
                      Your resume is well-optimized for ATS systems.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        );
      case 'ai-enhancement':
        return (
          <div className="space-y-4">
            <button onClick={HandleResumeEnhancement} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90">
              Enhance with AI
            </button>
            <p className="text-gray-300">
              Let AI improve your resume's impact and clarity.
            </p>
          </div>
        );
      case 'custom edit':
        return(
          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FileEdit className="w-4 h-4" />
          Custom Edit
        </motion.button>
        )

      case 'ats-keywords':
        return (
          <div className="space-y-4">
             <button onClick={HandelAtsScore} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90">
              Check ATS Keyword
            </button>
            {loading ? (
              <SkeletonTheme baseColor="#b3b1b1" highlightColor="#444">
                <div className=''>
                  <Skeleton count={2} />
                </div>
              </SkeletonTheme>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {AtSKeywords.map((keyword) => (
                    <span key={keyword} className="px-3 py-1 rounded text-lg bg-gray-700 text-white">
                      {keyword}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="w-full  p-3 pb-0 animate-fade-in bg-gray-900">
  <div className="rounded shadow-lg p-4 items-center content-center animate-slide-up bg-gray-800">
        <div className="flex items-center justify-between ">
          <div className="flex items-center ml-3 gap-3">
            <FileText className="w-8 h-10 text-[#0ef]" />
            <h2 className="text-xl font-semibold text-white">
              Let's build something amazing
            </h2>
          </div>
          <div className="flex gap-4">
            {['description', 'ats-score', 'custom edit','ai-enhancement', 'ats-keywords'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsBoxOpen(true);
                }}
                className={`px-4 py-2 rounded transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white rounded'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {isBoxOpen && (
          <div className="border rounded-lg p-6 mt-4 animate-slide-up border-gray-700 bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              <button 
                onClick={() => setIsBoxOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
}