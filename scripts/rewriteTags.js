// scripts/rewriteTags.js
const fs = require('fs');
const path = require('path');
const tagMap = require('./tagMap'); // Import the mappings

const entriesPath = path.join(__dirname, '../public/Entries/index.json');
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'));

// Track tags that were rewritten
const rewrittenTags = new Map();
let changesMade = false;

// Apply tag rewrites to all entries
entries.forEach(entry => {
  if (entry.tags && Array.isArray(entry.tags)) {
    const originalTags = [...entry.tags]; // Copy for comparison
    
    // Replace tags according to the mapping
    entry.tags = entry.tags.map(tag => {
      if (tagMap[tag]) {
        const oldTag = tag;
        const newTag = tagMap[tag];
        
        // Track rewrites for reporting
        if (!rewrittenTags.has(oldTag)) {
          rewrittenTags.set(oldTag, newTag);
        }
        
        return newTag;
      }
      return tag;
    });
    
    // Remove duplicates that might have been created during rewriting
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
  
  console.log('\n🔄 Tag Rewrites Applied\n----------------------');
  rewrittenTags.forEach((newTag, oldTag) => {
    console.log(`${oldTag.padEnd(30)} → ${newTag}`);
  });
  console.log(`\n✅ Changes saved to ${entriesPath}`);
} else {
  console.log('\n❌ No tag changes were needed.');
}