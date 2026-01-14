

## System Overview
```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ↓
┌───────────────────────────────────────────────────────────┐
│                  Frontend (React)                         │
│  - UI Components                                          │
│  - State Management (Zustand)                             │
│  - API Client (Axios)                                     │
│  - Routing (React Router)                                 │
└───────────────────────┬───────────────────────────────────┘
                        │ HTTP/JSON
                        ↓
┌───────────────────────────────────────────────────────────┐
│                  Backend API (Express)                    │
│  - REST Endpoints                                         │
│  - JWT Authentication                                     │
│  - Business Logic                                         │
│  - Data Validation                                        │
└─────┬──────────────────┬──────────────────┬──────────────┘
      │                  │                  │
      ↓                  ↓                  ↓
┌──────────┐      ┌──────────┐      ┌──────────┐
│ Database │      │  Cache   │      │   CMS    │
│ (SQLite) │      │ (Redis)  │      │ (Strapi) │
└──────────┘      └──────────┘      └──────────┘
```

## Component Details

[Will be filled by Claude Code during development]

## Data Flow

[Will be documented during development]

## Security Architecture

[Will be documented during development]

EOF

# สร้าง Development Guide
cat > docs/DEVELOPMENT.md << 'EOF'
# Development Guide

## Getting Started

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

