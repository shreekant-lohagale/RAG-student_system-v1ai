import { useState, useEffect, useRef } from 'react'
import { Bot } from 'lucide-react'
import './App.css'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import QuickQuestions from './components/QuickQuestions'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import CitationsDrawer from './components/CitationsDrawer'

const BACKEND_URL = 'http://127.0.0.1:8000'

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
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        backendStatus={backendStatus} 
      />

      {/* MAIN CHAT INTERFACE CONTAINER */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden bg-slate-950">
        
        {/* Chat Header */}
        <Header 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Messages Pane */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-6">
          {filteredMessages.length === 1 && (
            <div className="max-w-3xl mx-auto mb-8 text-center mt-6">
              <h2 className="text-2xl font-bold font-heading text-slate-100 mb-2">How can I assist your study today?</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Ask queries about specific courses, course credits, core concepts, algorithms, or Goodfellow chapters.
              </p>
              
              {/* Quick Questions Grid */}
              <QuickQuestions onSelectQuestion={handleQuickQuestion} />
            </div>
          )}

          {/* Render Messages */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredMessages.map((msg) => (
              <ChatMessage 
                key={msg.id}
                msg={msg}
                selectedMessageId={selectedMessageId}
                onMessageClick={handleMessageClick}
              />
            ))}

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
        <ChatInput 
          input={input}
          setInput={setInput}
          onSubmit={handleSend}
          isLoading={isLoading}
        />
      </div>

      {/* RIGHT PANEL: CITATIONS DRAWER */}
      <CitationsDrawer 
        isOpen={isCitationsOpen}
        setIsOpen={setIsCitationsOpen}
        sources={activeSources}
      />

    </div>
  )
}

export default App
