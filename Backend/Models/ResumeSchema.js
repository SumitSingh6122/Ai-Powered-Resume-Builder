import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  resumeData: { type: mongoose.Schema.Types.Mixed, required: true }, // To store the entire JSON as is
  createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume; 
