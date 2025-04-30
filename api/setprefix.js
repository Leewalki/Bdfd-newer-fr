// Temporäre Speicherung im Speicher (RAM)
let userPrefixes = {};

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { userId, prefix } = req.body;

        if (!userId || !prefix) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        // Prefix im Speicher speichern
        userPrefixes[userId] = prefix;

        return res.status(200).json({
            status: '200',
            message: 'Prefix erfolgreich gesetzt',
            userId: userId,
            prefix: prefix,
        });
    } else {
        res.status(405).json({ message: 'Methode nicht erlaubt' });
    }
};
