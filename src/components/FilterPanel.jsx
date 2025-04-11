import React from 'react';

export default function FilterPanel({ tags, selectedTags, onChange }) {
  const handleToggle = (tag) => {
    const newSelected = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onChange(newSelected);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Filter by Tag:</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleToggle(tag)}
            className={`px-3 py-1 rounded-full border text-sm transition
              ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
