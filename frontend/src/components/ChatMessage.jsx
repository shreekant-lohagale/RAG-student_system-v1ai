import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, FileText } from 'lucide-react'

export default function ChatMessage({ msg, selectedMessageId, onMessageClick, themeAccent }) {
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState(null) // 'up' | 'down' | null

  const isUser = msg.role === 'user'
  const hasSources = msg.sources && msg.sources.length > 0
  const isSelected = selectedMessageId === msg.id

  const copyText = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (type, e) => {
    e.stopPropagation()
    setFeedback(prev => prev === type ? null : type)
  }

  // Accent mapping
  const iconAccents = {
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/25'
  }
  const currentIconAccent = iconAccents[themeAccent] || iconAccents['purple']

  const borderAccents = {
    purple: 'border-purple-500/25 bg-purple-950/[0.04]',
    emerald: 'border-emerald-500/25 bg-emerald-950/[0.04]',
    amber: 'border-amber-500/25 bg-amber-950/[0.04]'
  }
  const currentBorderAccent = borderAccents[themeAccent] || borderAccents['purple']

  return (
    <div className={`flex gap-4 items-start w-full animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Bot Avatar Icon */}
      {!isUser && (
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 shadow-md ${currentIconAccent}`}>
          <Bot className="w-5 h-5" />
        </div>
      )}

      {/* Bubble Box */}
      <div className={`flex-1 max-w-[85%] rounded-3xl p-5 shadow-lg border transition-all duration-300 ${
        isUser 
          ? 'bg-[#0B1120] border-white/[0.08] text-slate-50' 
          : `bg-[#0B1120] ${isSelected ? currentBorderAccent : 'border-white/[0.08]'}`
      }`}>
        
        {/* Bubble Header */}
        <div className="flex items-center justify-between mb-3.5 border-b border-white/[0.04] pb-2">
          <div className="flex items-center gap-2">
            {!isUser ? (
              <span className={`text-[11px] font-bold uppercase tracking-wider font-heading ${themeAccent === 'emerald' ? 'text-emerald-400' : themeAccent === 'amber' ? 'text-amber-400' : 'text-purple-400'}`}>
                Lumina AI
              </span>
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-wider font-heading text-slate-400">
                You
              </span>
            )}
          </div>

          {/* Action controls for assistant responses */}
          {!isUser && (
            <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
              <button 
                onClick={copyText}
                className="p-1 rounded-lg hover:bg-slate-900 border border-transparent hover:border-white/[0.08] text-slate-500 hover:text-slate-300 transition-all"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={(e) => handleFeedback('up', e)}
                className={`p-1 rounded-lg hover:bg-slate-900 border border-transparent hover:border-white/[0.08] transition-all ${
                  feedback === 'up' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Upvote response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => handleFeedback('down', e)}
                className={`p-1 rounded-lg hover:bg-slate-900 border border-transparent hover:border-white/[0.08] transition-all ${
                  feedback === 'down' ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Downvote response"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Content markdown */}
        <div className="text-sm leading-relaxed text-slate-200 break-words prose prose-invert max-w-none">
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>

        {/* Inline Source citation cards list (Perplexity-style) */}
        {!isUser && hasSources && (
          <div className="mt-4 pt-3.5 border-t border-white/[0.04]">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Sources:
            </p>
            <div className="flex flex-wrap gap-2">
              {msg.sources.map((src, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    onMessageClick(msg) // Opens citations drawer on click
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-white/[0.06] hover:border-purple-500/25 text-[10px] text-slate-300 hover:text-purple-300 transition-all font-medium group"
                >
                  <FileText className="w-3 h-3 text-purple-400 group-hover:scale-105 transition-transform shrink-0" />
                  <span className="truncate max-w-[120px]">{src.metadata.source}</span>
                  <span className="text-[9px] text-slate-500 font-mono">Page {src.metadata.page}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Avatar Icon */}
      {isUser && (
        <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] text-slate-400 shrink-0 bg-[#0B1120] shadow-md">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  )
}
