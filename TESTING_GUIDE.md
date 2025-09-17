# Testing Guide for Zero Barriers Growth Accelerator

## 🚀 Quick Start Testing

### 1. Start the Application
```bash
npm run dev
```
Visit: http://localhost:3000

### 2. Test Authentication (Currently Demo Mode)
- **Login**: Any email/password will work (demo mode)
- **Admin Access**: Use `shayne@devpipeline.com` / `admin123`
- **Demo User**: Automatically logged in as demo user

### 3. Test AI Analysis
- Go to: http://localhost:3000/dashboard/analyze
- Try analyzing: `https://apple.com` or `https://google.com`
- Select different AI providers (currently all show as "Not Configured")

## 🔧 Current Status

### ✅ Working Features
- **Static Site Generation**: ✅ Working
- **Authentication**: ✅ Demo mode working
- **AI Provider Selection**: ✅ UI working
- **Demo Analysis**: ✅ Fallback working
- **Responsive Design**: ✅ Working
- **Lighthouse Compliance**: ✅ Passing

### ⚠️ Needs Configuration
- **Real AI Analysis**: Requires API keys
- **Database**: Currently using demo mode
- **Real Authentication**: Currently using demo mode

## 🧪 Testing Scenarios

### Scenario 1: Demo Analysis (No API Keys)
1. Visit http://localhost:3000/dashboard/analyze
2. Enter URL: `https://apple.com`
3. Click "Analyze"
4. **Expected**: Demo analysis with realistic data
5. **Result**: Should work immediately

### Scenario 2: Real AI Analysis (With API Keys)
1. Set up API keys (see setup instructions below)
2. Restart the server: `npm run dev`
3. Visit analysis page
4. Select an AI provider (should show as "Available")
5. Analyze a website
6. **Expected**: Real AI analysis

### Scenario 3: Authentication Flow
1. Visit http://localhost:3000
2. Click "Sign In"
3. Enter any email/password
4. **Expected**: Redirected to dashboard
5. **Note**: Currently in demo mode

## 🔑 Setting Up Real AI Analysis

### Option 1: Quick Setup Script
```bash
npm run setup:ai-keys
```

### Option 2: Manual Setup
Create `.env.local`:
```bash
# OpenAI (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your-key-here

# Google Gemini (Get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your-gemini-key-here

# Anthropic Claude (Get from https://console.anthropic.com/)
CLAUDE_API_KEY=sk-ant-your-key-here
```

### Option 3: Test with One Provider
Start with just OpenAI:
```bash
echo "OPENAI_API_KEY=sk-your-key-here" > .env.local
npm run dev
```

## 🐛 Common Issues & Solutions

### Issue 1: "No AI providers configured"
**Solution**: Set up API keys as shown above

### Issue 2: Analysis fails with error
**Solution**: Check browser console for detailed error messages

### Issue 3: Authentication not working
**Solution**: Currently in demo mode - any credentials work

### Issue 4: Build fails
**Solution**: 
```bash
npm run lint
npm run type-check
npm run build
```

## 📊 Expected Analysis Output

When working correctly, you should see:
- **Golden Circle Analysis**: Why, How, What scores
- **Elements of Value**: Functional, Emotional, Life-changing, Social Impact
- **CliftonStrengths**: Theme scores and recommendations
- **Overall Score**: 0-100
- **Recommendations**: Actionable next steps

## 🎯 Next Steps for Production

1. **Set up real API keys** for AI analysis
2. **Configure database** for user management
3. **Set up real authentication** (currently demo mode)
4. **Deploy to GitHub Pages** for public access
5. **Monitor usage and costs** of AI providers

## 🚀 Deployment Testing

### Test Static Build
```bash
npm run build:static
npm start
```

### Test GitHub Pages Deployment
```bash
git add .
git commit -m "feat: Add AI integration"
git push origin main
```

Visit: https://shayneismagic.github.io/zero-barriers-growth-accelerator

## 📱 Mobile Testing

Test on different devices:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tablet

## 🔍 Debugging Tips

### Check Browser Console
- Open DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed requests

### Check Server Logs
- Look at terminal where `npm run dev` is running
- Check for error messages

### Test API Endpoints Directly
```bash
# Test auth
curl http://localhost:3000/api/auth/me

# Test AI providers
curl http://localhost:3000/api/analyze/website/enhanced

# Test analysis
curl -X POST http://localhost:3000/api/analyze/website/enhanced \
  -H "Content-Type: application/json" \
  -d '{"url":"https://apple.com","provider":"openai"}'
```
