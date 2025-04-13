// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="w-full max-w-6xl mx-auto relative mb-2 px-4">
      <nav className="w-full text-center text-sm text-blue-700 mb-1">
        <a href="/" className="mx-4 hover:text-blue-900 font-medium">Home</a>
        <a href="/about" className="mx-4 hover:text-blue-900 font-medium">About</a>
        <a href="/contact" className="mx-4 hover:text-blue-900 font-medium">Contact</a>
      </nav>

      <div className="w-full h-0.5 bg-red-600 mb-1"></div>

      <div className="flex justify-center my-2">
        <img
          src="/emblem-bkc.png"
          alt="Snake Emblem"
          className="w-28 h-auto"
        />
      </div>

      <div className="w-full h-0.5 bg-red-600 mb-1"></div>

      <h1 className="text-3xl font-bold text-center text-black">Accountability Archive</h1>
    </header>
  );
};

export default Header;
