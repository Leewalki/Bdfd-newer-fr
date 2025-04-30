const express = require('express');
const setPrefixHandler = require('./setprefix');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route zum Setzen des Prefixes
app.post('/api/setprefix', setPrefixHandler);

// Route zum Abrufen des Prefixes
app.get('/api/getprefix', (req, res) => {
  const userId = req.query.userId;
  const prefixFilePath = './prefixes.json';

  fs.readFile(prefixFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Lesen der Datei:', err.message);
      return res.status(500).json({ error: 'Fehler beim Lesen der Datei' });
    }

    const prefixes = JSON.parse(data || '{}');
    const prefix = prefixes[userId] || '!';
    res.json({ prefix });
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
