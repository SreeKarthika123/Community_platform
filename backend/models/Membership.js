const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' ,  required: true,},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  role: { type: String, enum: ['Community Admin', 'Community Member'], default: 'Community Member' },
});

module.exports = mongoose.model('Membership', membershipSchema);
