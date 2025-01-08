import React, { useState } from 'react';
import { FileText, Star, Cpu, KeyRound, X } from 'lucide-react';

export default function ResumeCreateHeader() {
  const [activeTab, setActiveTab] = useState('description');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [keywords, setKeywords] = useState(['Leadership', 'Project Management', 'React']);

  const generateKeywords = () => {
    const suggestedKeywords = [
      'TypeScript', 'Node.js', 'DevOps', 'Agile', 'Team Leadership',
      'Problem Solving', 'Communication', 'CI/CD', 'Cloud Computing',
      'System Design', 'Data Analysis', 'Strategic Planning'
    ];
    const randomKeywords = suggestedKeywords
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setKeywords([...keywords, ...randomKeywords]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <textarea 
            className="w-full h-32 p-3 border rounded-lg bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your professional description..."
          />
        );
      case 'ats-score':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" />
              <span className="text-lg font-semibold text-white">
                ATS Score: 85/100
              </span>
            </div>
            <p className="text-gray-300">
              Your resume is well-optimized for ATS systems.
            </p>
          </div>
        );
      case 'ai-enhancement':
        return (
          <div className="space-y-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90">
              Enhance with AI
            </button>
            <p className="text-gray-300">
              Let AI improve your resume's impact and clarity.
            </p>
          </div>
        );
      case 'ats-keywords':
        return (
          <div className="space-y-4">
            
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span key={keyword} className="px-3 py-1 rounded text-lg bg-gray-700 text-white">
                  {keyword}
                </span>
              ))}
            </div>
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
            {['description', 'ats-score', 'ai-enhancement', 'ats-keywords'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsBoxOpen(true);
                }}
                className={`px-4 py-2 rounded-lg transition-all ${
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