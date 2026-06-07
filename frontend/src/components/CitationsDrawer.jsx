import React from 'react'
import { BookOpen, X, FileText } from 'lucide-react'

export default function CitationsDrawer({ isOpen, setIsOpen, sources }) {
  return (
    <div 
      className={`${
        isOpen && sources.length > 0 ? 'w-96' : 'w-0'
      } transition-all duration-300 ease-in-out flex flex-col h-full bg-slate-900/30 border-l border-slate-800/60 backdrop-blur-md z-20 overflow-hidden relative shrink-0`}
    >
      <div className="p-5 border-b border-slate-800/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4.5 h-4.5 text-purple-400" />
          <h2 className="font-bold text-sm text-slate-200 font-heading">Document Citations</h2>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Source cards container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {sources.map((src, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-purple-500/20 transition-all flex flex-col gap-2.5 relative group"
          >
            <div className="absolute top-2.5 right-2.5 text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-purple-400 font-semibold">
              Match #{index + 1}
            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-blue-400 shrink-0" />
              <div className="max-w-[70%]">
                <h4 className="text-xs font-bold text-slate-300 truncate" title={src.metadata.source}>
                  {src.metadata.source}
                </h4>
                <p className="text-[9px] text-slate-500">Page {src.metadata.page || 'N/A'}</p>
              </div>
            </div>

            <div className="text-[11px] leading-relaxed text-slate-400 border-t border-slate-850 pt-2 bg-slate-900/20 rounded p-1.5 line-clamp-6 select-text">
              {src.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
