import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <h1 className="text-3xl font-bold mb-4">📨 Contact Us</h1>
      <p className="mb-4">We welcome suggestions, additions, corrections, or commentary.</p>
      <p className="mb-6">Email us: <strong>EnemyofSauron5@gmail.com</strong></p>

      {submitted ? (
        <p className="text-green-600">Thanks for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}