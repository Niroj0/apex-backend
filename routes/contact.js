const db = require('../database');
const { sendEmail } = require('../config/email');

const submitContactForm = (req, res) => {
  const { name, email, service, budget, timeline, company, phone, vision } = req.body;

  // Validation
  if (!name || !email || !service || !vision) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, service, vision'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  // Store in database
  db.addSubmission(
    { name, email, service, budget, timeline, company, phone, vision },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Failed to save submission'
        });
      }

      // Send email notification to admin
      const adminEmail = process.env.ADMIN_EMAIL || 'your-email@gmail.com';
      const emailContent = `
        New Contact Form Submission from Apex Studios

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}
        Service: ${service}
        Budget: ${budget || 'Not specified'}
        Timeline: ${timeline || 'Not specified'}

        Project Vision:
        ${vision}

        Submission ID: ${result.id}
        Time: ${new Date().toLocaleString()}

        View all submissions: http://localhost:5000/api/submissions
      `;

      sendEmail(adminEmail, `New Apex Studios Contact: ${name}`, emailContent);

      // Send confirmation email to customer
      const confirmationEmail = `
        Thank you for reaching out to Apex Studios!

        We've received your project inquiry and will review your vision shortly.
        Our team will be in touch within 24 hours to discuss your project.

        Service Selected: ${service}
        Reference ID: ${result.id}

        Best regards,
        Apex Studios Team
      `;

      sendEmail(email, 'Apex Studios - Project Inquiry Received ✅', confirmationEmail);

      res.json({
        success: true,
        message: 'Thank you! Your submission has been received. We\'ll be in touch within 24 hours.',
        submissionId: result.id
      });
    }
  );
};

module.exports = submitContactForm;
