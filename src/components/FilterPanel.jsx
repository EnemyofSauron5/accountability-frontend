// src/components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import { loadEntries } from '../data/loadEntries';

const FilterPanel = ({ onTagChange, activeTag }) => {
  const [allTags, setAllTags] = useState([]);

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
    <div className="filter-panel-container mb-4">
      {/* Reduced top spacing */}
      
      <div className="filter-panel mt-0 mb-4 px-2 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-1 justify-center">
          {allTags.map((tag, index) => (
            <button
              key={`tag-${index}-${tag}`}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition border ${
                activeTag === tag
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {activeTag && (
        <div className="text-center mt-2 mb-4">
          <button
            onClick={() => onTagChange(null)}
            className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-700"
          >
            Return to Timeline
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;