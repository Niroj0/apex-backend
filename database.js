const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'submissions.db');
const db = new sqlite3.Database(dbPath);

const database = {
  initialize: function() {
    db.run(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        service TEXT NOT NULL,
        budget TEXT,
        timeline TEXT,
        company TEXT,
        phone TEXT,
        vision TEXT NOT NULL,
        contacted INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Database initialization failed:', err);
      } else {
        console.log('✅ Database initialized successfully');
      }
    });
  },

  addSubmission: function(data, callback) {
    const { name, email, service, budget, timeline, company, phone, vision } = data;
    
    db.run(
      `INSERT INTO submissions (name, email, service, budget, timeline, company, phone, vision) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, service, budget, timeline, company, phone, vision],
      function(err) {
        if (err) {
          console.error('❌ Error adding submission:', err);
          callback(err);
        } else {
          console.log(`✅ New submission added (ID: ${this.lastID})`);
          callback(null, { id: this.lastID });
        }
      }
    );
  },

  getAllSubmissions: function(callback) {
    db.all(
      `SELECT * FROM submissions ORDER BY created_at DESC`,
      (err, rows) => {
        if (err) {
          console.error('❌ Error fetching submissions:', err);
          callback(err);
        } else {
          callback(null, rows || []);
        }
      }
    );
  },

  getSubmissionById: function(id, callback) {
    db.get(
      `SELECT * FROM submissions WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) {
          callback(err);
        } else {
          callback(null, row);
        }
      }
    );
  },

  markAsContacted: function(id, callback) {
    db.run(
      `UPDATE submissions SET contacted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id],
      (err) => {
        if (err) {
          console.error('❌ Error updating submission:', err);
          callback(err);
        } else {
          console.log(`✅ Submission ${id} marked as contacted`);
          callback(null);
        }
      }
    );
  },

  deleteSubmission: function(id, callback) {
    db.run(
      `DELETE FROM submissions WHERE id = ?`,
      [id],
      (err) => {
        if (err) {
          console.error('❌ Error deleting submission:', err);
          callback(err);
        } else {
          console.log(`✅ Submission ${id} deleted`);
          callback(null);
        }
      }
    );
  },

  close: function() {
    db.close();
  }
};

module.exports = database;
