import React from 'react';

const ContactUs = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">We’d love to hear from you! If you have any questions, feedback, or concerns, please reach out.</p>
      <ul className="space-y-2">
        <li><strong>Email:</strong> k_1980daga@yahoo.com        </li>
        <li><strong>Phone:</strong> +91 98304 64031</li>
        <li><strong>Address:</strong> Sunder Garments, Kolkata, West Bengal, India</li>
        <li>
          <strong>WhatsApp:</strong>{' '}
          <a href="https://wa.me/919830464031" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Click to Chat
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactUs;
