import React from 'react'
import { Sparkles, X, Server, HardDrive, Cpu, FileText, BookOpen, Terminal, UploadCloud, Loader2 } from 'lucide-react'

export default function Sidebar({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  backendStatus,
  documents = [],
  onUploadPDF,
  isUploading
}) {
  const fileInputRef = React.useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      onUploadPDF(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div 
      className={`${
        isSidebarOpen ? 'w-80' : 'w-0 pointer-events-none'
      } transition-all duration-300 ease-in-out flex flex-col h-full bg-[#0b1120]/60 border-r border-white/[0.08] backdrop-blur-xl z-20 overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/[0.06] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/30 shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-100 tracking-tight font-heading flex items-center gap-1.5">
              Lumina
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold">
                Engine
              </span>
            </h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">RAG Knowledge Hub</p>
          </div>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-white/[0.08] text-slate-400 hover:text-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Engine Parameters Card */}
      <div className="p-4 mx-4 my-4 rounded-2xl bg-[#0b1120] border border-white/[0.08] flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
          <div className="flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Engine Stats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              backendStatus === 'connected' ? 'bg-emerald-500 animate-pulse' :
              backendStatus === 'checking' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
            }`} />
            <span className="text-[10px] font-semibold tracking-wide capitalize text-slate-300">
              {backendStatus === 'connected' ? 'Active' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-white/[0.04] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <HardDrive className="w-3 h-3 text-purple-400" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">Store</span>
            </div>
            <span className="text-xs font-bold text-slate-300 font-heading">Chroma DB</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-white/[0.04] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">Model</span>
            </div>
            <span className="text-xs font-bold text-slate-300 font-heading">Mistral AI</span>
          </div>
        </div>
      </div>

      {/* Upload Document Widget */}
      <div className="px-4 mb-4 shrink-0">
        <div 
          onClick={isUploading ? undefined : triggerFileInput}
          className={`group relative p-4 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isUploading 
              ? 'border-purple-500/20 bg-purple-500/5 cursor-not-allowed animate-pulse' 
              : 'border-white/[0.08] bg-slate-900/20 hover:border-purple-500/40 hover:bg-purple-500/[0.02]'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf" 
            className="hidden" 
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                Parsing & Indexing...
              </span>
              <p className="text-[9px] text-slate-500">Creating embeddings in Chroma DB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 py-1.5">
              <div className="p-2 rounded-xl bg-slate-950/40 border border-white/[0.04] text-slate-400 group-hover:text-purple-400 group-hover:scale-105 transition-all">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10.5px] font-bold text-slate-200 group-hover:text-purple-300 transition-colors">
                  Upload PDF Document
                </span>
                <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or browse local files</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Knowledge Base Section */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5 px-2">
          Knowledge Base
        </h3>
        
        <div className="flex flex-col gap-3 pb-6">
          {documents.length === 0 ? (
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-slate-950/20 text-center flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 text-slate-600" />
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                No custom PDFs uploaded.<br />Upload a file to begin academic assistance.
              </p>
            </div>
          ) : (
            documents.map((doc, index) => {
              const isBook = doc.toLowerCase().includes("book") || doc.toLowerCase().includes("syllabus") || doc.toLowerCase().includes("curriculum");
              return (
                <div 
                  key={index}
                  className="p-3.5 rounded-2xl bg-[#0b1120] border border-white/[0.08] hover:border-purple-500/25 hover:shadow-lg hover:shadow-purple-500/[0.02] transition-all flex gap-3.5 items-start group cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                    {isBook ? <BookOpen className="w-4.5 h-4.5" /> : <FileText className="w-4.5 h-4.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-purple-300 transition-colors" title={doc}>
                      {doc.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <p className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                      Active Index
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Footer log details */}
      <div className="p-4 border-t border-white/[0.06] bg-slate-950/30 text-[9px] text-slate-500 text-center flex items-center justify-center gap-2 shrink-0">
        <Terminal className="w-3.5 h-3.5 text-slate-600" />
        <span>v2.0.0 • Local Chroma DB • Python API</span>
      </div>
    </div>
  )
}
