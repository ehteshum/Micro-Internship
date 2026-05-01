import { useState } from 'react'
import { MessageCircle, X, Sparkles, Send } from 'lucide-react'

const starterMessages = [
  { text: 'Hi! I am the InternX Assistant. Ask me about internships, workspace, or applications.', sender: 'bot' },
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(starterMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { text: trimmed, sender: 'user' }])
    setInput('')

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'This is a demo AI response. I can help you navigate the platform or explain the workflow.', sender: 'bot' },
      ])
    }, 450)
  }

  const handleQuickPrompt = (prompt) => {
    setInput(prompt)
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-sky-500/30 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-3xl border border-white/50 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/85">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3 dark:border-slate-800/70">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="font-['Outfit'] text-sm font-semibold text-slate-900 dark:text-slate-100">InternX Assistant</h2>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Demo AI guide for the platform</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Online
            </span>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200/70 px-4 py-3 dark:border-slate-800/70">
            <div className="mb-3 flex flex-wrap gap-2">
              {['How do I apply?', 'Show workspace help', 'Mentor support?'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <button
                onClick={handleSend}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white transition hover:scale-105 hover:shadow-lg"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
