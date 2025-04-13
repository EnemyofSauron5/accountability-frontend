// scripts/auditTags.js
const fs = require('fs');
const path = require('path');

const entriesPath = path.join(__dirname, '../public/Entries/index.json');
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'));

const tagCounts = {};

entries.forEach(entry => {
  (entry.tags || []).forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
});

const sortedTags = Object.entries(tagCounts)
  .sort((a, b) => a[0].localeCompare(b[0]));

console.log('\n📊 Tag Usage Report\n-------------------');
sortedTags.forEach(([tag, count]) => {
  const note = count === 1 ? '🔸 Rare' : '';
  console.log(`${tag.padEnd(30)} — ${count} ${note}`);
});

console.log('\n✅ Audit complete. Consider merging rare tags with tagMap.js if appropriate.');
