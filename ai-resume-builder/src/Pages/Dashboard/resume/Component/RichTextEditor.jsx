import { useResumeStore } from '@/Pages/Store/useResumeStore';
import { useState, useEffect } from 'react';
import { 
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';

export default function CustomEditor({ index, value, onChange }) {
    return (
      <EditorProvider>
        <Editor
          value={value}
          onChange={(newValue) => onChange(newValue)}  // Pass updated value to parent
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
        >
          <Toolbar className="bg-black">
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    );
  }
  