# 🧠 Accountability Archive — Tag Management Cheat Sheet

This document explains how to maintain and update the tag system across the archive, including rewriting, pruning, and auditing tags.

---

## 📁 Folder Structure

Your relevant files should live in:

```
accountability-frontend/
├── public/
│   └── Entries/
│       └── index.json         # Master entry data
├── src/
│   └── data/
│       └── tag-index.json     # Category-organized tag list (optional)
├── scripts/
│   ├── tagMap.js              # Dictionary of tag rewrites
│   ├── rewriteTags.js         # Automates tag consolidation
│   ├── pruneTags.js           # Removes unused tags from tag-index.json
│   └── auditTags.js           # Shows all tags and usage counts
```

---
---

## 🧹 Rare Tag Management Workflow

Use this workflow when you want to evaluate and clean up infrequently used tags.

### 📊 Step 1: Audit Tags
```bash
node scripts/auditTags.js
```

This prints every tag and how many times it’s used.
- Rare tags (only 1 use) are marked with `🔸 Rare`

---

### ✏️ Step 2: Manual Review

Decide whether each rare tag:
- Should be merged (use `tagMap.js`)
- Should be deleted (edit `index.json`)
- Should be kept (it's just rare for now)

---

### 🧾 Step 3: Apply Changes

- For merges:
  - Update `tagMap.js`
  - Run:
    ```bash
    node scripts/rewriteTags.js
    ```
- For deletions:
  - Edit `public/Entries/index.json` directly
  - Remove unwanted tags from any affected entries

---

### 🧹 Step 4: Prune Tag Index
After rewrites or deletions:
```bash
node scripts/pruneTags.js
```

This updates `tag-index.json` to match your entries exactly.

---

✅ This hybrid approach gives you:
- Human curation
- Machine precision
- Long-term consistency

Want to know more about each step? Dive in below.

## 🔁 1. Rewrite Tags (`rewriteTags.js`)

Use this script to merge, rename, or consolidate tags based on mapping logic defined in `tagMap.js`.

### Example `tagMap.js`:
```js
module.exports = {
  "Crypto Ball": "Crypto",
  "Donald Trump Jr.": "Trump Family",
  "Eric Trump": "Trump Family",
  "Self-Dealing": "Monetization of Office",
  "Foreign Governments": "Foreign Influence"
};
```

### To Run:
```bash
node scripts/rewriteTags.js
```

- Set `dryRun = true` in the script to preview changes
- Set `dryRun = false` to apply rewrites directly to `index.json`

---

## 🧹 2. Prune Unused Tags (`pruneTags.js`)

Removes any tag from `tag-index.json` that is no longer used by any entry.

### To Run:
```bash
node scripts/pruneTags.js
```

You should run this after:
- Adding/removing entries
- Merging tags via `rewriteTags.js`
- Manually editing `index.json`

---

## 📊 3. Audit Tag Usage (`auditTags.js`)

Prints a report of all current tags in use, alphabetically, with how many entries each appears in.

### To Run:
```bash
node scripts/auditTags.js
```

### Output Example:
```
📊 Tag Usage Report
-------------------
Crypto                        — 14
Crypto Ball                   — 1 🔸 Rare
Donald Trump                  — 24
Donald Trump Jr.              — 1 🔸 Rare
...

✅ Audit complete. Consider merging rare tags with tagMap.js if appropriate.
```

Use this to identify:
- Redundant or duplicate tags
- One-off typos or inconsistencies
- Candidates for consolidation

---

## 🛠 Suggested Workflow

```bash
# 1. Run the audit to identify potential problems
node scripts/auditTags.js

# 2. Edit tagMap.js to define any rewrites or merges
# 3. Preview what will change
node scripts/rewriteTags.js   # dryRun = true

# 4. Apply changes
# (Edit rewriteTags.js to set dryRun = false)
node scripts/rewriteTags.js

# 5. Prune unused tags from tag-index.json
node scripts/pruneTags.js
```

---

## 🧠 Tips

- You do **not** need to maintain `tag-index.json` manually—let the scripts handle it.
- You **can** continue to add entries manually to `public/Entries/index.json`.
- Always `git add . && git commit` before running tag-rewriting or pruning—just in case.

---

## 🚀 You Now Have:

- 🔁 Rewrite automation (`rewriteTags.js`)
- 🧹 Pruning logic (`pruneTags.js`)
- 📊 Audit and insight (`auditTags.js`)
- 🧾 Human-readable `tagMap.js`
- 🧠 A system that remembers what you want it to do

Let the archive scale—your tag infrastructure is futureproof.
