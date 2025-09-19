# Cloudflare Pages API Keys Setup

## Setting API Keys in Cloudflare Pages Dashboard

1. **Go to Cloudflare Pages Dashboard**
   - Navigate to your project: `zero-barriers-growth-accelerator`
   - Click on "Settings" tab
   - Click on "Environment Variables"

2. **Add Environment Variables**
   Add these three environment variables:

   ```
   OPENAI_API_KEY = your-openai-key-here
   GEMINI_API_KEY = your-gemini-key-here
   CLAUDE_API_KEY = your-claude-key-here
   ```

3. **Deploy**
   - After adding the variables, trigger a new deployment
   - The app will automatically use these keys in production

## Security Notes

- ✅ API keys are encrypted and secure in Cloudflare
- ✅ Keys are not visible in the code or git repository
- ✅ Keys are only accessible to your Cloudflare account
- ✅ You can rotate keys anytime without code changes

## Testing

After setting up the keys:
1. Deploy to Cloudflare Pages
2. Test the analysis with a real website
3. The app will use sophisticated AI prompts instead of basic content analysis

## Fallback Behavior

- If no API keys are configured, the app uses content-based analysis
- If some API keys fail, the app falls back to available providers
- The system is designed to be resilient and always provide analysis
