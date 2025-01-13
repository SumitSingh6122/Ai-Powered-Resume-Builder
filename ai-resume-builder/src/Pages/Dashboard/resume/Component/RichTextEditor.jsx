import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const RichTextEditor = ({value}) => {
  const [content, setContent] = useState({value});

  const handleChange = (value) => {
    setContent(value);
  };

  return (

      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        className="h-32 bg-gray-700/50 border border-gray-600 rounded text-xl focus:ring-2 focus:ring-blue-500 text-white"
       
      />
   
  );
};

export default RichTextEditor;
