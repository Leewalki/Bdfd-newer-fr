module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { userId, prefix } = req.body;

        if (!userId || !prefix) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        // In einer echten Anwendung würdest du hier eine Datenbank verwenden.
        // Für dieses Beispiel speichern wir es einfach in einem Objekt.
        let prefixes = {};
        prefixes[userId] = prefix;

        return res.status(200).json({
            status: '200',
            message: 'Prefix erfolgreich gesetzt',
            userId: userId,
            prefix: prefix
        });
    }

    res.status(405).json({ message: 'Methode nicht erlaubt' });
};
