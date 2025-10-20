# 🚀 Push to GitHub - Commands Ready to Copy

## You're almost there! Just follow these steps:

### Step 1: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `weather-dashboard` (or your preferred name)
3. Make it Public or Private
4. **DO NOT** add README, .gitignore, or license
5. Click "Create repository"

---

### Step 2: Connect and Push

After creating the repo, GitHub will show you a URL like:
`https://github.com/YOUR_USERNAME/weather-dashboard.git`

**Copy that URL and run this command** (replace YOUR_GITHUB_URL with the actual URL):

```powershell
git remote add origin YOUR_GITHUB_URL
```

**Example:**
```powershell
git remote add origin https://github.com/johndoe/weather-dashboard.git
```

Then push to GitHub:
```powershell
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source", select **GitHub Actions**
5. That's it! The deployment will start automatically

---

### Step 4: Check Deployment

1. Go to the **Actions** tab in your repository
2. You'll see a workflow running called "Deploy to GitHub Pages"
3. Wait 2-3 minutes for it to complete
4. Your site will be live at: `https://YOUR_USERNAME.github.io/weather-dashboard/`

---

## ✅ Current Status

✓ Git repository initialized
✓ All files committed
✓ GitHub Actions workflow configured
✓ Vite config updated for GitHub Pages
✓ Ready to push!

---

## 🔑 Important Note About API Key

The `.env` file is NOT uploaded to GitHub (it's in `.gitignore` for security).

For the deployed site to work, you need to either:

### Option A: Update the code (Simple)
Edit `src/App.jsx` line 8 to hardcode the API key:
```javascript
const API_KEY = '93279420fac1866de9d3ccecd3d664f1';
```

### Option B: Use GitHub Secrets (More secure)
1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `VITE_OPENWEATHER_API_KEY`
4. Value: `93279420fac1866de9d3ccecd3d664f1`
5. Update `.github/workflows/deploy.yml` line 31 to add:
```yaml
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          VITE_OPENWEATHER_API_KEY: ${{ secrets.VITE_OPENWEATHER_API_KEY }}
```

---

## 🎉 That's It!

Once pushed, GitHub will automatically:
- Install dependencies
- Build your React app
- Deploy to GitHub Pages
- Make it live on the internet!

Need help? Check DEPLOYMENT.md for detailed troubleshooting.
