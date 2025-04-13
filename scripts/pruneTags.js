// scripts/pruneTags.js
const fs = require('fs');
const path = require('path');

const entriesPath = path.join(__dirname, '../public/Entries/index.json');
const tagIndexPath = path.join(__dirname, '../src/data/tag-index.json');

// Load data
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'));
const tagIndex = JSON.parse(fs.readFileSync(tagIndexPath, 'utf-8'));

// Extract all used tags from entries
const usedTags = new Set();
entries.forEach(entry => {
  entry.tags?.forEach(tag => usedTags.add(tag));
});

// Filter tag-index by removing unused tags
const prunedIndex = {};
for (const category in tagIndex) {
  const keptTags = tagIndex[category].filter(tag => usedTags.has(tag));
  if (keptTags.length > 0) {
    prunedIndex[category] = keptTags;
  }
}

// Write cleaned tag index back to file
fs.writeFileSync(tagIndexPath, JSON.stringify(prunedIndex, null, 2));
console.log('✅ tag-index.json cleaned. All unused tags removed.');
