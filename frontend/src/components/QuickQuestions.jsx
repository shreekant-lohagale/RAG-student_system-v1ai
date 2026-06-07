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

export default function QuickQuestions({ onSelectQuestion }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
      {QUICK_QUESTIONS.map((q, idx) => {
        const IconComp = q.icon
        return (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q.text)}
            className="p-4 rounded-xl glass-interactive text-slate-300 flex flex-col gap-3 group relative overflow-hidden text-left"
          >
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-850 w-fit group-hover:border-purple-500/40 group-hover:bg-purple-950/20 transition-all">
              <IconComp className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors">
                {q.label}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {q.text}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 absolute right-3 bottom-3 translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        )
      })}
    </div>
  )
}
