// scripts/pruneTags.js
const fs = require('fs');
const path = require('path');
const tagMap = require('./tagMap'); // Import the tag mapping
const entriesPath = path.join(__dirname, '../public/Entries/index.json');
const tagIndexPath = path.join(__dirname, '../src/data/tag-index.json');

// Load data
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'));
const tagIndex = JSON.parse(fs.readFileSync(tagIndexPath, 'utf-8'));

// Track merged tags for reporting
let mergedTags = new Map();
let changesMade = false;

// First apply tag mergers to entries
console.log('🔄 Applying tag mergers...');
entries.forEach(entry => {
  if (entry.tags && Array.isArray(entry.tags)) {
    const originalTags = [...entry.tags]; // Copy for comparison
    
    // Replace tags according to the mapping
    entry.tags = entry.tags.map(tag => {
      if (tagMap[tag]) {
        const oldTag = tag;
        const newTag = tagMap[tag];
        
        // Track merges for reporting
        if (!mergedTags.has(oldTag)) {
          mergedTags.set(oldTag, newTag);
        }
        return newTag;
      }
      return tag;
    });
    
    // Remove duplicates that might have been created during merging
    entry.tags = [...new Set(entry.tags)];
    
    // Check if changes were made
    if (JSON.stringify(originalTags) !== JSON.stringify(entry.tags)) {
      changesMade = true;
    }
  }
});

// If changes were made, save updated entries
if (changesMade) {
  fs.writeFileSync(entriesPath, JSON.stringify(entries, null, 2), 'utf-8');
  console.log('\n🔄 Tag Mergers Applied\n----------------------');
  mergedTags.forEach((newTag, oldTag) => {
    console.log(`${oldTag.padEnd(30)} → ${newTag}`);
  });
}

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