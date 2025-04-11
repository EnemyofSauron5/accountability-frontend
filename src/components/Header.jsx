import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full bg-gray-100 py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col items-center px-4">
        <img
          src="/your-snake-image.png"
          alt="Be Kind. Be Curious."
          className="max-w-full h-auto mb-4"
        />
        <nav className="space-x-4 text-lg font-semibold">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/about" className="text-blue-600 hover:underline">About</Link>
          <Link to="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
