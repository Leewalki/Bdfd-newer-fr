const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let userPrefix = {}; // Objekt, um den Prefix pro Benutzer zu speichern

// Route zum Setzen des Prefixes
app.post('/api/setprefix', (req, res) => {
  const { userId, newPrefix } = req.body;
  if (!userId || !newPrefix) {
    return res.status(400).json({ error: 'UserId und newPrefix sind erforderlich' });
  }
  userPrefix[userId] = newPrefix;
  res.json({ success: true, message: `Prefix für Benutzer ${userId} wurde auf ${newPrefix} gesetzt.` });
});

// Route zum Abrufen des Prefixes
app.get('/api/getprefix', (req, res) => {
  const userId = req.query.userId;
  if (userPrefix[userId]) {
    return res.json({ prefix: userPrefix[userId] });
  }
  res.json({ prefix: '!' }); // Standard-Prefix, wenn keiner gesetzt wurde
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
