import React, { useState } from "react";
import Select from "react-select";
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import { useResumeStore } from "../../../../Store/useResumeStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AichatSession } from "@/Pages/Service/geminiapi";
import { FaSpinner } from "react-icons/fa";


const generateMonthYearOptions = (startYear = 2000, endYear = new Date().getFullYear()) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    for (let month of months) {
      options.push({ value: `${month} ${year}`, label: `${month} ${year}` });
    }
  }
  options.push({ value: "Present", label: "Present" }); // Add "Present" option
  return options;
};

export default function Experience() {
  const { experience, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [content, setcontent] = useState();
  const [loading, setloading] = useState(false);
  const [aiWorkDescription, setaiWoekDescription] = useState([]);
  const monthYearOptions = generateMonthYearOptions(2000, new Date().getFullYear());

  const handleChange = (index, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], description: value };
    updateExperience(index, updatedExperience[index]);
    setcontent(value);
  };
  
  const appendDescriptionToQuill = (index, description) => {
    const currentContent = experience[index]?.description || ""; // Get current editor content
    const newContent = `${currentContent}<ul><li>${description}</li></ul>`; // Append the new description
    handleChange(index, newContent); // Update the state and editor content
  }; 
  
  const GenerateWorkSummary = async (position, index) => {
    // Set loading state for the current experience
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], isLoading: true };
    updateExperience(index, updatedExperience[index]);

    const prompt = `position title: ${position}, Depending on the position title, give me 4-5 bullet points for my experience in a resume (Please give that in array format, not JSON, and give only one array and do not give any text output).`;

    try {
      const result = await AichatSession.sendMessage(prompt);
      const data = await result.response.text();

      let cleanData = data.replace(/```json|```/g, "").trim();
      if (cleanData.startsWith("[") && cleanData.endsWith("]")) {
        const parsedData = JSON.parse(cleanData);

        // Update the specific experience with AI-generated descriptions
        updatedExperience[index] = {
          ...updatedExperience[index],
          aiDescriptions: parsedData,
          isLoading: false,
        };
        updateExperience(index, updatedExperience[index]);
      } else {
        console.error("Invalid AI response format:", cleanData);
      }
    } catch (error) {
      console.error("Error generating work summary:", error);
      updatedExperience[index] = { ...updatedExperience[index], isLoading: false };
      updateExperience(index, updatedExperience[index]);
    }
  };


  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
      borderColor: "#4B5563",
      borderRadius: "0.5rem",
      padding: "0.25rem",
      color: "white",
      ":hover": {
        borderColor: "#3B82F6",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
      borderRadius: "0.5rem",
      color: "#D1D5DB",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3B82F6" : "#1F2937",
      color: state.isFocused ? "#FFFFFF" : "#D1D5DB",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9CA3AF",
      ":hover": {
        color: "#3B82F6",
      },
    }),
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
        Work Experience
      </h2>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-lg text-white">Experience #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, { ...exp, position: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                <Select
                  options={monthYearOptions}
                  value={monthYearOptions.find((opt) => opt.value === exp.startDate)}
                  onChange={(option) =>
                    updateExperience(index, { ...exp, startDate: option.value })
                  }
                  styles={customStyles}
                  placeholder="Start Date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                <Select
                  options={monthYearOptions}
                  value={monthYearOptions.find((opt) => opt.value === exp.endDate)}
                  onChange={(option) =>
                    updateExperience(index, { ...exp, endDate: option.value })
                  }
                  styles={customStyles}
                  placeholder="End Date"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Work Description</label>
                  <button
                    type="button"
                    onClick={() => GenerateWorkSummary(exp.position, index)}
                    disabled={exp.isLoading} // Disable button when loading
                    className={`mb-2 px-3 py-2 rounded text-white flex items-center ${exp.isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                      }`}
                  >
                    {exp.isLoading ? (
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
                  value={content}

                  onChange={(value) => handleChange(index, value)}
                  theme="snow"
                  className="h-40 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>

            {exp.aiDescriptions?.map((Des, descIndex) => (
              <div
                className="bg-gray-600 relative mt-1 rounded h-14 p-2 flex"
                key={`${Des}-${descIndex}`}
              >
                <p className="text-white text-sm">{Des}</p>
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 absolute right-1 top-0 rounded text-white hover:bg-blue-700 transition-colors mt-2"
                  onClick={() => appendDescriptionToQuill(index, Des)}
                >
                  <Plus />
                </button>
              </div>
            ))}

          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Experience
      </button>
    </div>
  );
}
