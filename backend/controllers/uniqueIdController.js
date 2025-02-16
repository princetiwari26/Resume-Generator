const { customAlphabet } = require('nanoid')

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const generateId = (req, res) => {
    const uniqueId = nanoid();
    res.json({ uniqueId});
}

module.exports = generateId;