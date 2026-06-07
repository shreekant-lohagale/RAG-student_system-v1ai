import React from 'react'
import { Menu, Search, Cpu } from 'lucide-react'

export default function Header({ isSidebarOpen, setIsSidebarOpen, searchQuery, setSearchQuery, themeAccent, setThemeAccent }) {
  const accentClasses = {
    purple: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/10'
  }

  const borderAccents = {
    purple: 'focus:border-purple-500/40 focus:ring-purple-500/10',
    emerald: 'focus:border-emerald-500/40 focus:ring-emerald-500/10',
    amber: 'focus:border-amber-500/40 focus:ring-amber-500/10'
  }

  return (
    <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 bg-[#030712]/40 backdrop-blur-xl shrink-0 z-10">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:bg-slate-900 hover:text-purple-400 hover:border-purple-500/30 transition-all shadow-md active:scale-95"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
        
        <div className="flex items-center gap-2.5">
          <div className="hidden xs:flex items-center gap-1">
            <Cpu className={`w-4.5 h-4.5 ${themeAccent === 'emerald' ? 'text-emerald-400' : themeAccent === 'amber' ? 'text-amber-400' : 'text-purple-400'}`} />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold text-slate-100 font-heading tracking-wide flex items-center gap-2">
              Lumina Knowledge Engine
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border tracking-normal font-semibold uppercase ${accentClasses[themeAccent] || accentClasses['purple']}`}>
                Docs: 2 | Chunks: 4470 | Mistral Small
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Right Controls: Search & Accent Changer */}
      <div className="flex items-center gap-4">
        {/* Search bar inside header */}
        <div className="relative w-56 hidden sm:block">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search matching discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-[#0b1120]/60 border border-white/[0.08] rounded-xl py-1.5 pl-9 pr-4 text-xs text-slate-300 placeholder-slate-500 focus:outline-none transition-all ${borderAccents[themeAccent] || borderAccents['purple']}`}
          />
        </div>

        {/* Accent Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0b1120] border border-white/[0.08] backdrop-blur-md">
          <button
            onClick={() => setThemeAccent('purple')}
            className={`w-4 h-4 rounded-full transition-all ${
              themeAccent === 'purple' 
                ? 'bg-purple-500 ring-2 ring-purple-300 ring-offset-2 ring-offset-slate-950 scale-110' 
                : 'bg-purple-950 hover:bg-purple-900'
            }`}
            title="Purple Accents"
          />
          <button
            onClick={() => setThemeAccent('emerald')}
            className={`w-4 h-4 rounded-full transition-all ${
              themeAccent === 'emerald' 
                ? 'bg-emerald-500 ring-2 ring-emerald-300 ring-offset-2 ring-offset-slate-950 scale-110' 
                : 'bg-emerald-950 hover:bg-emerald-900'
            }`}
            title="Emerald Accents"
          />
          <button
            onClick={() => setThemeAccent('amber')}
            className={`w-4 h-4 rounded-full transition-all ${
              themeAccent === 'amber' 
                ? 'bg-amber-500 ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-950 scale-110' 
                : 'bg-amber-950 hover:bg-amber-900'
            }`}
            title="Amber Accents"
          />
        </div>
      </div>
    </header>
  )
}
