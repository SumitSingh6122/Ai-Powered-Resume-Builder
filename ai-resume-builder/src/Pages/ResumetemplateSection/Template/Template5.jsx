import React from "react";

const Template5 = () => {
  return (
    <div className="bg-gray-100 p-4 min-h-screen flex justify-center">
      <div className="max-w-4xl bg-white shadow-lg flex">
        {/* Left Column */}
        <div className="w-1/3 bg-blue-900 text-white p-6">
          <div className="flex flex-col items-center">
            <img
              src="https://storage.googleapis.com/a1aa/image/4-j5pVbLz0TnyW7ac2bPwqfm-W1krILYEli-e5fk0uk.jpg"
              alt="Profile of Richard Sanchez"
              className="rounded-full mb-4"
              width={100}
              height={100}
            />
            <h1 className="text-2xl font-bold">RICHARD SANCHEZ</h1>
            <h2 className="text-lg">MARKETING MANAGER</h2>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">CONTACT</h3>
            <p>📞 +123-456-7890</p>
            <p>📧 hello@reallygreatsite.com</p>
            <p>📍 123 Anywhere St, Any City</p>
            <p>🌍 www.reallygreatsite.com</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">EDUCATION</h3>
            <p>2029 - 2030 | WARDIERE UNIVERSITY | Master of Business Management</p>
            <p>2025 - 2029 | WARDIERE UNIVERSITY | Bachelor of Business | GPA: 3.8/4.0</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">SKILLS</h3>
            <ul className="list-disc list-inside">
              {[
                "Project Management",
                "Public Relations",
                "Marketing",
                "Teamwork",
                "Time Management",
                "Effective Communication",
                "Critical Thinking",
              ].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">LANGUAGES</h3>
            <p>English (Fluent)</p>
            <p>French (Intermediate)</p>
            <p>Spanish (Intermediate)</p>
          </div>
        </div>
        {/* Right Column */}
        <div className="w-2/3 p-6">
          <div>
            <h3 className="text-xl font-bold mb-2">PROFILE</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">WORK EXPERIENCE</h3>
            {[ 
              { company: "Borecille Studio", role: "Marketing Manager & Specialist", period: "2020 - PRESENT", tasks: ["Develop marketing strategies", "Lead market research", "Ensure brand consistency"] },
              { company: "Faugutt Studio", role: "Marketing Manager & Specialist", period: "2015 - 2020", tasks: ["Plan marketing budget", "Collaborate on campaigns", "Analyze performance metrics"] },
              { company: "Studio Showed", role: "Marketing Manager & Specialist", period: "2014 - 2015", tasks: ["Develop relationships with partners", "Execute marketing initiatives"] }
            ].map((job, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-bold">{job.company}</h4>
                <p className="italic">{job.role}</p>
                <p>{job.period}</p>
                <ul className="list-disc list-inside">
                  {job.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">CERTIFICATIONS</h3>
            {[ 
              { title: "Certified Digital Marketing Professional", organization: "Digital Marketing Institute", year: "2021" },
              { title: "Google Analytics Certified", organization: "Google", year: "2020" }
            ].map((cert, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{cert.title}</p>
                <p>{cert.organization}</p>
                <p>{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template5;
