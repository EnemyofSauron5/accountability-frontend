import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="w-full bg-gray-100 p-4 shadow-md flex items-center justify-between">
      {/* Left: Navigation links */}
      <nav className="flex gap-4 text-sm font-semibold">
        <Link
          to="/"
          className={`hover:underline ${location.pathname === '/' ? 'text-blue-700' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`hover:underline ${location.pathname === '/about' ? 'text-blue-700' : ''}`}
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className={`hover:underline ${location.pathname === '/contact' ? 'text-blue-700' : ''}`}
        >
          Contact Us
        </Link>
      </nav>

      {/* Right: Emblem */}
      <div className="flex items-center justify-center">
        <img
          src="/emblem-bkc.png"
          alt="Be Kind. Be Curious."
          className="h-12 w-12 object-contain shadow-md"
        />
      </div>
    </header>
  );
}
