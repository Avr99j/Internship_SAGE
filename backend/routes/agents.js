const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

// GET /api/agents - Get all agents
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/agents/:id - Get a specific agent by ID
router.get('/:id', async (req, res) => {
  try {
    const agent = await Agent.findOne({ id: req.params.id });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/agents/:id/reviews - Add a review to an agent
router.post('/:id/reviews', async (req, res) => {
  try {
    const { author, rating, comment } = req.body;
    const agentId = req.params.id;

    if (!author || !rating || !comment) {
      return res.status(400).json({ message: 'Author, rating, and comment are required' });
    }

    const agent = await Agent.findOne({ id: agentId });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const newReview = {
      author,
      date: new Date().toISOString().split('T')[0],
      rating: parseInt(rating),
      comment
    };

    agent.reviewsList.push(newReview);
    agent.comments = agent.reviewsList.length;

    const totalRating = agent.reviewsList.reduce((sum, review) => sum + review.rating, 0);
    agent.rating = totalRating / agent.reviewsList.length;

    await agent.save();
    res.json({ message: 'Review added successfully', agent });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 