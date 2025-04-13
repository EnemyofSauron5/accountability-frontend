// src/components/EntryCard.jsx
import React, { useState } from 'react';

export default function EntryCard({ entry }) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`bg-white text-black border border-blue-600 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200 p-4 ${
        expanded ? '' : 'aspect-square'
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="text-sm text-gray-500 mb-1">{formatDate(entry.date)}</div>
          <h3 className="text-lg font-bold mb-2">{entry.title}</h3>
          <p className="text-base text-black">
            {expanded ? entry.summary : `${entry.summary.slice(0, 120)}... `}
            {entry.summary.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-red-600 hover:text-red-800 text-sm ml-1"
              >
                {expanded ? 'Less' : 'More'}
              </button>
            )}
          </p>
        </div>

        {entry.sources?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {entry.sources.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-xs"
              >
                Source
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
