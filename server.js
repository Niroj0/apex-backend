const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./database');
const submitContactForm = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'file://'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Database
db.initialize();

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running! ✅', timestamp: new Date() });
});

// Routes
app.post('/api/submit-contact', submitContactForm);

// Get all submissions (Admin)
app.get('/api/submissions', (req, res) => {
  db.getAllSubmissions((err, submissions) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
    res.json({ success: true, data: submissions });
  });
});

// Get submission by ID
app.get('/api/submissions/:id', (req, res) => {
  db.getSubmissionById(req.params.id, (err, submission) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch submission' });
    }
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ success: true, data: submission });
  });
});

// Mark submission as contacted
app.put('/api/submissions/:id/contacted', (req, res) => {
  db.markAsContacted(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update submission' });
    }
    res.json({ success: true, message: 'Marked as contacted' });
  });
});

// Delete submission
app.delete('/api/submissions/:id', (req, res) => {
  db.deleteSubmission(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete submission' });
    }
    res.json({ success: true, message: 'Submission deleted' });
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Apex Backend running on http://localhost:${PORT}`);
  console.log(`📊 View submissions: http://localhost:${PORT}/api/submissions\n`);
});
