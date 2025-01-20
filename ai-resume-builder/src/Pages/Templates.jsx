import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TemplateSection } from './ResumetemplateSection/TemplateSection';



const templates = [
  {
    id: '1',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with a focus on readability',
    popular: true,
    preview: 'TemplateImage/template1.png'
  },
  {
    id: '2',
    name: 'Creative Portfolio',
    description: 'Stand out with a unique layout perfect for creative roles',
    preview: '/TemplateImage/template2.png'
  },
  {
    id: '3',
    name: 'Executive Suite',
    
    description: 'Professional template ideal for senior positions',
    preview: '/TemplateImage/template3.png'
  },
  {
    id: '4',
    name: 'Minimal Classic',
    description: 'Traditional layout with a modern minimal twist',
    preview: '/TemplateImage/template4.png'
  },

];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Templates() {
  return (
    <section id="templates" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white">
            Professional Resume Templates
          </h2>
          <p className="mt-4 text-xl text-blue-200">
            Choose from our collection of ATS-friendly templates
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1  gap-4"
        >
          {templates.map((template) => (
            <TemplateSection key={template.id} {...template} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-white">
            All templates include:
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'ATS-Friendly Format',
              'Multiple Color Schemes',
              'Custom Sections',
              'PDF Download',
              'One-Click Apply',
              'Mobile Responsive'
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 text-gray-300"
              >
                <Check className="h-5 w-5 text-blue-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}