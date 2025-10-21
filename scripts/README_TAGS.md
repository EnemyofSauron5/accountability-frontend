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
│   ├── CONSOLIDATION_LOG.md   # Historical record of consolidation decisions
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

2. **Document your reasoning** in `CONSOLIDATION_LOG.md`:
   - Why these tags were consolidated
   - What narrative arc they represent
   - Any future considerations

3. Apply the mappings:
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

4. **Maintain Historical Transparency**:
   - Every consolidation is documented in `CONSOLIDATION_LOG.md`
   - Original tags remain visible in `tagMap.js`
   - Git history preserves all changes
   - Anyone can reverse-engineer the tagging evolution

---

## 🛠 Common Tasks

### Adding New Mappings

1. Edit `tagMap.js`
2. Document reasoning in `CONSOLIDATION_LOG.md`
3. Run `node scripts/rewriteTags.js`
4. Run `node scripts/pruneTags.js`
5. Verify with `node scripts/auditTags.js`
6. Commit changes with descriptive message

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
- **Document Decisions**: Update `CONSOLIDATION_LOG.md` with rationale for each consolidation batch
- **Iterative Approach**: Make tag consolidations in logical batches rather than all at once
- **Regular Audits**: Run the audit script periodically to identify new opportunities for consolidation
- **Review Pin Notes**: Check the Pin Notes section below for pending consolidation decisions
-note: ChatGPT will want to automate everything, which is at odds with transparency. Claude is the best choice for consolidation strategies. When ChatGPT seems like it is offering consolidations that are technically clever but not human-centered, trust your gut and turn to Claude instead. At the time of this writing (10-21-25), Claude is hands-down the best at both coding and writing.

---

## 📌 Tag Audit Pin Notes

Consolidation decisions under consideration for future audits:

1. **Deportations → Detention Archipelago**: ✅ IMPLEMENTED (8-30-25)
   - Retired "Deportations" as a tag
   - Migrated all entries to "Detention Archipelago" for consistency and clarity

2. **Federal Takeover of Local Authority vs. Posse Comitatus**: 🔄 MONITORING
   - Currently consolidated together in tagMap.js
   - May represent distinct arcs: structural authority grab vs. military policing violations
   - Revisit at next audit if entry count grows significantly

3. **Trump Family v. U.S. Interests**: ⏳ UNDER CONSIDERATION
   - Candidate cluster to capture cases where Trump family enrichment intersects with U.S. policy at odds with national interest
   - Examples: World Liberty Financial, Binance/CZ pardon campaign, PancakeSwap/Chinese financing ties, Wall Street stablecoin GENIUS Act
   - Currently tagged under: Crypto, World Liberty Financial, Conflicts of Interest, Quid Pro Quo Corruption
   - **Decision**: Wait until 8-10 clear examples emerge, then introduce as distinct narrative arc
   - Review at next audit

---

## ✅ Results

Our tag management system allows for:
- Consistent narrative arcs
- Reduced tag sprawl
- Intuitive grouping of related concepts
- Scalable organization as the archive grows
- **Historical transparency and reversibility**
- **Clarity