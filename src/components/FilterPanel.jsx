// src/components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import { loadEntries } from '../data/loadEntries';

const FilterPanel = ({ onTagChange }) => {
  const [allTags, setAllTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

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
    setActiveTag(newTag);
    onTagChange(newTag);
  };

  return (
    <div className="filter-panel my-4 px-2 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-1 justify-center">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-xs transition border ${
              activeTag === tag
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200'
            }`}
          >
            {tag}
          </button>
        ))}

        {activeTag && (
          <button
            onClick={() => handleTagClick(activeTag)}
            className="ml-2 px-3 py-1 bg-gray-800 text-white rounded-full text-xs hover:bg-gray-700"
          >
            Return to Timeline
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
