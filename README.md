# 🪓🐛 chainsawn-bug

**chainsawn-bug** is a frontend playground monorepo managed with **[Turborepo](https://turbo.build/repo)**. It’s a personal space to test different frontend frameworks, libraries, and UI toolkits — each project themed after a bug 🐞.

Whether it's trying out a new UI system or comparing frameworks, this repo helps keep everything tidy and modular.

## 🐞 Existing Projects

* **🐝 `bee/`** – An [Electron](https://www.electronjs.org/) app for desktop frontend experiments.
* **🪰 `fly/`** – A [Bun](https://bun.sh/) + [Vite](https://vitejs.dev/) setup for testing [Radix UI](https://www.radix-ui.com/) with React.
* **🦂 `wasp/`** – Same as `fly`, but using **Preact** instead of React.

> All projects are frontend-only and focused on UI experimentation.

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/yourusername/chainsawn-bug.git
cd chainsawn-bug
```

2. Install dependencies (with [Bun](https://bun.sh/)):

```bash
bun install
```

3. Run a specific project:

```bash
bun turbo run dev --filter=bee
bun turbo run dev --filter=fly
bun turbo run dev --filter=wasp
```

> Requires **Node.js ≥18** and **Bun v1.2.3** or higher.

## 🗂 Repo Structure

```
chainsawn-bug/
├── apps/
│   ├── bee/       # Electron-based app
│   ├── fly/       # Bun + Vite + React + Radix UI
│   └── wasp/      # Bun + Vite + Preact
├── packages/      # (shared code may live here in the future)
├── turbo.json
├── bun.lockb
└── README.md
```

## 🔮 Coming Soon

More bug-themed frontend setups are on the way. 

## 🧪 Purpose

* Explore new libraries and frameworks in isolation
* Compare setups with minimal config overhead
* Centralized and fast iteration using Bun + Turborepo