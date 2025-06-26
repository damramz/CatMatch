# GitHub Pages Setup for CatMatch

This guide will help you deploy the CatMatch app as a static site on GitHub Pages.

## Quick Setup Steps

### 1. Prepare Your Repository
```bash
# Create a new repository on GitHub
# Clone it locally or push your existing code

git clone https://github.com/yourusername/catmatch.git
cd catmatch
```

### 2. Add Static Build Script
Add this line to your `package.json` scripts section:
```json
"build:static": "vite build --config vite.config.static.ts"
```

### 3. Build for Static Deployment
```bash
npm run build:static
```

This creates a `dist-static` folder with all the files needed for GitHub Pages.

### 4. Deploy to GitHub Pages

**Option A: Using GitHub Actions (Recommended)**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Build static site
      run: npm run build:static

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist-static
```

**Option B: Manual Deploy**
1. Build the static files: `npm run build:static`
2. Push the `dist-static` folder contents to a `gh-pages` branch
3. Enable GitHub Pages in your repository settings

### 5. Enable GitHub Pages
1. Go to your GitHub repository
2. Click Settings → Pages
3. Choose "Deploy from a branch"
4. Select `gh-pages` branch and `/ (root)` folder
5. Click Save

## What This Setup Does

- **Removes Backend Dependency**: The app now fetches cats directly from the CATAAS API
- **Static Build**: Creates a pure HTML/CSS/JS bundle that works on GitHub Pages
- **CORS Handling**: Uses direct API calls instead of server proxy
- **Responsive Design**: Maintains all mobile functionality

## Important Notes

- **No Data Persistence**: Since there's no backend, liked cats won't be saved between sessions
- **CORS Limitations**: Some features may be limited by browser CORS policies
- **API Rate Limits**: Direct calls to CATAAS API may have rate limiting

## Testing Locally

Before deploying, test the static build:
```bash
npm run build:static
cd dist-static
python -m http.server 8000
# Or use any static file server
```

Open `http://localhost:8000` to test the static version.

## Your GitHub Pages URL

After deployment, your app will be available at:
```
https://yourusername.github.io/repository-name
```

## Troubleshooting

- **404 Error**: Make sure GitHub Pages is pointing to the correct branch
- **Images Not Loading**: Check CORS issues with the CATAAS API
- **Build Fails**: Ensure all dependencies are properly installed

The static version maintains all the core functionality including swipe gestures, animations, and mobile optimization!