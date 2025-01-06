// Template: Classic Professional (React + TailwindCSS)

import React from 'react';

const ClassicProfessional = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">John Doe</h1>
        <h2 className="text-xl font-medium text-gray-600">Full-Stack Developer</h2>
        <p className="text-sm text-gray-500">Email: john.doe@example.com | Phone: +123 456 7890 | LinkedIn: linkedin.com/in/johndoe</p>
      </header>

      <main className="space-y-6">
        <section className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Profile</h3>
          <p className="text-gray-600">An experienced full-stack developer with expertise in MERN stack, passionate about building scalable web applications and innovative solutions.</p>
        </section>

        <section className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Skills</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>JavaScript (ES6+), React, Node.js, Express.js</li>
            <li>MongoDB, SQL</li>
            <li>HTML5, CSS3, TailwindCSS</li>
            <li>Version Control (Git, GitHub)</li>
          </ul>
        </section>

        <section className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Experience</h3>
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-800">Full-Stack Developer</h4>
            <p className="text-sm text-gray-500">ABC Tech Solutions | Jan 2022 - Present</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Developed and maintained web applications using React and Node.js.</li>
              <li>Collaborated with cross-functional teams to design scalable solutions.</li>
              <li>Improved application performance by 30% through code optimization.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-800">Frontend Developer Intern</h4>
            <p className="text-sm text-gray-500">XYZ Corp | Jun 2021 - Dec 2021</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Built responsive UI components using React and TailwindCSS.</li>
              <li>Contributed to bug fixing and performance enhancements.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Education</h3>
          <p className="text-gray-600">Bachelor of Science in Computer Science</p>
          <p className="text-sm text-gray-500">University of Example | Graduated: 2021</p>
        </section>
      </main>
    </div>
  );
};

export default ClassicProfessional;
