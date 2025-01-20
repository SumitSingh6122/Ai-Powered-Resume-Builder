import AuthReducer from './AuthSlice';
import ResumeSlice from './ResumeSlice';
import {configureStore} from '@reduxjs/toolkit';

const store=configureStore({
    reducer:{
 auth:AuthReducer,
 ResumeState:ResumeSlice,
    },
})
export default store;