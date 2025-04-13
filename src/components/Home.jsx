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
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEntries(sorted);
    });
  }, []);

  const filteredEntries = activeTag
    ? entries.filter((entry) => entry.tags?.includes(activeTag))
    : entries;

  return (
    <div className="home-container max-w-6xl mx-auto px-4 py-6">
      <FilterPanel onTagChange={setActiveTag} />

      {activeTag && (
        <h2 className="text-center text-xl font-semibold text-blue-700 mb-4">
          Showing entries tagged: {activeTag}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        )
        )}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No entries found with the selected tag.
        </div>
      )}
     {activeTag && (
  <div className="text-center mt-6">
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
