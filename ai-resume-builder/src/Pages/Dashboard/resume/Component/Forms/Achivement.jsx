import React from 'react';
import { Trophy, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/Pages/Store/useResumeStore';


export function AchievementsSection() {
  const {    certifications,addCertification,  updateCertification,  removeCertification } = useResumeStore();

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Trophy className="w-5 h-5 mr-2 text-blue-400" />
        Key Achievements & Certification
      </h2>

      <div className="space-y-6">
        { certifications?.map((achievement, index) => (
          <div key={index} className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-lg text-white">Achievement  & Certification #{index + 1}</h3>
              <button
                onClick={() =>removeCertification(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={ certifications.name}
                  onChange={(e) => updateCertification(index, { ...achievement, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="e.g., Increased Team Productivity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={ certifications.description}
                  onChange={(e) => updateCertification(index, { ...achievement, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Describe your achievement with specific metrics and results"
                />
              </div>

             

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="month"
                  value={ certifications.date}
                  onChange={(e) => updateAchievement(index, { ...achievement, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => addCertification()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Achievement
      </button>
    </div>
  );
}