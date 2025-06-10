import json

# Read the JSON file
with open('public/Entries/index.json', 'r') as f:
    entries = json.load(f)

# Extract all source URLs
urls = []
for entry in entries:
    if 'sources' in entry:
        urls.extend(entry['sources'])

# Write URLs to a text file
with open('all_urls.txt', 'w') as f:
    for url in urls:
        f.write(url + '\n')

print(f"Extracted {len(urls)} URLs to all_urls.txt")
