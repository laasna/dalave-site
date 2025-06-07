// src/ServicesSection.js
import React from 'react';
import './ServicesSection.css';

const services = [
  {
    title: 'Cloud Security Consulting',
    description: 'Accelerate your digital transformation journey with a more secure cloud.',
    icon: '☁️',
  },
  {
    title: 'Zero Trust Solutions',
    description: 'Implement zero trust security to protect your organization.',
    icon: '🔒',
  },
  {
    title: 'Identity and Access Management',
    description: 'Manage user identities and access securely and efficiently.',
    icon: '🆔',
  },
  {
    title: 'AI Security',
    description: 'Secure your data and AI assets with confidence.',
    icon: '🤖',
  },
  {
    title: 'Cloud DevSecOps',
    description: 'Automate CI/CD, boost security, and speed up software delivery.',
    icon: '🚀',
  },
  {
    title: 'Cloud Cost Optimization',
    description: 'Maximize cloud value and minimize cloud waste.',
    icon: '💰',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button className="service-button">View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
