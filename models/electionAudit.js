const mongoose = require('mongoose');

const electionAuditSchema = new mongoose.Schema({
    electionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldData: { type: Object },
    newData: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ElectionAudit', electionAuditSchema);
