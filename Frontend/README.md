# Fiverr Frontend

## Netlify Deployment

### Steps to Deploy:

1. **Connect to GitHub:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository

2. **Configure Build Settings:**
   - **Base directory:** `Frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `build/client`

3. **Environment Variables:**
   Add these in Netlify dashboard → Site settings → Environment variables:
   ```
   VITE_API_BASE_URL=https://your-railway-backend-url.up.railway.app/api/
   ```

4. **Deploy!**

### Local Development:
```bash
cd Frontend
npm install
npm run dev
```

### Build for Production:
```bash
cd Frontend
npm install
npm run build
```
