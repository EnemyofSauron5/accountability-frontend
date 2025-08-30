Here's an updated README file that reflects our adopted protocols:

# 🧠 Accountability Archive — Tag Management System

This document explains how to maintain and update the tag system for the archive, focusing on our consolidated approach for tag organization.

---

## 📁 Key Files

```
accountability-frontend/
├── public/
│   └── Entries/
│       └── index.json         # Master entry data with all articles and tags
├── src/
│   └── data/
│       └── tag-index.json     # Category-organized tag index
├── scripts/
│   ├── tagMap.js              # Tag consolidation mapping definitions
│   ├── rewriteTags.js         # Script to apply tag consolidations
│   ├── pruneTags.js           # Updates tag-index.json to match entries
│   └── auditTags.js           # Analyzes and reports on tag usage
```

---

## 🔄 Tag Management Workflow

Our tag management follows a three-step process of audit, consolidate, and prune.

### 📊 Step 1: Audit Tags

```bash
node scripts/auditTags.js
```

This generates a complete report of all tags and their usage count, highlighting rare tags (used only once) with a 🔸 marker.

---

### 🔀 Step 2: Consolidate Tags

After reviewing the audit, update the tag mapping file to define consolidations:

1. Edit `tagMap.js` to define tag mappings:
   ```javascript
   // scripts/tagMap.js
   module.exports = {
     // Group related tags
     "pay-to-play": "Pay-to-Play",
     "Donor Access": "Pay-to-Play",
     "Cryptocurrency": "Crypto",
     "Bitcoin": "Crypto", 
     "Mar-a-Lago": "Trump Residences",
     // ... more mappings
   };
   ```

2. Apply the mappings:
   ```bash
   node scripts/rewriteTags.js
   ```

This will update all entries in `index.json` with the new consolidated tags.

---

### 🧹 Step 3: Prune Tag Index

```bash
node scripts/pruneTags.js
```

This synchronizes `tag-index.json` with the actual tags used in your entries, removing any tags that are no longer used after consolidation.

---

## 📋 Consolidation Strategy

When consolidating tags, follow these principles:

1. **Group by Narrative Arc**: 
   - Corruption/Quid Pro Quo
   - Conflicts of Interest
   - Financial Dealings
   - Trump Business Empire
   - Musk Companies

2. **Standardize Similar Concepts**:
   - Merge variant spellings and forms (e.g., "fundraising" → "Fundraising")
   - Consolidate closely related concepts (e.g., "Account Terminations" → "Account Closures")

3. **Create Logical Categories**:
   - Group locations (e.g., "Trump Residences")
   - Group organizations (e.g., "Banking Relationships")
   - Group related activities (e.g., "Influence Peddling")

---

## 🛠 Common Tasks

### Adding New Mappings

1. Edit `tagMap.js`
2. Run `node scripts/rewriteTags.js`
3. Run `node scripts/pruneTags.js`
4. Verify with `node scripts/auditTags.js`

### Manually Removing Tags

If you need to remove specific tags entirely rather than merging them:

1. Edit the entries directly in `public/Entries/index.json`
2. Run `node scripts/pruneTags.js` to update the tag index

### Complete Refresh

To apply all current mappings and clean up the tag system:

```bash
node scripts/rewriteTags.js
node scripts/pruneTags.js
node scripts/auditTags.js
```

---

## 🧠 Best Practices

- **Commit Before Changes**: Always `git add . && git commit` before running tag scripts
- **Iterative Approach**: Make tag consolidations in logical batches rather than all at once
- **Maintain Records**: Document major tag consolidation decisions
- **Regular Audits**: Run the audit script periodically to identify new opportunities for consolidation

---

## ✅ Results

Our tag management system allows for:
- Consistent narrative arcs
- Reduced tag sprawl
- Intuitive grouping of related concepts
- Scalable organization as the archive grows

This approach balances human curation with automated consistency to create a robust, maintainable tagging system.
📌 Tag Audit Pin Notes
1. Deportations → Detention Archipelago: retire “Deportations” as a tag; migrate all entries into “Detention Archipelago” for consistency and clarity.
2. Federal Takeover of Local Authority vs. Posse Comitatus: currently tagging entries with both. Revisit at next audit to decide whether they remain distinct arcs (structural authority grab vs. military policing violations) or should be consolidated in tagMap.js.
3. Trump Family v. U.S. Interests: candidate cluster to capture cases where Trump family enrichment intersects with U.S. policy at odds with the national interest. Includes World Liberty Financial (crypto ventures), Binance/CZ pardon campaign, PancakeSwap/Chinese financing ties, and Wall Street stablecoin GENIUS Act stories. Currently tagged under Crypto, World Liberty Financial, Conflicts of Interest, and Quid Pro Quo Corruption. Consider introducing this as a distinct narrative arc at next audit.