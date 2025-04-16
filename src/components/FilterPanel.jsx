// src/components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import { loadEntries } from '../data/loadEntries';

const FilterPanel = ({ onTagChange, activeTag }) => {  // Add activeTag prop here
  const [allTags, setAllTags] = useState([]);
  const [localActiveTag, setLocalActiveTag] = useState(null);  // For local state if needed

  useEffect(() => {
    loadEntries().then((entries) => {
      const tagSet = new Set();
      entries.forEach((entry) => {
        entry.tags?.forEach((tag) => tagSet.add(tag));
      });
      setAllTags(Array.from(tagSet).sort());
    });
  }, []);

  const handleTagClick = (tag) => {
    const newTag = tag === activeTag ? null : tag;
    onTagChange(newTag);
  };

  return (
    <div>
      <div className="text-sm text-gray-400 text-center">
        activeTag: {activeTag || 'None'}
      </div>
      
      <div className="filter-panel my-6 px-2 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-1 justify-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition border ${
                activeTag === tag
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;