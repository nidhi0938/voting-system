const Log = require('../models/log');

// Example function to log an error
async function logError(req, res) {
    const { message, filename, lineNumber, columnNumber, error } = req.body;

    const log = new Log({
        level: 'error',
        message: message,
        source: filename,
        lineNumber: lineNumber,
        columnNumber: columnNumber,
        error: error
    });

    try {
        await log.save();
        res.status(200).send('Error logged successfully.');
    } catch (err) {
        res.status(500).send('Error logging the error!');
    }
}

// Usage:
module.exports = {
    logError,
};
