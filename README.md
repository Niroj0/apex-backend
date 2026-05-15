# Apex Studios Backend API

Complete backend for Apex Studios portfolio website contact form and submission management.

## 🚀 Features

- ✅ Contact form submission handling
- ✅ SQLite database for storing submissions
- ✅ Email notifications (admin + customer confirmation)
- ✅ Admin API to view/manage submissions
- ✅ CORS enabled for frontend communication
- ✅ Input validation and error handling

## 📋 Installation

### 1. Clone Repository
```bash
git clone https://github.com/Niroj0/apex-backend.git
cd apex-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=your-email@gmail.com
```

### 4. Gmail Setup (For Email Notifications)

1. Go to [Google Account](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Security → App Passwords → Select "Mail" and "Windows Computer"
   - Copy the 16-character password
   - Paste in `.env` as `EMAIL_PASSWORD`

## 🏃 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on: `http://localhost:5000`

## 📊 API Endpoints

### Submit Contact Form
**POST** `/api/submit-contact`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "The Kinetic Brand",
  "budget": "$3000-$5000",
  "timeline": "1-2 weeks",
  "company": "My Company",
  "phone": "+1234567890",
  "vision": "We need a cinematic brand video..."
}
```

Response:
```json
{
  "success": true,
  "message": "Thank you! Your submission has been received...",
  "submissionId": 1
}
```

### Get All Submissions
**GET** `/api/submissions`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "service": "The Kinetic Brand",
      "contacted": 0,
      "created_at": "2026-05-15T10:30:00Z"
    }
  ]
}
```

### Get Single Submission
**GET** `/api/submissions/:id`

### Mark as Contacted
**PUT** `/api/submissions/:id/contacted`

### Delete Submission
**DELETE** `/api/submissions/:id`

### Health Check
**GET** `/health`

## 📁 Project Structure

```
apex-backend/
├── server.js              # Main Express server
├── database.js            # SQLite configuration
├── routes/
│   └── contact.js         # Contact form route
├── config/
│   └── email.js           # Email service
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
└── README.md              # This file
```

## 🔌 Frontend Integration

Your frontend HTML file should send data to:

```javascript
fetch('http://localhost:5000/api/submit-contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    service: formData.service,
    budget: formData.budget,
    timeline: formData.timeline,
    company: formData.company,
    phone: formData.phone,
    vision: formData.vision
  })
})
```

## 🚢 Deployment

### Heroku Deployment
```bash
heroku create apex-backend
git push heroku main
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set ADMIN_EMAIL=your-email@gmail.com
```

### Render Deployment
1. Connect GitHub repo
2. Set environment variables in Render dashboard
3. Deploy

## ⚙️ Troubleshooting

**Issue**: Emails not sending
- Check `.env` has correct EMAIL_USER and EMAIL_PASSWORD
- Verify Gmail App Password (16 characters)
- Check ADMIN_EMAIL is correct

**Issue**: Database errors
- Delete `submissions.db` and restart server
- Server will auto-create new database

**Issue**: CORS errors
- Frontend URL must be in cors whitelist in `server.js`
- Add your domain if deploying

## 📞 Support

For questions or issues, reach out to Apex Studios.

---

Made with ❤️ by Apex Studios Team
