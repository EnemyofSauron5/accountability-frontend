import React, { useEffect, useState } from 'react';
import EntryCard from './EntryCard';
import FilterPanel from './FilterPanel';
import { loadEntries } from '../data/loadEntries';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadEntries();
      const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEntries(sorted);
      setFilteredEntries(sorted);
    }
    fetchData();
  }, []);

  const handleFilterChange = (tags) => {
    setSelectedTags(tags);
    if (tags.length === 0) {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter((entry) =>
        tags.every((tag) => entry.tags.includes(tag))
      );
      setFilteredEntries(filtered);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Accountability Archive</h1>
      <p className="mb-6">2 + 2 = 4. No exceptions.</p>

      <FilterPanel
        tags={extractTags(entries)}
        selectedTags={selectedTags}
        onChange={handleFilterChange}
      />

      <div className="grid gap-4">
        {filteredEntries.map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function extractTags(entries) {
  const tagSet = new Set();
  entries.forEach((entry) => {
    if (entry?.tags?.length) {
      entry.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}
