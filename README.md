# 📝 Todo Fullstack Monorepo

> Full-stack todo application with blog functionality, built with Claude Code

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Overview

This is a **monorepo** project containing:
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express + SQLite
- **CMS:** Strapi 4 for content management

Built as a learning project for **Claude Code workflow** and AI-assisted development.

---

## 📁 Project Structure
```
todo-fullstack-monorepo/
├── frontend/          # React application (port 3000)
├── backend/           # Express API (port 5000)
├── cms/              # Strapi CMS (port 1337)
├── shared/           # Shared contracts & documentation
│   ├── API_CONTRACT.md
│   └── SHARED_CONTEXT.md
├── docs/             # Additional documentation
└── README.md         # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Git
- Claude Code CLI

### Installation
```bash
# 1. Clone repository
git clone <your-repo-url>
cd todo-fullstack-monorepo

# 2. Install dependencies (will do for each package)
# We'll use Claude Code to set up each part
```

---

## 🏗️ Development Workflow

### Phase 1: Backend Setup
```bash
cd backend
claude code --parallel --context ../shared/SHARED_CONTEXT.md \
  --task-file .claude/task-backend.md
```

### Phase 2: Frontend Setup
```bash
cd frontend
claude code --parallel --context ../shared/SHARED_CONTEXT.md \
  --task-file .claude/task-frontend.md
```

### Phase 3: CMS Setup
```bash
cd cms
claude code --context ../shared/SHARED_CONTEXT.md \
  --task-file .claude/task-cms.md
```

---

## 📚 Documentation

- [API Contract](./shared/API_CONTRACT.md) - API specifications
- [Shared Context](./shared/SHARED_CONTEXT.md) - Project-wide rules
- [Backend Docs](./backend/README.md)
- [Frontend Docs](./frontend/README.md)
- [CMS Docs](./cms/README.md)

---

## 🧪 Testing
```bash
# Run all tests
npm run test:all

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

---

## 🎓 Learning Objectives

This project demonstrates:

✅ Monorepo architecture
✅ Claude Code parallel development
✅ API contract-first design
✅ Shared knowledge base (CLAUDE.md)
✅ Full-stack integration
✅ TDD approach
✅ Production-ready patterns

---

## 📝 Development Notes

Each package maintains its own `CLAUDE.md` documenting:
- Architecture decisions
- Learnings and discoveries
- Challenges and solutions
- Best practices

---

## 🔗 Related Links

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [API Contract](./shared/API_CONTRACT.md)
- [Shared Context](./shared/SHARED_CONTEXT.md)

---

## 📄 License

MIT
