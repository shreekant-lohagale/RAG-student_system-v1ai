import React from 'react'
import { Sparkles, X, FileCheck, FileText, Terminal } from 'lucide-react'

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, backendStatus }) {
  return (
    <div 
      className={`${
        isSidebarOpen ? 'w-80' : 'w-0 pointer-events-none'
      } transition-all duration-300 ease-in-out flex flex-col h-full bg-slate-900/40 border-r border-slate-800/80 backdrop-blur-md z-20`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-100 tracking-tight font-heading">Lumina AI</h2>
            <p className="text-xs text-purple-400/80 font-medium">Academic RAG Hub</p>
          </div>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Database Status Panel */}
      <div className="p-4 mx-4 my-4 rounded-xl glass-interactive flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Connection status</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              backendStatus === 'connected' ? 'bg-emerald-500 animate-pulse' :
              backendStatus === 'checking' ? 'bg-amber-500' : 'bg-rose-500'
            }`} />
            <span className="text-xs font-medium capitalize">
              {backendStatus === 'connected' ? 'Connected' : 
               backendStatus === 'checking' ? 'Checking...' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Chroma Vector Store Active</span>
        </div>
      </div>

      {/* Indexed Documents Section */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-2">
          Indexed Corpus
        </h3>
        <div className="flex flex-col gap-2">
          <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700/80 transition-all flex gap-3 items-start">
            <FileText className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-medium text-slate-200 line-clamp-1">Third Year -AIML_Syllabus.pdf</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Syllabus Curriculum</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700/80 transition-all flex gap-3 items-start">
            <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-medium text-slate-200 line-clamp-1">Deep Learning Ian Goodfellow.pdf</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Core textbook • 19.3 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Footer */}
      <div className="p-4 border-t border-slate-800/40 text-[10px] text-slate-500 text-center flex items-center justify-center gap-2">
        <Terminal className="w-3.5 h-3.5" />
        <span>v1.0.0 • Python FastAPI • React</span>
      </div>
    </div>
  )
}
