const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS para Stremio
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Servir carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Asegurar manifest
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
