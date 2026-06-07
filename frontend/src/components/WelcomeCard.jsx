import React from 'react'
import { Sparkles, BookOpen, GraduationCap, Cpu } from 'lucide-react'

export default function WelcomeCard() {
  return (
    <div className="max-w-2xl mx-auto my-8 p-6.5 rounded-3xl glass-panel border border-white/[0.08] shadow-2xl animate-fade-in-up text-left relative overflow-hidden">
      {/* Decorative accent blur inside the card */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

      {/* Title Header */}
      <div className="flex items-start gap-4 pb-4 border-b border-white/[0.06] mb-5">
        <div className="p-3.5 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-400 shrink-0">
          <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 font-heading flex items-center gap-2 tracking-tight">
            Lumina Knowledge Engine
          </h2>
          <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mt-0.5">
            RAG-Powered Academic Assistant
          </p>
        </div>
      </div>

      {/* Description Content */}
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Welcome to your advanced research assistant. Lumina is connected to a local vector store containing your core curriculum references.
        </p>

        {/* Sources List Box */}
        <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/[0.04] backdrop-blur-md">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            Indexed Academic Sources
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 pl-1 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>AIML Curriculum & Credits Scheme</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Deep Learning Textbook (Ian Goodfellow, Yoshua Bengio, Aaron Courville)</span>
            </li>
          </ul>
        </div>

        {/* Suggestion guidelines */}
        <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-2 leading-relaxed">
          <GraduationCap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <p>
            Ask questions about syllabus modules, course prerequisites, credit weights, neural network optimization, backpropagation calculations, or deep learning concepts.
          </p>
        </div>
      </div>
    </div>
  )
}
