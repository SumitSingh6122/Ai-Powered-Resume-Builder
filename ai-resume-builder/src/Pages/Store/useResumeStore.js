import { create } from 'zustand';

// Define the Zustand store
export const useResumeStore = create((set) => {
  const addDummyData = () => ({
    personalInfo: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      location: 'San Francisco, CA',
      link: 'linkedin.com/in/john-doe',
      website: 'https://johndoe.com', 
      GithubUrl:'www.github.com/sumit-singh',
      // // Added personal website link
    },

    position:'Full stack developer',
    level:"fresher",
    ResumeTemplateId:'1',
    summary:
      'Passionate software developer with experience in building scalable web applications and a strong background in full-stack development.',
    experience: [
      {
        company: 'TechCorp',
        position: 'Software Engineer',
        startDate: 'Jan 2021',
        endDate: 'Present',
        description:
          'Developed and maintained full-stack web applications, collaborated with cross-functional teams to implement new features.',
      },
      {
        company: 'Innovatech',
        position: 'Intern',
        startDate: 'Jun 2020',
        endDate: 'Dec 2020',
        description:[
          'Assisted in developing web applications and performed code reviews to improve code quality.',]
      },
    ],
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationDate: 'May 2020',
        achievements: 'Graduated with honors, Dean’s List recipient.',
      },
    ],
    projects: [
      {
        title: 'AI Resume Builder',
        description: 'A web app for generating resumes using AI.',
        technologies: ['React', 'Node.js', 'Zustand'],
        link: 'https://github.com/example/ai-resume-builder',
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing my projects and skills.',
        technologies: ['Next.js', 'Tailwind CSS'],
        link: 'https://johndoe.com',
      },
    ],
    certifications: [
      {
        name: 'Certified JavaScript Developer',
        organization: 'TechCertify',
        date: 'March 2023',
      },
      {
        name: 'AWS Certified Solutions Architect',
        organization: 'Amazon Web Services',
        date: 'June 2022',
      },
    ],
    skills: {
      technical: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      soft: ['Communication', 'Teamwork', 'Problem-Solving'],
      languages: ['English', 'Spanish'],
      tools: ['Git', 'VS Code', 'Postman'],
      design: ['Figma',
        'Adobe CC',
        'Sketch',
        'After Effects',
        'HTML/CSS',
        'JavaScript',
        'Webflow'],
    },
  });

  return {
    ...addDummyData(), // Add dummy data directly during store initialization

    // Add dummy data (optional method if needed for future use)
    addDummyData: () => set(addDummyData),

    // Define other store methods here
    updatePersonalInfo: (info) =>
      set((state) => ({
        personalInfo: { ...state.personalInfo, ...info },
      })),
   updateResumeTemplateID:(ResumeTemplateId)=>set({ResumeTemplateId}),
   updateLevel: (level) => set({ level }),
    updateSummary: (summary) => set({ summary }),
    updatePosition:(position)=>set({position}),
    addExperience: () =>
      set((state) => ({
        experience: [
          ...state.experience,
          { company: '', position: '', startDate: '', endDate: '', description: '' },
        ],
      })),

    updateExperience: (index, experience) =>
      set((state) => ({
        experience: state.experience.map((e, i) =>
          i === index ? { ...e, ...experience } : e
        ),
      })),

    removeExperience: (index) =>
      set((state) => ({
        experience: state.experience.filter((_, i) => i !== index),
      })),

    addEducation: () =>
      set((state) => ({
        education: [
          ...state.education,
          { school: '', degree: '', field: '', graduationDate: '', achievements: '' },
        ],
      })),

    updateEducation: (index, education) =>
      set((state) => ({
        education: state.education.map((e, i) =>
          i === index ? { ...e, ...education } : e
        ),
      })),

    removeEducation: (index) =>
      set((state) => ({
        education: state.education.filter((_, i) => i !== index),
      })),

    addProject: () =>
      set((state) => ({
        projects: [
          ...state.projects,
          { title: '', description: '', technologies: [], link: '' },
        ],
      })),

    updateProject: (index, project) =>
      set((state) => ({
        projects: state.projects.map((p, i) =>
          i === index ? { ...p, ...project } : p
        ),
      })),

    removeProject: (index) =>
      set((state) => ({
        projects: state.projects.filter((_, i) => i !== index),
      })),

    addCertification: () =>
      set((state) => ({
        certifications: [
          ...state.certifications,
          { name: '', organization: '', date: '' },
        ],
      })),

    updateCertification: (index, certification) =>
      set((state) => ({
        certifications: state.certifications.map((c, i) =>
          i === index ? { ...c, ...certification } : c
        ),
      })),

    removeCertification: (index) =>
      set((state) => ({
        certifications: state.certifications.filter((_, i) => i !== index),
      })),

    addSkill: (category, skill) =>
      set((state) => ({
        skills: {
          ...state.skills,
          [category]: [...state.skills[category], skill],
        },
      })),

    removeSkill: (category, index) =>
      set((state) => ({
        skills: {
          ...state.skills,
          [category]: state.skills[category].filter((_, i) => i !== index),
        },
      })),

    resetState: () =>
      set(() => ({
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          location: '',
          website: '',
        },
        summary: '',
        experience: [],
        education: [],
        projects: [],
        certifications: [],
        skills: {
          technical: [],
          soft: [],
          languages: [],
          tools: [],
        },
      })),
  };
});
