

# Development Guide

## Getting Started

### 0. Install Claude Code CLI

**วิธีที่ 1: ใช้ npm (แนะนำ)**
```bash
npm install -g @anthropic-ai/claude-code
```

**วิธีที่ 2: ใช้ Homebrew (สำหรับ macOS)**
```bash
brew install --cask claude-code
```

**วิธีที่ 3: ใช้สคริปต์การติดตั้ง**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**หลังจากติดตั้ง:**
1. รันคำสั่ง `claude` เพื่อเริ่มต้น
2. ครั้งแรกจะถูกขอให้เข้าสู่ระบบด้วย `/login`
3. ทำตามคำแนะนำเพื่อเข้าสู่ระบบด้วยบัญชี Claude.ai

### 1. Clone & Install
```bash
git clone <repo-url>
cd todo-fullstack-monorepo
npm run install:all
```

### 2. Environment Setup
Copy `.env.example` in each package and configure

### 3. Start Development
```bash
npm run dev:all
```

## Development Workflow

### Creating New Features

1. **Create branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Use Claude Code**
```bash
cd backend  # or frontend/cms
claude code --parallel --task "your task description"
```

3. **Test**
```bash
npm test
```

4. **Update CLAUDE.md**
Document your learnings

5. **Commit**
```bash
git add .
git commit -m "feat: your feature description"
```

6. **Create PR**

## Common Tasks

### Adding New API Endpoint
1. Update `shared/API_CONTRACT.md`
2. Use Claude Code in backend
3. Use Claude Code in frontend
4. Test integration

### Adding New CMS Content Type
1. Configure in Strapi admin
2. Update backend integration
3. Update frontend to display

## Troubleshooting

[Will be filled during development]

