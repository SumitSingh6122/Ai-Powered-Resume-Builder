import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Resume:null,
    AllResume:null,
       userID:null,
};
const ResumeSlice=createSlice({
  name:'ResumeState',
  initialState,
  reducers:{
    setResume:(state,action)=>{
        state.Resume=action.payload.Resume;
        state.AllResume=action.payload.AllResume;
    }
  }
});
export const {setResume} =ResumeSlice.actions;
export default ResumeSlice.reducer;

