import React from 'react'
import { Menu, Search } from 'lucide-react'

export default function Header({ isSidebarOpen, setIsSidebarOpen, searchQuery, setSearchQuery }) {
  return (
    <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-purple-400 transition-all"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold text-slate-100 font-heading tracking-wide flex items-center gap-2">
            Lumina Workspace 
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 font-medium tracking-normal">
              RAG Assistant
            </span>
          </h1>
        </div>
      </div>

      {/* Search bar inside header */}
      <div className="relative w-64 hidden sm:block">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          placeholder="Search chat history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl py-1.5 pl-9 pr-4 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>
    </header>
  )
}
