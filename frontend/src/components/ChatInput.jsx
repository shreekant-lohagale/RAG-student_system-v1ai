import React from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ input, setInput, onSubmit, isLoading, themeAccent }) {
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

  return (
    <footer className="p-4 md:p-6 bg-transparent shrink-0">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        <form 
          onSubmit={handleSubmit} 
          className="relative flex items-center bg-[#0B1120] border border-white/[0.08] rounded-2xl p-1.5 focus-within:border-purple-500/30 transition-all duration-300 shadow-xl"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about syllabus requirements or Deep Learning topics..."
            disabled={isLoading}
            className="w-full bg-transparent border-none py-3 pl-4 pr-14 text-sm text-slate-100 placeholder-slate-500 focus:outline-none disabled:opacity-50 transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`absolute right-2.5 p-2 rounded-xl text-white transition-all shadow-md active:scale-95 disabled:opacity-20 disabled:hover:scale-100 disabled:shadow-none ${currentSendButton}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 text-center select-none pt-1">
          Answers are retrieved using semantic cosine similarity matching against local syllabus indices and deep learning references.
        </p>
      </div>
    </footer>
  )
}
