// src/data/loadEntries.js

export async function loadEntries() {
  const response = await fetch('/Entries/index.json'); // Adjust path to match your folder casing
  const data = await response.json();
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}
