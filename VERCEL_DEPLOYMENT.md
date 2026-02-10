# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Backend API deployed and accessible

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your MoveRequest repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Environment Variables

Add the following environment variable in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com/api
```

**Important**: Replace `your-backend-api-url.com` with your actual backend URL

### Step 4: Deploy

Click "Deploy" and wait for the build to complete (usually 2-3 minutes)

## 🔧 Post-Deployment Configuration

### Update Backend CORS

Make sure your backend allows requests from your Vercel domain:

```typescript
// backend/src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true,
});
```

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 📊 Deployment URLs

After deployment, you'll get:
- **Production**: `https://your-app.vercel.app`
- **Preview**: Automatic preview URLs for each PR
- **Development**: Local development at `http://localhost:3000`

## 🔄 Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request
- **Development**: Local with `npm run dev`

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend CORS configuration
- Ensure backend is accessible from Vercel

### Environment Variables Not Working
- Environment variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Redeploy after adding/changing environment variables

## 📈 Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Serverless functions

## 🔒 Security

- All connections use HTTPS
- Environment variables are encrypted
- Automatic DDoS protection
- Rate limiting included

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create an issue in your repository

---

**Ready to deploy!** 🎉