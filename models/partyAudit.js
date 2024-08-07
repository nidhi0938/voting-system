const mongoose = require('mongoose');

const partyAuditSchema = new mongoose.Schema({
    partyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldData: { type: Object },
    newData: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PartyAudit', partyAuditSchema);
