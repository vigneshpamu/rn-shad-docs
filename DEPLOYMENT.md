# Deploying RN Shad UI Documentation to Vercel

## Prerequisites

- GitHub account with your code pushed
- Vercel account (free)

## Deployment Steps

### 1. Push Code to GitHub

First, commit all your changes:

```bash
git add apps/docs
git commit -m "Add comprehensive documentation for all 36 components"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to docs directory
cd apps/docs

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **rn-shad-docs** (or your preferred name)
- In which directory is your code located? **.**
- Want to override settings? **N**

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project settings:
   - **Project Name**: rn-shad-docs
   - **Root Directory**: `apps/docs`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Node Version**: 18.x or higher
5. Click **"Deploy"**

### 3. Configure Custom Domain (Optional)

After deployment:
1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain (e.g., `docs.rnshad.com`)
4. Follow Vercel's instructions to configure DNS

## Build Configuration

The build is configured in `vercel.json` at the root:

```json
{
  "buildCommand": "cd apps/docs && npm run build",
  "outputDirectory": "apps/docs/.next",
  "installCommand": "cd apps/docs && npm install",
  "framework": null,
  "devCommand": "cd apps/docs && npm run dev"
}
```

## Troubleshooting

### Build Fails

1. **Check TypeScript version**: Should be 5.3+
2. **Check Node version**: Should be 18+
3. **Clear cache**: In Vercel dashboard, go to Deployments → ⋯ → Redeploy → Clear cache

### Environment Variables

No environment variables are needed for this documentation site.

## Post-Deployment

After successful deployment:
1. ✅ Visit your deployed URL (e.g., `https://rn-shad-docs.vercel.app`)
2. ✅ Verify all 36 component pages load correctly
3. ✅ Test navigation and search functionality
4. ✅ Update GitHub repository links in `theme.config.tsx` if needed

## Continuous Deployment

Vercel automatically:
- Deploys every push to `main` branch
- Creates preview deployments for pull requests
- Provides deployment URLs for testing

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Nextra Documentation](https://nextra.site)
