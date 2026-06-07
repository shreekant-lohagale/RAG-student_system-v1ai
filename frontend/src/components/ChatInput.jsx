import React from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ input, setInput, onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <footer className="p-4 md:p-6 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md shrink-0">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about syllabus requirements or Deep Learning topics..."
            disabled={isLoading}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl py-3.5 pl-5 pr-14 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2.5 p-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-30 disabled:hover:bg-purple-600 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 text-center mt-3">
          Answers are retrieved using semantic cosine similarity matching against local syllabus indices and deep learning references.
        </p>
      </div>
    </footer>
  )
}
