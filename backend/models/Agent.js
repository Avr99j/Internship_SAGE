const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: String,
  date: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String
});

const agentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  subdomain: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  comments: { type: Number, default: 0 },
  trial: { type: Boolean, default: false },
  trialUrl: { type: String, default: null },
  reviewsList: [reviewSchema]
}, {
  timestamps: true,
  collection: 'agents' // Specify the collection name
});

// Create index for search functionality
agentSchema.index({ title: 'text', description: 'text', domain: 'text' });

module.exports = mongoose.model('Agent', agentSchema); 