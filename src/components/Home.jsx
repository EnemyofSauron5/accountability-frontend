// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import EntryCard from './EntryCard';
import FilterPanel from './FilterPanel';
import { loadEntries } from '../data/loadEntries';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    loadEntries().then((data) => {
      const sorted = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)  // Oldest first for chronological narrative
      );
      setEntries(sorted);
    });
  }, []);

  const filteredEntries = activeTag
    ? entries.filter((entry) => entry.tags?.includes(activeTag))
    : entries;

  return (
    <div className="home-container max-w-6xl mx-auto px-4 pt-0 pb-6">
      {/* Add a wrapper div with fixed height around the activeTag display */}
      <div className="activeTag-display h-8 text-center text-gray-400">
        {activeTag && (
          <div className="text-sm">
            activeTag: {activeTag}
          </div>
        )}
      </div>
      
      <FilterPanel onTagChange={setActiveTag} activeTag={activeTag} />
      
      {activeTag && (
        <h2 className="text-center text-xl font-semibold text-blue-700 mb-4">
          Showing entries tagged: {activeTag}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No entries found with the selected tag.
        </div>
      )}

      {/* Always show the bottom "Return to Timeline" button when a tag is selected */}
      {activeTag && (
        <div className="text-center mt-8 mb-4">
          <button
            onClick={() => setActiveTag(null)}
            className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-700"
          >
            Return to Timeline
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;