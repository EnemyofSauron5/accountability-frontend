// scripts/copyRoutes.js
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'public', '_routes.json');
const destination = path.join(__dirname, '..', 'build', '_routes.json');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('❌ Failed to copy _routes.json:', err);
    process.exit(1);
  } else {
    console.log('✅ _routes.json copied successfully!');
  }
});
