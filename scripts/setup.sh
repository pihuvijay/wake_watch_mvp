#!/bin/bash

# WakeWatch Expo App Setup Script
# This script sets up the development environment for the WakeWatch Expo app

echo "🚀 Setting up WakeWatch Expo App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "📱 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Supabase credentials"
fi

# Create placeholder asset directories
echo "📁 Creating asset directories..."
mkdir -p src/assets/images
mkdir -p src/assets/icons
mkdir -p src/assets/fonts

# Create placeholder files for assets
touch src/assets/images/splash.png
touch src/assets/icons/app-icon.png
touch src/assets/icons/adaptive-icon.png
touch src/assets/icons/favicon.png

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env with your Supabase credentials"
echo "2. Run 'expo start' to start the development server"
echo "3. Run 'expo start --web' to start the web version"
echo ""
echo "📚 Documentation:"
echo "- README.md for detailed setup instructions"
echo "- Architecture documentation in docs/ folder"
echo ""
echo "🎯 Phase 1 Status: Authentication foundation complete"
echo "   - Signup screen with validation ✅"
echo "   - Component library ✅"
echo "   - Navigation structure ✅"
echo "   - Theme system ✅"
