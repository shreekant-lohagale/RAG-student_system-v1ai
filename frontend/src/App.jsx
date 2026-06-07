import { useState, useEffect, useRef } from 'react'
import { Bot } from 'lucide-react'
import './App.css'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import WelcomeCard from './components/WelcomeCard'
import QuickQuestions from './components/QuickQuestions'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import CitationsDrawer from './components/CitationsDrawer'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [activeSources, setActiveSources] = useState([])
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isCitationsOpen, setIsCitationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Theme accent state: 'purple' | 'emerald' | 'amber'
  const [themeAccent, setThemeAccent] = useState('purple')

  const scrollContainerRef = useRef(null)

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
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

      // Store matching sources
      if (data.sources && data.sources.length > 0) {
        setActiveSources(data.sources)
        setSelectedMessageId(aiMessageId)
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

  // Glow sphere classes according to theme accent
  const glowClasses = {
    purple: {
      sphere1: 'bg-purple-900/10',
      sphere2: 'bg-blue-900/10'
    },
    emerald: {
      sphere1: 'bg-emerald-900/10',
      sphere2: 'bg-teal-900/10'
    },
    amber: {
      sphere1: 'bg-amber-900/10',
      sphere2: 'bg-orange-900/10'
    }
  }

  const currentGlows = glowClasses[themeAccent] || glowClasses['purple']

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#030712] text-slate-100 font-sans z-50">
      
      {/* BACKGROUND MESH GRADIENT EFFECTS */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ${currentGlows.sphere1} blur-[120px] pointer-events-none animate-glow-1`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ${currentGlows.sphere2} blur-[120px] pointer-events-none animate-glow-2`} />

      {/* LEFT SIDEBAR: Document Workspace */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        backendStatus={backendStatus} 
      />

      {/* MAIN CHAT INTERFACE CONTAINER */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden bg-slate-950/20 hero-glow">
        
        {/* Chat Header */}
        <Header 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          themeAccent={themeAccent}
          setThemeAccent={setThemeAccent}
        />

        {/* Scrollable Messages Pane */}
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-6">
          {filteredMessages.length === 0 ? (
            <div className="max-w-3xl mx-auto flex flex-col justify-center h-full min-h-[70vh]">
              {/* Welcome Card */}
              <WelcomeCard />
              
              {/* Quick Questions Grid */}
              <QuickQuestions 
                onSelectQuestion={handleQuickQuestion} 
                themeAccent={themeAccent}
              />
            </div>
          ) : (
            /* Render Conversation Messages */
            <div className="max-w-3xl mx-auto space-y-6">
              {filteredMessages.map((msg) => (
                <ChatMessage 
                  key={msg.id}
                  msg={msg}
                  selectedMessageId={selectedMessageId}
                  onMessageClick={handleMessageClick}
                  themeAccent={themeAccent}
                />
              ))}

              {/* AI Typing Indicator */}
              {isLoading && (
                <div className="flex gap-4 items-start justify-start">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 shadow-md ${themeAccent === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' : themeAccent === 'amber' ? 'text-amber-400 bg-amber-500/10 border-amber-500/25' : 'text-purple-400 bg-purple-500/10 border-purple-500/25'}`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="glass-panel border border-white/[0.08] rounded-3xl rounded-tl-none px-5 py-4 flex items-center gap-1.5 bg-slate-900/10">
                    <span className={`w-2 h-2 rounded-full dot-pulse ${themeAccent === 'emerald' ? 'bg-emerald-500' : themeAccent === 'amber' ? 'bg-amber-500' : 'bg-purple-500'}`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-2 h-2 rounded-full dot-pulse ${themeAccent === 'emerald' ? 'bg-emerald-500' : themeAccent === 'amber' ? 'bg-amber-500' : 'bg-purple-500'}`} style={{ animationDelay: '200ms' }} />
                    <span className={`w-2 h-2 rounded-full dot-pulse ${themeAccent === 'emerald' ? 'bg-emerald-500' : themeAccent === 'amber' ? 'bg-amber-500' : 'bg-purple-500'}`} style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Input area */}
        <ChatInput 
          input={input}
          setInput={setInput}
          onSubmit={handleSend}
          isLoading={isLoading}
          themeAccent={themeAccent}
        />
      </div>

      {/* RIGHT PANEL: CITATIONS DRAWER */}
      <CitationsDrawer 
        isOpen={isCitationsOpen}
        setIsOpen={setIsCitationsOpen}
        sources={activeSources}
        themeAccent={themeAccent}
      />

    </div>
  )
}

export default App
