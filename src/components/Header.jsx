import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4 text-sm font-semibold">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
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
  );
}