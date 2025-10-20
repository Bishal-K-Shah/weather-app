# Quick GitHub Setup Guide

## Step-by-step instructions to deploy your Weather Dashboard

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `weather-dashboard`
3. Description: "Beautiful weather dashboard with React, Vite, and Chart.js"
4. Choose Public or Private
5. DO NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Update Configuration
Open `vite.config.js` and update the base path:
- If your repo is `https://github.com/username/weather-dashboard`
- Then base should be: `/weather-dashboard/`
- It's already set correctly!

### 3. Initialize Git and Push

Run these commands in PowerShell (from the project directory):

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Beautiful Weather Dashboard with React + Vite"

# Rename branch to main
git branch -M main

# Add your GitHub repository as remote (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Click on "Pages" in the left sidebar
4. Under "Source", select **"GitHub Actions"**
5. Save the changes

### 5. Wait for Deployment

- The GitHub Actions workflow will automatically start
- Go to the "Actions" tab to see the deployment progress
- Once complete (usually 2-3 minutes), your site will be live!
- Access it at: `https://YOUR_USERNAME.github.io/weather-dashboard/`

### 6. Future Updates

Every time you push to the main branch, GitHub Actions will automatically rebuild and deploy your site:

```powershell
git add .
git commit -m "Your update message"
git push
```

---

## Troubleshooting

**Issue**: API key not working in production
- Solution: The `.env` file is not deployed. You need to add the API key directly in the code for production, or use GitHub Secrets.

**Issue**: Blank page after deployment
- Solution: Check that the `base` path in `vite.config.js` matches your repository name

**Issue**: 404 errors
- Solution: Make sure GitHub Pages is set to use "GitHub Actions" as the source

---

## Environment Variables for Production

For production deployment, you have two options:

### Option 1: Hardcode the API key (simple, but less secure for public repos)
In `src/App.jsx`, replace:
```javascript
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```
with:
```javascript
const API_KEY = '93279420fac1866de9d3ccecd3d664f1';
```

### Option 2: Use GitHub Secrets (recommended for public repos)
1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `VITE_OPENWEATHER_API_KEY`
4. Value: `93279420fac1866de9d3ccecd3d664f1`
5. Update `.github/workflows/deploy.yml` to include:
   ```yaml
   env:
     VITE_OPENWEATHER_API_KEY: ${{ secrets.VITE_OPENWEATHER_API_KEY }}
   ```

---

Enjoy your deployed Weather Dashboard! 🌤️
