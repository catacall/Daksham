'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, ArrowRight } from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
  actions?: Array<{ label: string; action: string }>
}

export default function ChatbotDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome',
            sender: 'bot',
            text: 'Welcome to Daksham Developers. I am your Private Advisory Assistant. How can I guide your real-estate journey today?',
            timestamp: new Date(),
            actions: [
              { label: 'Check Project Status', action: 'status' },
              { label: 'Get WhatsApp Contact', action: 'whatsapp' },
              { label: 'Submit An Enquiry', action: 'enquiry' },
            ],
          },
        ])
      }
    }

    window.addEventListener('open-chatbot', handleOpen)
    return () => window.removeEventListener('open-chatbot', handleOpen)
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addMessage = (sender: 'user' | 'bot', text: string, actions?: Message['actions']) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender,
        text,
        timestamp: new Date(),
        actions,
      },
    ])
  }

  const handleActionClick = (action: string) => {
    let userText = ''
    if (action === 'status') userText = 'Check Project Status'
    else if (action === 'whatsapp') userText = 'Get WhatsApp Contact'
    else if (action === 'enquiry') userText = 'Submit An Enquiry'
    else if (action === 'view_ongoing') userText = 'View Ongoing Developments'
    else if (action === 'view_delivered') userText = 'View Delivered Landmarks'
    else if (action === 'go_whatsapp') userText = 'Open WhatsApp Advisor Chat'
    else if (action === 'go_call') userText = 'Request Advisory Phone Line'
    else if (action === 'go_enquiry') userText = 'Load Registration Card'

    addMessage('user', userText)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      if (action === 'status') {
        addMessage(
          'bot',
          'Here is the status of our current luxurious developments:\n\n Ongoing construction: \n• Sai World City (Panvel, Navi Mumbai) — 2, 3 & 4 BHK Luxury Condos\n• Sai World Empire (Kharghar, Navi Mumbai) — 3 & 4 BHK Neo-Classical Homes\n\nSuccessfully Delivered:\n• Paradise Mall (Kharghar, Navi Mumbai) — Ultra-Premium Highstreet Retail\n• Sai World Legend (Dombivli, Thane) — Premium Residential Towers\n• Sai World Dreams (Dombivli, Thane) — Highstreet & Multiplex Hub',
          [
            { label: 'View Ongoing Projects', action: 'view_ongoing' },
            { label: 'View Delivered Projects', action: 'view_delivered' },
          ]
        )
      } else if (action === 'whatsapp') {
        addMessage(
          'bot',
          'You can connect directly with our advisory desk on WhatsApp for instant project brochures, unit floor plans, and pricing options.',
          [
            { label: 'Open WhatsApp Chat', action: 'go_whatsapp' },
            { label: 'Call advisory desk', action: 'go_call' },
          ]
        )
      } else if (action === 'enquiry') {
        addMessage(
          'bot',
          'I have prepared our Private Advisory Form. Click below to launch the enquiry card, and our relationship manager will reach out within 24 hours.',
          [{ label: 'Open Enquiry Form', action: 'go_enquiry' }]
        )
      } else if (action === 'view_ongoing') {
        window.location.href = '/projects/ongoing'
        addMessage('bot', 'Redirecting you to our ongoing developments page...')
      } else if (action === 'view_delivered') {
        window.location.href = '/projects/delivered'
        addMessage('bot', 'Redirecting you to our delivered landmarks page...')
      } else if (action === 'go_whatsapp') {
        window.open('https://wa.me/1234567890', '_blank')
        addMessage('bot', 'Opening WhatsApp. How else can I assist you?')
      } else if (action === 'go_call') {
        window.location.href = 'tel:+1234567890'
        addMessage('bot', 'Dialing phone number...')
      } else if (action === 'go_enquiry') {
        setIsOpen(false)
        window.dispatchEvent(new CustomEvent('open-enquiry-modal'))
      }
    }, 1000)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    const userText = inputValue.trim()
    addMessage('user', userText)
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const text = userText.toLowerCase()

      if (text.includes('status') || text.includes('project') || text.includes('ongoing') || text.includes('delivered')) {
        addMessage(
          'bot',
          'Here is the current status of our key projects:\n\n• Sai World City (Panvel) — Ongoing\n• Sai World Empire (Kharghar) — Ongoing\n• Paradise Mall (Kharghar) — Delivered\n• Sai World Legend (Dombivli) — Delivered\n• Sai World Dreams (Dombivli) — Delivered',
          [
            { label: 'Check details', action: 'status' },
            { label: 'Contact WhatsApp', action: 'whatsapp' },
          ]
        )
      } else if (text.includes('whatsapp') || text.includes('chat') || text.includes('number') || text.includes('phone') || text.includes('call') || text.includes('contact')) {
        addMessage(
          'bot',
          'You can contact us via:\n• WhatsApp: +1234567890\n• Phone Support: +1234567890\n• Email Support: contact@paradisegroup.com',
          [
            { label: 'Open WhatsApp', action: 'go_whatsapp' },
            { label: 'Call us', action: 'go_call' },
          ]
        )
      } else if (text.includes('enquiry') || text.includes('form') || text.includes('submit') || text.includes('book') || text.includes('pricing') || text.includes('cost') || text.includes('price')) {
        addMessage(
          'bot',
          'To receive detailed cost sheets and layouts, please fill out our quick enquiry form.',
          [{ label: 'Open Enquiry Form', action: 'go_enquiry' }]
        )
      } else {
        addMessage(
          'bot',
          "Thank you for reaching out. I'm a specialized real-estate advisor assistant. You can check our project status, contact us directly via WhatsApp, or submit a custom advisory request.",
          [
            { label: 'Check Project Status', action: 'status' },
            { label: 'WhatsApp Chat', action: 'whatsapp' },
            { label: 'Advisory Form', action: 'enquiry' },
          ]
        )
      }
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-navy text-white z-50 shadow-2xl border-l border-white/10 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-navy-light">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gold rounded-full flex items-center justify-center text-navy">
                  <Bot size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg tracking-wider text-white">
                    Private Advisor
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-sans text-emerald-400 font-bold uppercase tracking-wider">
                      Online Support
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-cyan transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={24} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col max-w-[85%] ${
                    message.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <span className="text-[9px] font-sans text-muted mb-1.5 uppercase tracking-wider font-semibold">
                    {message.sender === 'bot' ? 'Advisory Desk' : 'You'} •{' '}
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <div
                    className={`rounded-2xl px-4 py-3.5 text-sm font-sans whitespace-pre-wrap leading-relaxed shadow-sm border ${
                      message.sender === 'user'
                        ? 'bg-gold text-navy border-gold font-semibold rounded-tr-none'
                        : 'bg-navy-light text-white/90 border-white/5 rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>

                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3.5">
                      {message.actions.map((act, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(act.action)}
                          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-bold bg-white/5 border border-white/15 hover:border-cyan hover:text-cyan rounded-lg text-white/70 transition-all cursor-pointer hover:bg-white/10"
                        >
                          {act.label}
                          <ArrowRight size={12} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex flex-col items-start max-w-[80%]">
                  <span className="text-[9px] font-sans text-muted mb-1.5 uppercase tracking-wider font-semibold">
                    Advisory Desk is typing...
                  </span>
                  <div className="bg-navy-light border border-white/5 text-white/90 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-navy-light">
              <div className="flex gap-2 bg-navy border border-white/15 rounded-xl p-2.5 focus-within:border-cyan transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask advisor about pricing, projects..."
                  className="flex-1 bg-transparent text-sm text-white font-sans focus:outline-hidden pl-2"
                />
                <button
                  onClick={handleSend}
                  className="h-9 w-9 bg-gold hover:bg-gold-light text-navy rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
