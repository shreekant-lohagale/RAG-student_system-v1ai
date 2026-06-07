import React, { useState } from 'react'
import { Sparkles, X, Server, HardDrive, Wifi, Cpu, Folder, FileText, ChevronDown, Terminal, RefreshCw } from 'lucide-react'

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, backendStatus }) {
  const [activeFolder, setActiveFolder] = useState('all')

  return (
    <div 
      className={`${
        isSidebarOpen ? 'w-80' : 'w-0 pointer-events-none'
      } transition-all duration-300 ease-in-out flex flex-col h-full bg-slate-950/45 border-r border-slate-800/60 backdrop-blur-xl z-20 overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/30 shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500 border-2 border-slate-950"></span>
            </span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-100 tracking-tight font-heading flex items-center gap-1.5">
              Lumina
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold">
                v2.0
              </span>
            </h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Academic RAG Dashboard</p>
          </div>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800/80 text-slate-400 hover:text-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Connection & Stats Panel */}
      <div className="p-4 mx-4 my-4 rounded-xl bg-slate-900/40 border border-slate-900/80 backdrop-blur-md flex flex-col gap-3.5">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <div className="flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RAG Engine Stats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              backendStatus === 'connected' ? 'bg-cyan-500 animate-pulse' :
              backendStatus === 'checking' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
            }`} />
            <span className="text-[10px] font-semibold tracking-wide capitalize text-slate-300">
              {backendStatus === 'connected' ? 'Connected' : 
               backendStatus === 'checking' ? 'Checking...' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <HardDrive className="w-3 h-3 text-cyan-500" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">Database</span>
            </div>
            <span className="text-xs font-bold text-slate-200 font-heading">Chroma DB</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">LLM Node</span>
            </div>
            <span className="text-xs font-bold text-slate-200 font-heading">Mistral RAG</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Active Cosine Matching</span>
          </div>
          <span className="font-mono text-purple-400">k=10 chunks</span>
        </div>
      </div>

      {/* Indexed Documents Section */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Knowledge Repository
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-500">
              2 Files
            </span>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {/* Folder 1: Syllabus */}
            <div className="rounded-lg border border-slate-900 bg-slate-900/10 hover:border-slate-800/60 transition-all overflow-hidden">
              <div className="p-3 flex items-center justify-between bg-slate-900/20 border-b border-slate-900/40">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-300">Syllabi Curriculum</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
              <div className="p-2 flex flex-col gap-1.5 bg-slate-950/40">
                <div className="p-2 rounded-md hover:bg-slate-900/50 transition-all flex gap-2.5 items-start cursor-pointer group">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-[11px] font-medium text-slate-300 line-clamp-1 group-hover:text-slate-100 transition-colors">
                      Third Year -AIML_Syllabus.pdf
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">Academic Syllabus • 3.5 MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Folder 2: Core Textbooks */}
            <div className="rounded-lg border border-slate-900 bg-slate-900/10 hover:border-slate-800/60 transition-all overflow-hidden">
              <div className="p-3 flex items-center justify-between bg-slate-900/20 border-b border-slate-900/40">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-300">Literature Reference</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
              <div className="p-2 flex flex-col gap-1.5 bg-slate-950/40">
                <div className="p-2 rounded-md hover:bg-slate-900/50 transition-all flex gap-2.5 items-start cursor-pointer group">
                  <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-[11px] font-medium text-slate-300 line-clamp-1 group-hover:text-slate-100 transition-colors">
                      Deep Learning Ian Goodfellow.pdf
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">Core textbook • 19.3 MB</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Workspace Footer */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/60 text-[9px] text-slate-500 text-center flex items-center justify-center gap-2 shrink-0">
        <Terminal className="w-3 h-3 text-slate-600" />
        <span>v2.0.0 • FastAPI • React 19 • Chroma</span>
      </div>
    </div>
  )
}
