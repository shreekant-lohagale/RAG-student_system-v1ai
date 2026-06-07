import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Bot, BookOpen, Clock, User } from 'lucide-react'

export default function ChatMessage({ msg, selectedMessageId, onMessageClick }) {
  const isUser = msg.role === 'user'
  const hasSources = msg.sources && msg.sources.length > 0
  const isSelected = selectedMessageId === msg.id

  return (
    <div 
      onClick={() => onMessageClick(msg)}
      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} ${
        hasSources ? 'cursor-pointer group' : ''
      }`}
    >
      {/* Left Avatar for Bot */}
      {!isUser && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 border border-purple-400/20 shadow-lg shadow-purple-500/10 animate-fade-in">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-[85%] rounded-2xl px-4.5 py-3.5 shadow-md transition-all duration-200 ${
        isUser 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-slate-50 border border-purple-500/20 rounded-tr-none' 
          : `glass border ${isSelected ? 'border-purple-500 bg-purple-950/10' : 'border-slate-800/80 hover:border-slate-700/60'} rounded-tl-none`
      }`}>
        {/* Message Header for Assistant */}
        {!isUser && (
          <div className="flex items-center justify-between mb-1.5 border-b border-slate-800/50 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-heading">
              Lumina Assistant
            </span>
            {hasSources && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-semibold group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all flex items-center gap-1">
                <BookOpen className="w-2.5 h-2.5" />
                {msg.sources.length} sources
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="text-sm leading-relaxed text-slate-200 break-words prose prose-invert max-w-none">
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>

        {/* Click info banner for references */}
        {!isUser && hasSources && !isSelected && (
          <div className="mt-2 text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Click message to inspect matching document citations</span>
          </div>
        )}
      </div>

      {/* Right Avatar for User */}
      {isUser && (
        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg shadow-slate-950/20">
          <User className="w-5 h-5 text-slate-300" />
        </div>
      )}
    </div>
  )
}
