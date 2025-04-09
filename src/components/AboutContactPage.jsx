import React, { useState } from "react";

export default function AboutContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 text-sm font-semibold">
          <a href="/" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
        </div>
        <div className="flex flex-col items-center w-20">
          <img
            src="/emblem-bkc.png"
            alt="Be Kind. Be Curious. emblem"
            className="h-12 w-12 max-w-[80px] shadow-md object-contain"
          />
          <div className="text-xs mt-1 italic text-center leading-tight">
            Be Kind. Be Curious.
          </div>
        </div>
      </div>
  
      {/* About Section */}
      <section id="about" className="mb-12">
        {/* ...your About content here... */}
      </section>
  
      {/* Contact Section */}
      <section id="contact">
        {submitted ? (
          <p className="text-green-600">Thanks for reaching out! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            {/* inputs */}
          </form>
        )}
      </section>
    </div>
  );
  }
  