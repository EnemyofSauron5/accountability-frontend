// scripts/rewriteTags.js
const fs = require('fs');
const path = require('path');
const tagMap = require('./tagMap'); // Import the mappings

const entriesPath = path.join(__dirname, '../public/Entries/index.json');
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'));

// Track tags that were rewritten or removed
const rewrittenTags = new Map();
const removedTags = new Set();
let changesMade = false;

// Apply tag rewrites to all entries
entries.forEach(entry => {
  if (entry.tags && Array.isArray(entry.tags)) {
    const originalTags = [...entry.tags]; // Copy for comparison

    // Replace or remove tags according to the mapping
    entry.tags = entry.tags
      .map(tag => {
        if (tagMap.hasOwnProperty(tag)) {
          const mapped = tagMap[tag];
          if (mapped === null) {
            removedTags.add(tag);
            return null; // Flag for removal
          } else {
            rewrittenTags.set(tag, mapped);
            return mapped;
          }
        }
        return tag;
      })
      .filter(tag => tag !== null); // Remove tags mapped to null

    // Remove duplicates
    entry.tags = [...new Set(entry.tags)];

    if (JSON.stringify(originalTags) !== JSON.stringify(entry.tags)) {
      changesMade = true;
    }
  }
});

// Save the updated entries if anything changed
if (changesMade) {
  fs.writeFileSync(entriesPath, JSON.stringify(entries, null, 2), 'utf-8');

  if (rewrittenTags.size > 0) {
    console.log('\n🔄 Tag Rewrites Applied\n----------------------');
    rewrittenTags.forEach((newTag, oldTag) => {
      console.log(`${oldTag.padEnd(30)} → ${newTag}`);
    });
  }

  if (removedTags.size > 0) {
    console.log('\n🗑️  Tags Removed\n----------------------');
    removedTags.forEach(tag => {
      console.log(`${tag}`);
    });
  }

  console.log(`\n✅ Changes saved to ${entriesPath}`);
} else {
  console.log('\n❌ No tag changes were needed.');
}
