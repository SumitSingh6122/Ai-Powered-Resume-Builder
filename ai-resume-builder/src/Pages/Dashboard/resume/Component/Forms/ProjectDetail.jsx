import React from 'react';
import { Code, Plus, Trash2, Link } from 'lucide-react';
import { useResumeStore } from '../../../../Store/useResumeStore';

export default function ProjectsSection() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();

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
                  value={project.name}
                  onChange={(e) => updateProject(index, { ...project, name: e.target.value })}
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
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => updateProject(index, { ...project, url: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, { ...project, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Describe your project, its impact, and your role"
                />
              </div>
            </div>
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