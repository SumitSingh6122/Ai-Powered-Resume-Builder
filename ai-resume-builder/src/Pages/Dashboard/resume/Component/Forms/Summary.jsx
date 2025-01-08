import React, { useState } from 'react';
import { Award, Sparkles } from 'lucide-react';
import { IoSend } from 'react-icons/io5';
import { useResumeStore } from '@/Pages/Store/useResumeStore';
import { AichatSession } from '@/Pages/Service/geminiapi';

const Summary = () => {
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState('');
  
  const [Aisummary, setAisummary] = useState([]); // Initialize as an empty array
  const { position,level,updateLevel,updatePosition, summary, updateSummary } = useResumeStore();
  const [isPositionFocused, setIsPositionFocused] = useState(false);

  const [inputPosition, setInputPosition] = useState('');
  const [isExperienceFocused, setIsExperienceFocused] = useState(false);






  const GenerateSummary = async () => {
    try {
      console.log("processing...");
      const Aiprompt = `
      Generate a JSON array containing 4 different ATS-friendly summaries for the given job title and depend on the Experince level.
      Each entry in the array should include a corresponding 3-4 line description of the role's key responsibilities, skills, and expected expertise. Ensure that each summary is tailored for ATS (Applicant Tracking System) optimization, using relevant keywords to make the resume stand out for automated scanning.
  
      Structure:
      [
        {
          "summary": "<summary>"
        },
        {
          "summary": "<summary>"
        },
        {
          "summary": "<summary>"
        },
        {
          "summary": "<summary>"
        }
      ]
  
      Job Title: ${position}
      Experience level :${level}
  `;
  
      const result = await AichatSession.sendMessage(Aiprompt);
      const data = await result.response.text();

      

      // Clean and parse the response
      const cleanData = data.replace(/```json|```/g, '').trim();

      try {
        const parsedData = JSON.parse(cleanData);
        setAisummary(parsedData);
        setVisible(true);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }

    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };
  const AiPrompt = async () => {
    const PromptwithAi = prompt + " Generated result with consideration of the previous result and prompt. Please return output in the same structure and JSON format: " + JSON.stringify(Aisummary);
    setPrompt("");
  
    try {
      const result = await AichatSession.sendMessage(PromptwithAi);
      const data = await result.response.text();
       
      
      let cleanData = data.replace(/```json|```/g, '').trim();
  
      
     
      cleanData = cleanData.replace(/(\w+):/g, '"$1":');  
    
      cleanData = cleanData.replace(/'([^']+)'/g, '"$1"');  
  
      
      cleanData = cleanData.replace(/,\s*}/g, '}'); 
      cleanData = cleanData.replace(/,\s*]/g, ']'); 
  
     
      if (cleanData.startsWith("[") && cleanData.endsWith("]")) {
        try {
          const parsedData = JSON.parse(cleanData);
          setAisummary(parsedData);
          console.log("Parsed AI summary:", parsedData);
        } catch (error) {
          console.error("Error parsing JSON response:", error);
        }
      } else {
        console.error("Invalid JSON format:", cleanData);
      }
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };
  
  


  const AddSummary = (sum) => {
  
    updateSummary(sum);
  };

  return (
    <form>
      <div className="bg-gray-800/50 relative rounded-xl p-10">
        <h2 className="text-xl font-semibold text-white flex items-center mb-4">
          <Award className="w-5 h-5 mr-2 text-blue-400" />
          Professional Summary
        </h2>
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Write a brief summary of your professional background and key achievements..."
        />
        <div className='mt-2'>
          <div className='flex items-center content-center'>
            <h2 className='text-white'>Enter Position that you want to applied:</h2>
            <div className='ml-3 '>
              <input
                className={`text-white px-3 py-4 border-b-2 w-72 outline-none bg-transparent ${isPositionFocused ? 'border-blue-500' : 'border-gray-600'}`}
                placeholder='e.g. Full Stack Developer'
                onChange={(e)=>updatePosition(e.target.value)}
                onFocus={() => setIsPositionFocused(true)}
                onBlur={() => setIsPositionFocused(false)}
              />
             
            </div>
          </div>
          <div  className='flex mt-5 items-center '>
            <h2 className='text-white '>Select Experience Level:</h2>
            <select
              id="experience"
              className={`px-4 ml-5 py-2 w-72 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 ${isExperienceFocused ? 'border-blue-500' : ''}`}
              onFocus={() => setIsExperienceFocused(true)}
              onBlur={() => setIsExperienceFocused(false)}
              onChange={(e)=>updateLevel(e.target.value)}
            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={GenerateSummary}
          className="mt-4 px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700 transition-colors flex items-center"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          AI Suggestion
        </button>

        {Aisummary.length > 0 && (
          Aisummary.map((item, index) => (
            <div className="bg-gray-600 mt-2 rounded p-3 relative" key={index}>
              <p className="text-white text-sm">{item.summary}</p>
              <button
                type="button"
                onClick={() => AddSummary(item.summary)}
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700 transition-colors mt-2 ml-[520px]"
              >
                ADD
              </button>
            </div>
          ))
        )}

        {visible && (
          <div className="mt-6">
            <h2 className="text-gray-400 font-semibold mb-2">Modify your summary with Ai</h2>
            <div className="flex items-center bg-gray-700 p-2 rounded">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                className="flex-1 px-3 text-white py-2 bg-transparent outline-none border-none"
              />
              <button type="button" onClick={AiPrompt} className="ml-2">
                <IoSend className="text-white hover:text-gray-200 text-4xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default Summary;
