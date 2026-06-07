import React from 'react'
import { Send, Trash2, Mic, Paperclip } from 'lucide-react'

export default function ChatInput({ input, setInput, onSubmit, isLoading, onClearHistory, themeAccent }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  // Accent button colors
  const accentButtons = {
    purple: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/25',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25',
    amber: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/25'
  }
  const currentSendButton = accentButtons[themeAccent] || accentButtons['purple']

  const textAccents = {
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400'
  }
  const currentTextAccent = textAccents[themeAccent] || textAccents['purple']

  return (
    <footer className="p-4 md:p-6 bg-transparent shrink-0">
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        <div className="relative flex items-center glass-panel border border-slate-900 rounded-2xl px-2 py-1.5 focus-within:border-slate-800/80 transition-all duration-300 shadow-xl">
          
          {/* Quick controls: Clear history */}
          <button 
            type="button"
            onClick={onClearHistory}
            className="p-2.5 rounded-xl hover:bg-slate-900/60 border border-transparent hover:border-slate-850 text-slate-500 hover:text-rose-400 transition-all active:scale-95 shrink-0"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Quick controls: Mock attachment */}
          <button 
            type="button"
            className="p-2.5 rounded-xl hover:bg-slate-900/60 border border-transparent hover:border-slate-850 text-slate-500 hover:text-slate-300 transition-all active:scale-95 shrink-0 hidden xs:inline-flex"
            title="Attach research files (Mock)"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 px-1">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about syllabus requirements or Deep Learning topics..."
              disabled={isLoading}
              className="w-full bg-transparent border-none py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none disabled:opacity-50 transition-all"
            />
            
            {/* Quick controls: Mock microphone */}
            <button 
              type="button"
              className={`p-2.5 rounded-xl hover:bg-slate-900/60 border border-transparent hover:border-slate-850 text-slate-500 hover:${currentTextAccent} transition-all active:scale-95 shrink-0 hidden xs:inline-flex`}
              title="Voice query (Mock)"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-2.5 rounded-xl text-white transition-all shadow-lg active:scale-95 shrink-0 disabled:opacity-30 disabled:hover:scale-100 disabled:shadow-none ${currentSendButton}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
        
        <p className="text-[10px] text-slate-500 text-center select-none">
          Answers are retrieved using semantic cosine similarity matching against local syllabus indices and deep learning references.
        </p>
      </div>
    </footer>
  )
}
