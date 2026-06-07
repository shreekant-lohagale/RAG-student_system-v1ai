import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Bot, User, BookOpen, Clock, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react'

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

  // Accent maps
  const accentClasses = {
    purple: {
      userBubble: 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-500/20 text-slate-50',
      activeBorder: 'border-purple-500 bg-purple-950/5',
      badge: 'text-purple-400 border-purple-500/20 bg-purple-500/10 hover:border-purple-500/40',
      iconAccent: 'text-purple-400',
      avatar: 'from-purple-600 to-indigo-600'
    },
    emerald: {
      userBubble: 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500/20 text-slate-50',
      activeBorder: 'border-emerald-500 bg-emerald-950/5',
      badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:border-emerald-500/40',
      iconAccent: 'text-emerald-400',
      avatar: 'from-emerald-600 to-teal-600'
    },
    amber: {
      userBubble: 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-500/20 text-slate-50',
      activeBorder: 'border-amber-500 bg-amber-950/5',
      badge: 'text-amber-400 border-amber-500/20 bg-amber-500/10 hover:border-amber-500/40',
      iconAccent: 'text-amber-400',
      avatar: 'from-amber-600 to-orange-600'
    }
  }

  const currentAccent = accentClasses[themeAccent] || accentClasses['purple']

  return (
    <div 
      onClick={() => onMessageClick(msg)}
      className={`flex gap-4 items-start ${isUser ? 'justify-end' : 'justify-start'} ${
        hasSources ? 'cursor-pointer group' : ''
      }`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className={`w-9.5 h-9.5 rounded-xl bg-gradient-to-tr ${currentAccent.avatar} flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-purple-500/5 animate-fade-in`}>
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Bubble Container */}
      <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-lg transition-all duration-300 ${
        isUser 
          ? `${currentAccent.userBubble} border rounded-tr-none` 
          : `glass-panel border ${isSelected ? currentAccent.activeBorder : 'border-slate-900 hover:border-slate-800/80'} rounded-tl-none relative`
      }`}>
        {/* Assistant Header */}
        {!isUser && (
          <div className="flex items-center justify-between mb-2.5 border-b border-slate-900/60 pb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider font-heading ${currentAccent.iconAccent}`}>
              Lumina Assistant
            </span>
            {hasSources && (
              <span className={`text-[9px] px-2.5 py-0.8 rounded-full border transition-all flex items-center gap-1.5 font-semibold ${
                isSelected ? 'animate-pulse' : ''
              } ${currentAccent.badge}`}>
                <BookOpen className="w-3 h-3" />
                {msg.sources.length} matching citations
              </span>
            )}
          </div>
        )}

        {/* Bubble Markdown Text */}
        <div className="text-sm leading-relaxed text-slate-200 break-words prose prose-invert max-w-none">
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>

        {/* Interactive Controls & Citations Indicator */}
        {!isUser && (
          <div className="mt-3 border-t border-slate-900/60 pt-2.5 flex items-center justify-between gap-4">
            {hasSources && !isSelected ? (
              <div className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Click card to inspect source paragraphs</span>
              </div>
            ) : (
              <div />
            )}

            {/* Utility Action Buttons */}
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <button 
                onClick={copyText}
                className="p-1 rounded hover:bg-slate-900 border border-transparent hover:border-slate-850 text-slate-500 hover:text-slate-300 transition-all"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={(e) => handleFeedback('up', e)}
                className={`p-1 rounded hover:bg-slate-900 border border-transparent hover:border-slate-850 transition-all ${
                  feedback === 'up' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Upvote answer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => handleFeedback('down', e)}
                className={`p-1 rounded hover:bg-slate-900 border border-transparent hover:border-slate-850 transition-all ${
                  feedback === 'down' ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Downvote answer"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-9.5 h-9.5 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center shrink-0 shadow-lg shadow-slate-950/20">
          <User className="w-5 h-5 text-slate-300" />
        </div>
      )}
    </div>
  )
}
