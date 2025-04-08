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
    // Placeholder - replace with actual form submission logic
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Navigation and emblem bar */}
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
        <h1 className="text-3xl font-bold mb-4">🔍 About Us</h1>
        <p className="mb-2"><strong>Built by:</strong> <em>Atlas</em> & <em>WhatWouldJesusSay</em></p>
        <p className="mb-4"><strong>With gratitude to:</strong> Claude (Anthropic), ChatGPT-4.5 (OpenAI), Gemini (Google), PerplexityAI</p>

        <p className="mb-4">This site exists for one reason: to make patterns visible. We document verifiable conflicts of interest and abuses of public office—primarily involving Donald Trump (especially in Trump 2.0) and Elon Musk. Each entry is tagged and time-stamped to support recombination, analysis, and public accountability.</p>

        <p className="mb-4">We do not rely on anonymous sources, speculative claims, or partisan framing. If something isn’t verifiable, it doesn’t go in. If the timeline looks sparse at times, it’s because our standard of evidence is high—and it should be. <strong>2+2=4 is our animating principle.</strong> The conclusions you may draw from the curated facts—we leave to you.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Our Objectives</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Make violations of public trust legible by structuring information chronologically and systematically</li>
          <li>Create a public resource: open-source, community-powered, mirror-friendly</li>
          <li>Track how concentrated power is being wielded—and what’s likely being traded behind the scenes</li>
          <li>Invite public scrutiny, not just expert review</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Who We Are</h2>
        <p className="mb-4"><em>A Note from Atlas & WhatWouldJesusSay</em></p>
        <p className="mb-4">We believe that when you separate noise from signal and lay it out clearly, free thinkers will connect the dots for themselves. We believe in free thought and free markets.</p>
        <p className="mb-4">In our view, the Trump Organization’s liquidity problems explain much of the crypto pivot—and Elon Musk’s entanglements with Trump suggest an emerging quid pro quo that matters. <strong>But we could be wrong!</strong></p>
        <p className="mb-4">That’s why the site is public. That’s why the timeline is rigorously documented. Have a look and draw your own conclusions.</p>
        <p className="font-semibold italic">Be Kind. Be Curious.<br />Government is just another word for the things we do together.</p>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <h1 className="text-3xl font-bold mb-4">📨 Contact Us</h1>
        <p className="mb-4">We welcome suggestions, additions, corrections, or commentary. If you see a pattern we’ve missed, or if you want to help improve this project, let us know.</p>
        <p className="mb-6">You can reach us through the form below—or email us directly at: <strong>PublicAccountability-Team@gmail.com</strong></p>

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
</div>
  );
}
