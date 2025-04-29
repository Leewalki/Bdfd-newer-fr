const fs = require('fs');
const path = require('path');

// Pfad zur Datei, in der wir die Prefixes speichern
const prefixFilePath = path.join(__dirname, 'prefixes.json');

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { userId, prefix } = req.body;

        if (!userId || !prefix) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        // Prefixes aus der Datei laden
        fs.readFile(prefixFilePath, 'utf8', (err, data) => {
            if (err) {
                // Falls die Datei nicht existiert, initialisieren wir ein leeres Objekt
                if (err.code === 'ENOENT') {
                    data = '{}';
                } else {
                    return res.status(500).json({ message: 'Fehler beim Lesen der Datei' });
                }
            }

            // Prefixes in ein Objekt parsen
            let prefixes = JSON.parse(data);

            // Prefix für den Benutzer setzen
            prefixes[userId] = prefix;

            // Prefixes zurück in die Datei schreiben
           fs.writeFile(prefixFilePath, JSON.stringify(prefixes, null, 2), (writeErr) => {
    if (writeErr) {
        console.error('Fehler beim Schreiben der Datei:', writeErr.message);
        return res.status(500).json({ 
            message: 'Fehler beim Speichern des Prefixes', 
            error: writeErr.message 
        });
    }

                // Erfolgsmeldung zurückgeben
                return res.status(200).json({
                    status: '200',
                    message: 'Prefix erfolgreich gesetzt',
                    userId: userId,
                    prefix: prefix
                });
            });
        });
    } else {
        res.status(405).json({ message: 'Methode nicht erlaubt' });
    }
};
