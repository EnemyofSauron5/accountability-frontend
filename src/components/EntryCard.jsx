import React from 'react';

export default function EntryCard({ entry }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{entry.title}</h3>
        <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
      </div>
      <p className="text-gray-700 mb-2">{entry.summary}</p>
      {entry.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
