# React + Tailwind CSS Web Client

This directory houses the user-facing web dashboard for **Lumina Academic AI**, styled with modern glassmorphism components and Outfit/Inter typography.

## 🚀 Getting Started

### Installation
Install standard React packages and dev dependencies (TailwindCSS, Lucide, React Markdown):
```powershell
cd frontend
npm install
```

### Running the App
Start the Vite development server locally:
```powershell
npm run dev
```
*   **Vite URL**: `http://localhost:5173/`

### Build for Production
Compiles the application assets into a compact, optimized production bundle inside the `dist/` directory:
```powershell
npm run build
```

---

## 🎨 Design Systems & Components

- **Main Dashboard**: Located in [App.jsx](file:///d:/Gen%20AI-project1/frontend/src/App.jsx). Manages message histories, API connection indicators, and sliding panels.
- **Glassmorphism Helpers**: Written in [index.css](file:///d:/Gen%20AI-project1/frontend/src/index.css), facilitating blur borders (`glass`), card transitions (`glass-interactive`), and custom text alignments.
- **Citations Drawer**: Collapsible right drawer presenting document snippets, page alignments, and document classifications retrieved from the vector store.
- **Tailwind Config**: Stored in [tailwind.config.js](file:///d:/Gen%20AI-project1/frontend/tailwind.config.js). Extends animation properties and lists compile target directories.
