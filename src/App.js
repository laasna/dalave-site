import React, { useState } from 'react';
import './App.css';
import logo from './logo@2x.png';

// Service icons
import cloudIcon from './icons/cloud.png';
import devopsIcon from './icons/devops.png';
import aiIcon from './icons/ai.png';
import supportIcon from './icons/support.png';

// EmailJS for sending emails
import emailjs from '@emailjs/browser';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [aiReply, setAiReply] = useState('');

  const handleTalkClick = () => setShowForm(!showForm);
  const handleChatToggle = () => setShowChat(!showChat);

  const handleFileChange = (e) => {
    // File handler placeholder
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_2weqjvg',
      'template_pgucrib',
      e.target,
      'oxUyDozBhYMvTuD28'
    ).then(
      () => {
        alert('Message sent successfully!');
      },
      () => {
        alert('Failed to send message, please try again.');
      }
    );

    e.target.reset();
  };

  // 👇 New: Send user message to AI backend
  const sendToAgent = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setAiReply(data.reply);
    } catch (err) {
      console.error('Error contacting AI agent:', err);
      setAiReply("❌ Error contacting AI agent. Try again later.");
    }

    setUserMessage('');
  };

  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
        <button className="talk-button" onClick={handleTalkClick}>
          Let’s Talk
        </button>

        {showForm && (
          <div className="contact-form">
            <h2>Request a Callback</h2>
            <form onSubmit={sendEmail}>
              <label>Name</label>
              <input type="text" name="name" placeholder="Enter your name" required />
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" required />
              <label>Message</label>
              <textarea name="message" placeholder="Your message..." required></textarea>
              <label>Upload File</label>
              <input type="file" name="file" onChange={handleFileChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>

      {/* Services Section */}
      <div className="services">
        <h2>Our Services</h2>
        <div className="service-items">
          <div className="service-card">
            <img src={cloudIcon} alt="Cloud" className="service-icon" />
            <h3>Cloud Infrastructure</h3>
            <p>Deploy scalable, secure, and cost-effective cloud infrastructure with GCP or AWS.</p>
          </div>
          <div className="service-card">
            <img src={devopsIcon} alt="DevOps" className="service-icon" />
            <h3>DevOps Automation</h3>
            <p>CI/CD pipelines, monitoring, container orchestration & IaC using Terraform, Ansible.</p>
          </div>
          <div className="service-card">
            <img src={aiIcon} alt="AI" className="service-icon" />
            <h3>AI Solutions</h3>
            <p>AI-powered tools for smarter automation, chatbots, and predictive insights.</p>
          </div>
          <div className="service-card">
            <img src={supportIcon} alt="Security" className="service-icon" />
            <h3>Security & Compliance</h3>
            <p>Identity, data encryption, policy enforcement, and compliance frameworks.</p>
          </div>
        </div>
      </div>

      {/* Chat Popup Button */}
      <div className="chat-popup">
        <button onClick={handleChatToggle}>💬</button>
        {showChat && (
          <div className="contact-form">
            <h3>Hi there!</h3>
            <p>Ask us anything or leave a message 👇</p>
            <form onSubmit={sendEmail}>
              <label>Your Name</label>
              <input type="text" name="name" required />
              <label>Your Email</label>
              <input type="email" name="email" required />
              <label>Your Message</label>
              <textarea name="message" required></textarea>
              <label>Upload File</label>
              <input type="file" name="file" onChange={handleFileChange} />
              <button type="submit">Send</button>
            </form>

            {/* 👇 New: AI Chatbox Section */}
            <hr style={{ margin: '1rem 0' }} />
            <form onSubmit={sendToAgent}>
              <label>Chat with AI Agent</label>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask your question..."
              />
              <button type="submit">Ask</button>
            </form>
            {aiReply && (
              <div style={{ marginTop: '1rem', background: '#f9f9f9', padding: '0.5rem' }}>
                <strong>AI Reply:</strong> {aiReply}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
