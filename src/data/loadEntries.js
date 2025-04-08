export async function loadEntries() {
  const response = await fetch('/Entries/index.json');
  const data = await response.json();
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}
