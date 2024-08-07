const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    message: { type: String },
    filename: { type: String },
    lineNumber: { type: Number },
    columnNumber: { type: Number },
    error: { type: String }
});

module.exports = mongoose.model('Log', logSchema);


module.exports = mongoose.model('Log', logSchema);
