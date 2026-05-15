# 🚀 Apex Studios - Complete Setup & Deployment Guide

Your full-stack portfolio website is ready! This guide walks you through setup, running locally, and deployment.

## 📦 What You Have

Two repositories fully configured and ready:

1. **apex-backend** - Node.js/Express API server
2. **apex-frontend** - Modern responsive website

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Clone Both Repositories

```bash
git clone https://github.com/Niroj0/apex-backend.git
git clone https://github.com/Niroj0/apex-frontend.git
```

### Step 2: Setup Backend

```bash
cd apex-backend
npm install
```

Create `.env` file in apex-backend root:
```
PORT=5000
NODE_ENV=development
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### Step 3: Start Backend

```bash
npm run dev
```

You should see:
```
🚀 Apex Backend running on http://localhost:5000
📊 View submissions: http://localhost:5000/api/submissions
```

### Step 4: Open Frontend

Navigate to `apex-frontend/` and open `index.html` in your browser:

**Option A**: Double-click `index.html`
**Option B**: Use Live Server (VS Code Extension)
**Option C**: Start a local server:
```bash
cd apex-frontend
python -m http.server 8000
# Visit http://localhost:8000
```

✅ Done! Your site is live locally.

---

## 📧 Email Setup (IMPORTANT)

For contact form emails to work, you need a Gmail App Password:

### Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go back to Security → **App passwords**
4. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
5. Google generates a **16-character password**
6. Copy and paste into `.env` as `EMAIL_PASSWORD`

Example:
```
EMAIL_USER=niroj@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

---

## 🌍 Deployment Options

### Option 1: Deploy Frontend to GitHub Pages (FREE)

```bash
cd apex-frontend
git add .
git commit -m "Ready for deployment"
git push origin main
```

Then go to GitHub:
1. Repository → Settings → Pages
2. Select **Deploy from a branch**
3. Choose **main** branch
4. Save

Your site will be live at: `https://Niroj0.github.io/apex-frontend`

### Option 2: Deploy Backend to Render (FREE Tier)

**Backend Requirements:**
- GitHub account (already have it)
- Render account (free at render.com)

**Steps:**

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New** → **Web Service**
3. Connect your `apex-backend` repository
4. Configure:
   - **Name**: apex-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `PORT`: 5000
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASSWORD`: your-app-password
   - `ADMIN_EMAIL`: your-email@gmail.com
6. Deploy!

Your backend will be live at: `https://apex-backend.onrender.com`

### Option 3: Deploy Frontend to Netlify (FREE)

```bash
# Install Netlify CLI
npm install -g netlify-cli

cd apex-frontend

# Deploy
netlify deploy --prod
```

Your site will be live at: `https://your-site-name.netlify.app`

### Option 4: Deploy Both to Vercel (FREE)

```bash
npm install -g vercel

# Deploy backend
cd apex-backend
vercel --prod

# Deploy frontend
cd ../apex-frontend
vercel --prod
```

---

## 🔧 Update API URL for Production

After deploying backend, update the frontend to use your production URL:

In `apex-frontend/js/form-handler.js`, change:
```javascript
const API_URL = 'http://localhost:5000/api/submit-contact';
```

To your production backend URL:
```javascript
const API_URL = 'https://apex-backend.onrender.com/api/submit-contact';
```

Then commit and push:
```bash
git add js/form-handler.js
git commit -m "Update API URL to production"
git push origin main
```

---

## 📊 Monitor Submissions

### View All Submissions

**Local**: `http://localhost:5000/api/submissions`
**Production**: `https://apex-backend.onrender.com/api/submissions`

You'll see JSON with all form submissions and their details.

---

## 🎨 Customize Your Site

### Change Colors
Edit `index.html` and find Tailwind classes:
- Red: `text-red-600`, `bg-red-600`
- Dark: `bg-[#0a0a0a]`, `bg-[#121212]`

### Update Services
Edit service descriptions and pricing in the Services and Pricing sections of `index.html`

### Add Your Portfolio Images
Replace placeholder images with your own work:
```html
<img src="your-image-url.jpg" alt="description">
```

### Change Contact Form Fields
Modify form fields in the Contact section of `index.html` and update `js/form-handler.js` accordingly

---

## 🔐 Security Tips

1. **Never commit `.env`** - it's in `.gitignore` for a reason
2. **Use environment variables** for all sensitive data
3. **Enable 2FA** on your GitHub account
4. **Keep email passwords safe** - use Google App Passwords, not your actual password
5. **Monitor submissions** regularly at the API endpoint

---

## 🐛 Troubleshooting

### Form Not Submitting?
- Backend running on port 5000? Check terminal
- Check browser console (F12 → Console) for errors
- Make sure `.env` is configured correctly
- CORS enabled in backend? Check `server.js`

### Email Not Sending?
- Gmail App Password correct? (16 characters, spaces included)
- 2FA enabled on Gmail account?
- Admin email correct in `.env`?
- Check spam folder

### Deployment Issues?
- Make sure `.env` is in `.gitignore`
- Add all env variables to deployment platform
- Check deployment logs for errors
- Make sure ports are correct (5000 for backend)

### CORS Errors?
- Frontend and backend on same/different domains?
- Update CORS whitelist in `server.js` if needed
- Add `http://localhost:3000` or your domain

---

## 📱 Mobile Optimized

Both sites are fully responsive:
- Mobile: Works perfectly on phones
- Tablet: Optimized for tablets
- Desktop: Beautiful on large screens

Test by resizing your browser or viewing on your phone!

---

## 📈 Next Steps

1. ✅ Set up locally and test
2. ✅ Get Gmail App Password
3. ✅ Deploy backend to Render
4. ✅ Deploy frontend to GitHub Pages/Netlify
5. ✅ Update API URL in frontend
6. ✅ Test form submission end-to-end
7. ✅ Monitor submissions at API endpoint

---

## 💡 Pro Tips

- Use **VS Code Live Server** for faster frontend development
- Use **Postman** to test API endpoints
- Check browser DevTools (F12) for network errors
- Test form on mobile devices before launching
- Set up email templates for better branding

---

## 📞 Support Resources

- **Node.js**: https://nodejs.org/
- **Express**: https://expressjs.com/
- **Render Docs**: https://render.com/docs
- **GitHub Pages**: https://pages.github.com/
- **Netlify**: https://www.netlify.com/

---

## 🎉 You're All Set!

Your professional Apex Studios portfolio is ready to impress clients. Deploy with confidence and start showcasing your amazing work!

Made with ❤️ for Apex Studios
