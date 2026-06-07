import React from 'react'
import { Compass, Cpu, BookOpen, ChevronRight } from 'lucide-react'

const QUICK_QUESTIONS = [
  {
    text: "What is the syllabus of Third Year AIML?",
    icon: Compass,
    label: "Syllabus Overview"
  },
  {
    text: "Explain backpropagation according to Ian Goodfellow's Deep Learning book.",
    icon: Cpu,
    label: "Deep Learning concepts"
  },
  {
    text: "What are the core topics covered in neural network optimization?",
    icon: BookOpen,
    label: "Optimization Topics"
  }
]

export default function QuickQuestions({ onSelectQuestion, themeAccent }) {
  const hoverStyles = {
    purple: 'hover:border-purple-500/40 hover:bg-purple-950/15 group-hover:text-purple-300 text-purple-400',
    emerald: 'hover:border-emerald-500/40 hover:bg-emerald-950/15 group-hover:text-emerald-300 text-emerald-400',
    amber: 'hover:border-amber-500/40 hover:bg-amber-950/15 group-hover:text-amber-300 text-amber-400'
  }

  const activeHover = hoverStyles[themeAccent] || hoverStyles['purple']
  const textAccents = {
    purple: 'text-purple-400 group-hover:text-purple-300',
    emerald: 'text-emerald-400 group-hover:text-emerald-300',
    amber: 'text-amber-400 group-hover:text-amber-300'
  }
  const activeTextAccent = textAccents[themeAccent] || textAccents['purple']

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
      {QUICK_QUESTIONS.map((q, idx) => {
        const IconComp = q.icon
        return (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q.text)}
            className="p-4.5 rounded-2xl glass-panel-interactive text-slate-300 flex flex-col gap-3.5 group relative overflow-hidden text-left"
          >
            <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-900 w-fit group-hover:bg-slate-900 group-hover:scale-105 transition-all duration-350`}>
              <IconComp className={`w-4.5 h-4.5 ${activeTextAccent}`} />
            </div>
            <div>
              <h4 className={`text-xs font-bold text-slate-200 transition-colors`}>
                {q.label}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {q.text}
              </p>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-500 absolute right-3 bottom-3 translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${activeTextAccent}`} />
          </button>
        )
      })}
    </div>
  )
}
