// Temporäre Speicherung im Speicher (RAM)
let userPrefixes = {};

module.exports = (req, res) => {
    if (req.method === 'GET') {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'Benutzer-ID erforderlich' });
        }

        const prefix = userPrefixes[userId] || '!';
        return res.status(200).json({ prefix });
    } else {
        res.status(405).json({ message: 'Methode nicht erlaubt' });
    }
};
