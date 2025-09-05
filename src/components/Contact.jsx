import React from 'react';

export default function Contact() {
  return (
    <section id="contact">
      <h1 className="text-3xl font-bold mb-4">📨 Contact Us</h1>
      <p className="mb-4">We welcome suggestions, additions, corrections, or commentary.</p>
      <div className="mb-6">
        <p className="mb-2">Email us directly:</p>
        <a 
          href="mailto:EnemyofSauron666@gmail.com" 
          className="text-lg font-semibold text-blue-600 hover:text-blue-800 underline"
        >
          EnemyofSauron666@gmail.com
        </a>
      </div>
      <div className="max-w-xl">
        <p className="text-gray-600 text-sm">
          Please include relevant details in your email to help us respond more effectively.
        </p>
      </div>
    </section>
  );
}