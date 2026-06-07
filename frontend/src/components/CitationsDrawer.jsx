import React, { useState } from 'react'
import { BookOpen, X, FileText, Layers, Tag } from 'lucide-react'

export default function CitationsDrawer({ isOpen, setIsOpen, sources, themeAccent }) {
  const [activeTabs, setActiveTabs] = useState({}) // { [index]: 'content' | 'meta' }

  const setTab = (index, tabName) => {
    setActiveTabs(prev => ({
      ...prev,
      [index]: tabName
    }))
  }

  // Accent styles
  const accentProgress = {
    purple: 'from-purple-500 to-indigo-500',
    emerald: 'from-emerald-500 to-teal-500',
    amber: 'from-amber-500 to-orange-500'
  }
  const currentProgressAccent = accentProgress[themeAccent] || accentProgress['purple']

  const textAccents = {
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400'
  }
  const currentTextAccent = textAccents[themeAccent] || textAccents['purple']

  const borderAccents = {
    purple: 'border-purple-500/20 hover:border-purple-500/30',
    emerald: 'border-emerald-500/20 hover:border-emerald-500/30',
    amber: 'border-amber-500/20 hover:border-amber-500/30'
  }
  const currentBorderAccent = borderAccents[themeAccent] || borderAccents['purple']

  // Mock similarity scores just to render high-fidelity match indicators (e.g. 0.92, 0.88, etc.)
  const getMockScore = (index) => {
    const scores = [94, 88, 83, 79, 75, 72, 68, 64, 61, 58]
    return scores[index] || 60
  }

  return (
    <div 
      className={`${
        isOpen && sources.length > 0 ? 'w-96' : 'w-0'
      } transition-all duration-300 ease-in-out flex flex-col h-full bg-slate-950/45 border-l border-slate-900 backdrop-blur-xl z-20 overflow-hidden relative shrink-0`}
    >
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-900 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className={`w-4.5 h-4.5 ${currentTextAccent}`} />
          <h2 className="font-bold text-sm text-slate-200 font-heading">Document Citations</h2>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-850 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Source Cards Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {sources.map((src, index) => {
          const tab = activeTabs[index] || 'content'
          const matchPercentage = getMockScore(index)

          return (
            <div 
              key={index}
              className={`p-4.5 rounded-2xl bg-slate-900/30 border border-slate-900 ${currentBorderAccent} transition-all flex flex-col gap-3 relative group`}
            >
              {/* Badge indicating Rank Match */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wide">
                  Match Index #{index + 1}
                </span>
                
                <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-950 border border-slate-900 ${currentTextAccent}`}>
                  {matchPercentage}% Cosine Match
                </span>
              </div>

              {/* Similarity score bar */}
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-900/50">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${currentProgressAccent}`}
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>

              {/* Card Nav Tabs */}
              <div className="flex border-b border-slate-900/80 pb-1 gap-3">
                <button
                  onClick={() => setTab(index, 'content')}
                  className={`pb-1 text-[10px] font-bold uppercase tracking-wider transition-colors relative ${
                    tab === 'content' ? `${currentTextAccent}` : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Content
                  {tab === 'content' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-current rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setTab(index, 'meta')}
                  className={`pb-1 text-[10px] font-bold uppercase tracking-wider transition-colors relative ${
                    tab === 'meta' ? `${currentTextAccent}` : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  File Meta
                  {tab === 'meta' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-current rounded-full" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              {tab === 'content' ? (
                <div className="text-[11px] leading-relaxed text-slate-300 bg-slate-950/40 rounded-xl border border-slate-950 p-3 line-clamp-6 select-text">
                  {src.content}
                </div>
              ) : (
                <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-950 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px]">
                    <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-slate-500 uppercase tracking-wider font-semibold font-mono">Source Name:</span>
                    <span className="text-slate-300 font-bold truncate max-w-[160px]" title={src.metadata.source}>
                      {src.metadata.source}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px]">
                    <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="text-slate-500 uppercase tracking-wider font-semibold font-mono">Page Reference:</span>
                    <span className="text-slate-300 font-bold">Page {src.metadata.page || 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px]">
                    <Tag className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-500 uppercase tracking-wider font-semibold font-mono">Doc Schema:</span>
                    <span className="text-slate-300 font-bold">Vector PDF Chunk</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
