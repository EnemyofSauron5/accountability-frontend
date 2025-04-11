import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="relative mb-6">
      {/* Nav links on the top-left */}
      <nav className="absolute top-4 left-4 flex flex-col gap-2 text-sm font-semibold">
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

      {/* Emblem on the top-right */}
      <div className="absolute top-4 right-4 flex flex-col items-center w-20">
        <img
          src="/emblem-bkc.png"
          alt="Be Kind. Be Curious."
          className="h-12 w-12 max-w-[80px] shadow-md object-contain"
        />
      </div>
    </header>
  );
}
