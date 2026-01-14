#!/bin/bash

echo "🔍 Checking Monorepo Setup..."
echo ""

# Check structure
echo "📁 Folder Structure:"
if [ -d "frontend" ] && [ -d "backend" ] && [ -d "cms" ] && [ -d "shared" ]; then
  echo "✅ All main folders exist"
else
  echo "❌ Missing folders"
  exit 1
fi

# Check shared files
echo ""
echo "📋 Shared Files:"
if [ -f "shared/API_CONTRACT.md" ] && [ -f "shared/SHARED_CONTEXT.md" ]; then
  echo "✅ API Contract & Shared Context exist"
else
  echo "❌ Missing shared files"
  exit 1
fi

# Check root files
echo ""
echo "📄 Root Files:"
if [ -f "README.md" ] && [ -f "package.json" ] && [ -f ".gitignore" ]; then
  echo "✅ Root configuration files exist"
else
  echo "❌ Missing root files"
  exit 1
fi

# Check Git
echo ""
echo "🔄 Git:"
if [ -d ".git" ]; then
  COMMITS=$(git log --oneline | wc -l)
  echo "✅ Git initialized ($COMMITS commits)"
else
  echo "❌ Git not initialized"
  exit 1
fi

# Check Node.js
echo ""
echo "💻 Environment:"
if command -v node &> /dev/null; then
  echo "✅ Node.js: $(node --version)"
else
  echo "❌ Node.js not found"
  exit 1
fi

if command -v claude &> /dev/null; then
  echo "✅ Claude Code: Installed"
else
  echo "⚠️  Claude Code: Not found (install before starting development)"
fi

if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo "✅ API Key: Set"
else
  echo "⚠️  API Key: Not set (required for Claude Code)"
fi

echo ""
echo "════════════════════════════════════════════"
echo "📊 Setup Summary:"
echo "════════════════════════════════════════════"
if command -v tree &> /dev/null; then
  tree -L 2 -I node_modules
else
  echo "Project structure:"
  ls -la | grep -E "^d" | awk '{print "  " $9}' | grep -v "^\.$"
  echo ""
  echo "Workspaces:"
  for dir in frontend backend cms shared; do
    if [ -d "$dir" ]; then
      echo "  📁 $dir/"
      ls -1 "$dir" 2>/dev/null | head -5 | sed 's/^/    - /' || echo "    (empty)"
    fi
  done
fi

echo ""
echo "🎯 Next Steps:"
echo "1. cd backend && claude code --task-file .claude/task-backend.md"
echo "2. cd frontend && claude code --task-file .claude/task-frontend.md"
echo "3. cd cms && claude code --task-file .claude/task-cms.md"
echo ""
