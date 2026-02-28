# ReviewFlow AI — Deployment Automation
# This script handles the execution policy and triggers the Vercel deployment.

Write-Host "🚀 Initializing ReviewFlow AI Deployment..." -ForegroundColor Indigo

# 1. Ensure Vercel CLI is present
if (!(Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js/npm not found. Please install Node.js first." -ForegroundColor Red
    exit
}

# 2. Add Environment variables to Vercel (if logged in)
Write-Host "📡 Syncing Gemini API Key to Vercel..." -ForegroundColor Cyan
npx.cmd vercel env add NEXT_PUBLIC_GEMINI_API_KEY production AIzaSyD1Kl4eLXhRcBOISpWz010CMNNxhueeVek

# 3. Trigger Production Deployment
Write-Host "📦 Triggering Production Build..." -ForegroundColor Cyan
npx.cmd vercel --prod --yes

Write-Host "✅ Deployment Process Started!" -ForegroundColor Green
Write-Host "If you weren't logged in, please follow the browser prompt that just opened." -ForegroundColor Yellow
