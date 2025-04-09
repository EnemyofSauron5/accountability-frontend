import AboutContactPage from './components/AboutContactPage';
import React, { useEffect, useState } from 'react';
import EntryCard from './components/EntryCard';
import FilterPanel from './components/FilterPanel';
import { loadEntries } from './data/loadEntries';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const data = await loadEntries();
      console.log('Loaded entries:', data);
      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEntries(sortedData);
      setFilteredEntries(sortedData);
    }
    fetchEntries();
  }, []);

  const handleFilterChange = (tags) => {
    setSelectedTags(tags);
    if (tags.length === 0) {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter(entry =>
        tags.every(tag => entry.tags.includes(tag))
      );
      setFilteredEntries(filtered);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <header>
              <h1>Accountability Archive</h1>
              <p>2 + 2 = 4. No exceptions.</p>
            </header>
            <FilterPanel
              tags={extractTags(entries)}
              selectedTags={selectedTags}
              onChange={handleFilterChange}
            />
            <div className="grid">
              {filteredEntries.map((entry, idx) => (
                <EntryCard key={idx} entry={entry} />
              ))}
            </div>
            <div className="flex justify-between w-full text-sm font-semibold">
  <a href="/" className="hover:underline">Home</a>
  <a href="#about" className="hover:underline">About Us</a>
  <a href="#contact" className="hover:underline">Contact Us</a>
</div>
          </div>
        } />
        <Route path="/about" element={<AboutContactPage />} />
      </Routes>
    </Router>
  );
}

function extractTags(entries) {
  const tagSet = new Set();
  entries.forEach(entry => {
    if (entry && entry.tags && Array.isArray(entry.tags)) {
      entry.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}
