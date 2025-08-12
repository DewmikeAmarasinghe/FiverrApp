# Netlify Deployment Guide

## Steps to Deploy Frontend to Netlify:

### 1. Build the Frontend Locally
```bash
cd Frontend
npm install
npm run build
```

### 2. Deploy to Netlify

**Option A: Drag & Drop (Quick)**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Drag the `Frontend/build/client` folder to Netlify's deploy area
4. Your site will be live instantly!

**Option B: Connect GitHub Repository**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   - **Build command**: `cd Frontend && npm install && npm run build`
   - **Publish directory**: `Frontend/build/client`
   - **Base directory**: `Frontend`

### 3. Environment Variables
Add this environment variable in Netlify:
- **Key**: `VITE_API_BASE_URL`
- **Value**: `https://web-production-d1f6f.up.railway.app/api/`

### 4. Custom Domain (Optional)
- Go to Site settings > Domain management
- Add your custom domain

## Benefits of This Setup:
- ✅ Frontend: Fast static hosting on Netlify
- ✅ Backend: API server on Railway
- ✅ Better performance and reliability
- ✅ Automatic deployments from Git
- ✅ Free SSL certificates

## API Configuration
The frontend will automatically connect to your Railway backend at:
`https://web-production-d1f6f.up.railway.app/api/`
