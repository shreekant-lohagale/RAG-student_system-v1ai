import React from 'react'
import { Compass, Cpu, BookOpen, ChevronRight } from 'lucide-react'

const QUICK_QUESTIONS = [
  {
    text: "What is covered in Unit IV of AIML?",
    icon: Compass,
    label: "Syllabus Overview"
  },
  {
    text: "Explain backpropagation according to Ian Goodfellow's Deep Learning book.",
    icon: Cpu,
    label: "Deep Learning Concepts"
  },
  {
    text: "What are the core topics covered in neural network optimization?",
    icon: BookOpen,
    label: "Optimization Topics"
  }
]

export default function QuickQuestions({ onSelectQuestion, themeAccent }) {
  const textAccents = {
    purple: 'text-purple-400 group-hover:text-purple-300',
    emerald: 'text-emerald-400 group-hover:text-emerald-300',
    amber: 'text-amber-400 group-hover:text-amber-300'
  }
  const activeTextAccent = textAccents[themeAccent] || textAccents['purple']

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 text-left animate-fade-in-up">
      {QUICK_QUESTIONS.map((q, idx) => {
        const IconComp = q.icon
        return (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q.text)}
            className="p-5.5 rounded-3xl glass-panel-interactive text-slate-300 flex flex-col gap-4 group relative overflow-hidden text-left hover:scale-[1.02] active:scale-[0.99]"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-purple-500/5 blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/[0.04] w-fit group-hover:bg-slate-900 group-hover:scale-105 transition-all duration-300">
              <IconComp className={`w-5 h-5 ${activeTextAccent}`} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 tracking-tight font-heading group-hover:text-slate-100 transition-colors">
                {q.label}
              </h4>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {q.text}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-all pt-2.5 border-t border-white/[0.04] mt-1">
              <span>Ask Query</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        )
      })}
    </div>
  )
}
