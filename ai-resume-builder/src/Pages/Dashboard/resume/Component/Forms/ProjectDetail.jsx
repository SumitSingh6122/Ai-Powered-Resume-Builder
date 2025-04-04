import React, { useEffect, useState } from 'react';
import { Code, Plus, Trash2, Link, Sparkles } from 'lucide-react';
import { useResumeStore } from '../../../../Store/useResumeStore';
import { IoSend } from 'react-icons/io5';
import { FaSpinner } from 'react-icons/fa';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AichatSession } from '@/Pages/Service/geminiapi';

export default function ProjectsSection() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  const [content, setContent] = useState({});
  const [aiPrompts, setAiPrompts] = useState({});
  const [errors, setErrors] = useState({});
  const [aiPromptInputVisible, setAiPromptInputVisible] = useState({});

  useEffect(() => {
    if (projects.length > 0) {
      setContent(
        projects.reduce((acc, project, index) => {
          acc[index] = project.description || '<p></p>';
          return acc;
        }, {})
      );
    }
  }, [projects.length]);

  const handleChange = (index, value) => {
    setContent(prev => ({ ...prev, [index]: value }));
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], description: value };
    updateProject(index, updatedProjects[index]);
  };

  const GenerateProjectDescription = async (index) => {
    const project = projects[index];
    if (!project.title || !project.technologies) return;

    const updatedProjects = [...projects];
    updatedProjects[index] = { ...project, isLoading: true };
    updateProject(index, updatedProjects[index]);

   
    const prompt = `Generate 4-5 concise technical bullet points for "${project.title}" using ${project.technologies}. Use this format per point:
    - Start with strong action verb
    - Seamlessly integrate 2-3 technologies
    - Include quantifiable metrics
    - Avoid section labels (Challenge/Solution)
    Return Valid JSON array. Example for ["React","Node.js"]:
    [
      "Implemented React memoization with Node.js caching to reduce API calls by 40%",
      "Designed JWT authentication flow using Node.js middleware and React context API"
    ]`;
      
    try {
      const result = await AichatSession.sendMessage(prompt);
      const data = await result.response.text();
      console.log(data)
      const cleanData = data.replace(/```json|```/g, '').trim();
      
      if (cleanData.startsWith('[') && cleanData.endsWith(']')) {
        const parsedData = JSON.parse(cleanData);
        updatedProjects[index] = {
          ...project,
          aiDescriptions: parsedData,
          isLoading: false
        };
        updateProject(index, updatedProjects[index]);
        setAiPromptInputVisible(prev => ({ ...prev, [index]: true }));
      }
    } catch (error) {
      console.error('Error generating project description:', error);
      updatedProjects[index] = { ...project, isLoading: false };
      updateProject(index, updatedProjects[index]);
    }
  };

  const handleModifyProjectDescription = async (index) => {
    const prompt = aiPrompts[index];
    if (!prompt) return;

    const project = projects[index];
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...project, isLoading: true };
    updateProject(index, updatedProjects[index]);

    try {
      const result = await AichatSession.sendMessage(
        `Modify this project description: ${content[index]} according to: ${prompt}. 
        Return only the modified description as a JSON array of bullet points.`
      );
      
      const data = await result.response.text();
      const cleanData = data.replace(/```json|```/g, '').trim();
      
      if (cleanData.startsWith('[') && cleanData.endsWith(']')) {
        const parsedData = JSON.parse(cleanData);
        updatedProjects[index] = {
          ...project,
          aiDescriptions: parsedData,
          isLoading: false
        };
        updateProject(index, updatedProjects[index]);
        setAiPrompts(prev => ({ ...prev, [index]: '' }));
      }
    } catch (error) {
      console.error('Error modifying project description:', error);
      updatedProjects[index] = { ...project, isLoading: false };
      updateProject(index, updatedProjects[index]);
    }
  };

  const appendDescription = (index, description) => {
    const currentContent = content[index] || '';
    const newContent = `${currentContent}<ul><li>${description}</li></ul>`;
    handleChange(index, newContent);
  };
  const validateUrl = (url, index) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    if (url && !urlPattern.test(url)) {
      setErrors(prev => ({ ...prev, [index]: 'Please enter a valid URL' }));
      return false;
    }
    setErrors(prev => ({ ...prev, [index]: '' }));
    return true;

}
const handleUrlChange = (index, value) => {
  const project = projects[index];
  updateProject(index, { ...project, link: value });
  validateUrl(value, index);
};
  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Code className="w-5 h-5 mr-2 text-blue-400" />
        Projects
      </h2>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-lg text-white">Project #{index + 1}</h3>
              <button
                onClick={() => removeProject(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, { ...project, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Project Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => updateProject(index, { ...project, technologies: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="React, Node.js, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project URL
                </label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0ef] w-5 h-5" />
                  <input
                    type="url"
                    value={project.link || "https://"}
                    
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="https://github.com/username/project"
                  />

{errors[index] && (
            <p className="text-red-500 text-sm mt-1">{errors[index]}</p>
          )}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <button
                    type="button"
                    onClick={() => GenerateProjectDescription(index)}
                    disabled={!project.title || !project.technologies || project.isLoading}
                    className={`mb-2 px-3 py-2 rounded text-white flex items-center ${
                      project.isLoading || !project.title || !project.technologies
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700'
                    }`}
                  >
                    {project.isLoading ? (
                      <>
                        <FaSpinner className="h-5 w-5 mr-2 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" /> Generate Description
                      </>
                    )}
                  </button>
                </div>

                <ReactQuill
                  value={content[index] || ''}
                  onChange={(value) => handleChange(index, value)}
                  theme="snow"
                  
                  className="h-40 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              </div>
              {project.isLoading ? (
                <SkeletonTheme baseColor="#b3b1b1" highlightColor="#444">
                   <p> <Skeleton count={4} /></p>
                </SkeletonTheme>
              ) : (
                project.aiDescriptions?.map((desc, descIndex) => (
                  <div
                    key={descIndex}
                    className="bg-gray-600 relative mt-1 flex-row rounded w-[100%] p-2 "
                  >
                    <p className="text-white text-sm">{desc}</p>
                    <button
                      type="button"
                      onClick={() => appendDescription(index, desc)}
                      className="px-3 py-2 bg-blue-500 absolute right-1 top-0 rounded text-white hover:bg-blue-700 transition-colors mt-2"
                    >
                      <Plus />
                    </button>
                  </div>
                ))
              )}

              {aiPromptInputVisible[index] && (
                <div className="mt-6 md:col-span-2">
                  <h2 className="text-gray-400 font-semibold mb-2">Modify Description with AI</h2>
                  <div className="flex items-center bg-gray-700 p-2 rounded">
                    <input
                      type="text"
                      value={aiPrompts[index] || ''}
                      onChange={(e) => setAiPrompts(prev => ({ ...prev, [index]: e.target.value }))}
                      placeholder="E.g.: 'Make more technical' or 'Focus on performance improvements'"
                      className="flex-1 px-3 text-white py-2 bg-transparent outline-none border-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleModifyProjectDescription(index)}
                      className="ml-2 p-2 hover:bg-gray-600 rounded"
                    >
                      <IoSend className="text-white hover:text-gray-200 text-2xl" />
                    </button>
                  </div>
                </div>
              )}
            
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => addProject()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Project
      </button>
    </div>
  );
}