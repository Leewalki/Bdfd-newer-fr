const express = require('express');
const setPrefixHandler = require('./setprefix');
const getPrefixHandler = require('./getprefix');
const app = express();

// Middleware zur Verarbeitung von JSON-Anfragen
app.use(express.json());

// Routen für das Setzen und Abrufen des Prefixes
app.post('/api/setprefix', setPrefixHandler);
app.get('/api/getprefix', getPrefixHandler);

module.exports = app;
