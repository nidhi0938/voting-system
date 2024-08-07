const mongoose = require('mongoose');

const userDetailsAuditSchema = new mongoose.Schema({
    userDetailsId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldData: { type: Object },
    newData: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserDetailsAudit', userDetailsAuditSchema);
