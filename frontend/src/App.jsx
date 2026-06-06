import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  BookOpen, 
  Terminal, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  Search, 
  Menu, 
  X,
  FileCheck,
  Cpu,
  Clock,
  Compass
} from 'lucide-react'
import './App.css'

const BACKEND_URL = 'http://127.0.0.1:8000'

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

function App() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am **Lumina Academic AI**, your specialized research assistant. I have indexed your academic syllabus and Ian Goodfellow's **Deep Learning** textbook. \n\nAsk me anything about these materials and I'll retrieve the exact information with sources.",
      sources: []
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [activeSources, setActiveSources] = useState([])
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isCitationsOpen, setIsCitationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const messagesEndRef = useRef(null)

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  // Check Backend Status on load
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/status`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setBackendStatus('connected')
        } else {
          setBackendStatus('warning')
        }
      })
      .catch(() => {
        setBackendStatus('disconnected')
      })
  }, [])

  const handleSend = async (textToSend) => {
    const queryText = textToSend || input
    if (!queryText.trim()) return

    const userMessageId = `user-${Date.now()}`
    const aiMessageId = `ai-${Date.now()}`

    // Append user message
    setMessages(prev => [
      ...prev,
      {
        id: userMessageId,
        role: 'user',
        content: queryText
      }
    ])

    if (!textToSend) {
      setInput('')
    }
    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryText })
      })

      if (!response.ok) {
        throw new Error('Failed to retrieve response from server.')
      }

      const data = await response.json()

      // Append assistant response
      setMessages(prev => [
        ...prev,
        {
          id: aiMessageId,
          role: 'assistant',
          content: data.response,
          sources: data.sources || []
        }
      ])

      // Auto-select and show sources if present
      if (data.sources && data.sources.length > 0) {
        setActiveSources(data.sources)
        setSelectedMessageId(aiMessageId)
        setIsCitationsOpen(true)
      } else {
        setIsCitationsOpen(false)
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ **Error connecting to assistant:** ${error.message}. Please ensure the FastAPI backend is running.`,
          sources: []
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleMessageClick = (msg) => {
    if (msg.role === 'assistant' && msg.sources && msg.sources.length > 0) {
      setActiveSources(msg.sources)
      setSelectedMessageId(msg.id)
      setIsCitationsOpen(true)
    }
  }

  const handleQuickQuestion = (text) => {
    handleSend(text)
  }

  // Filter messages if search query exists
  const filteredMessages = messages.filter(msg => 
    searchQuery === '' || msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

      {/* LEFT SIDEBAR: Document Workspace */}
      <div 
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0 pointer-events-none'
        } transition-all duration-300 ease-in-out flex flex-col h-full bg-slate-900/40 border-r border-slate-800/80 backdrop-blur-md z-20`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-100 tracking-tight font-heading">Lumina AI</h2>
              <p className="text-xs text-purple-400/80 font-medium">Academic RAG Hub</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Database Status Panel */}
        <div className="p-4 mx-4 my-4 rounded-xl glass-interactive flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Connection status</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                backendStatus === 'connected' ? 'bg-emerald-500 animate-pulse' :
                backendStatus === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
              }`} />
              <span className="text-xs font-medium capitalize">
                {backendStatus === 'connected' ? 'Connected' : 
                 backendStatus === 'checking' ? 'Checking...' : 'Offline'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Chroma Vector Store Active</span>
          </div>
        </div>

        {/* Indexed Documents Section */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-2">
            Indexed Corpus
          </h3>
          <div className="flex flex-col gap-2">
            <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700/80 transition-all flex gap-3 items-start">
              <FileText className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-medium text-slate-200 line-clamp-1">Third Year -AIML_Syllabus.pdf</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Syllabus Curriculum</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700/80 transition-all flex gap-3 items-start">
              <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-medium text-slate-200 line-clamp-1">Deep Learning Ian Goodfellow.pdf</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Core textbook • 19.3 MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Footer */}
        <div className="p-4 border-t border-slate-800/40 text-[10px] text-slate-500 text-center flex items-center justify-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>v1.0.0 • Python FastAPI • React</span>
        </div>
      </div>

      {/* MAIN CHAT INTERFACE CONTAINER */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden bg-slate-950">
        
        {/* Chat Header */}
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-purple-400 transition-all"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-bold text-slate-100 font-heading tracking-wide flex items-center gap-2">
                Lumina Workspace 
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 font-medium tracking-normal">
                  RAG Assistant
                </span>
              </h1>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-64 hidden sm:block">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search chat history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl py-1.5 pl-9 pr-4 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </header>

        {/* Scrollable Messages Pane */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-6">
          {filteredMessages.length === 1 && (
            <div className="max-w-3xl mx-auto mb-8 text-center mt-6">
              <h2 className="text-2xl font-bold font-heading text-slate-100 mb-2">How can I assist your study today?</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Ask queries about specific courses, course credits, core concepts, algorithms, or Goodfellow chapters.
              </p>
              
              {/* Quick Questions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
                {QUICK_QUESTIONS.map((q, idx) => {
                  const IconComp = q.icon
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.text)}
                      className="p-4 rounded-xl glass-interactive text-slate-300 flex flex-col gap-3 group relative overflow-hidden text-left"
                    >
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-850 w-fit group-hover:border-purple-500/40 group-hover:bg-purple-950/20 transition-all">
                        <IconComp className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors">{q.label}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{q.text}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 absolute right-3 bottom-3 translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Render Messages */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredMessages.map((msg) => {
              const isUser = msg.role === 'user'
              const hasSources = msg.sources && msg.sources.length > 0
              const isSelected = selectedMessageId === msg.id

              return (
                <div 
                  key={msg.id}
                  onClick={() => handleMessageClick(msg)}
                  className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} ${
                    hasSources ? 'cursor-pointer group' : ''
                  }`}
                >
                  {/* Left Avatar for Bot */}
                  {!isUser && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 border border-purple-400/20 shadow-lg shadow-purple-500/10">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] rounded-2xl px-4.5 py-3.5 shadow-md transition-all ${
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
            })}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 border border-purple-400/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="glass border border-slate-800/80 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1 bg-slate-900/20">
                  <span className="w-2 h-2 bg-purple-500 rounded-full dot-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-purple-500 rounded-full dot-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-purple-500 rounded-full dot-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input area */}
        <footer className="p-4 md:p-6 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto">
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="relative flex items-center"
            >
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
      </div>

      {/* RIGHT PANEL: CITATIONS DRAWER */}
      <div 
        className={`${
          isCitationsOpen && activeSources.length > 0 ? 'w-96' : 'w-0'
        } transition-all duration-300 ease-in-out flex flex-col h-full bg-slate-900/30 border-l border-slate-800/60 backdrop-blur-md z-20 overflow-hidden relative`}
      >
        <div className="p-5 border-b border-slate-800/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-purple-400" />
            <h2 className="font-bold text-sm text-slate-200 font-heading">Document Citations</h2>
          </div>
          <button 
            onClick={() => setIsCitationsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Source cards container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeSources.map((src, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-purple-500/20 transition-all flex flex-col gap-2.5 relative group"
            >
              <div className="absolute top-2.5 right-2.5 text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-purple-400 font-semibold">
                Match #{index + 1}
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <div className="max-w-[70%]">
                  <h4 className="text-xs font-bold text-slate-300 truncate" title={src.metadata.source}>
                    {src.metadata.source}
                  </h4>
                  <p className="text-[9px] text-slate-500">Page {src.metadata.page || 'N/A'}</p>
                </div>
              </div>

              <div className="text-[11px] leading-relaxed text-slate-400 border-t border-slate-850 pt-2 bg-slate-900/20 rounded p-1.5 line-clamp-6 select-text">
                {src.content}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default App
