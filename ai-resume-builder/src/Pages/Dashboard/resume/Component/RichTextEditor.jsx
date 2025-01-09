import React, { useState, useRef } from 'react';

const RichTextEditor = () => {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  // Execute formatting commands
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  // Save content on input
  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
  };

  return (
    <div className="text-editor">
      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => handleFormat('bold')}><b>B</b></button>
        <button onClick={() => handleFormat('italic')}><i>I</i></button>
        <button onClick={() => handleFormat('underline')}><u>U</u></button>
        <button onClick={() => handleFormat('strikeThrough')}><s>S</s></button>
        <button onClick={() => handleFormat('insertOrderedList')}>OL</button>
        <button onClick={() => handleFormat('insertUnorderedList')}>UL</button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        className="editor"
        onInput={handleInput}
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      {/* Display Output */}
      <div className="output">
        <h3>Output:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            border: '1px solid #eee',
            padding: '10px',
            backgroundColor: '#fff',
          }}
        ></div>
      </div>
    </div>
  );
};

export default RichTextEditor;
