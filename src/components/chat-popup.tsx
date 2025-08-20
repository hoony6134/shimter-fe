import { X, Send, Trash2 } from 'lucide-react'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

import { useGeminiChat, type Message } from '../hooks/use-gemini-chat'

interface ChatPopupProps {
  isOpen: boolean
  onClose: () => void
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('')
  const [dimensions, setDimensions] = useState({ width: 320, height: 384 }) // 80*4=320, 96*4=384
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const { messages, isLoading, error, sendMessage, clearMessages } =
    useGeminiChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 리사이즈 핸들러
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height,
    })
  }

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const deltaX = resizeStart.x - e.clientX
      const deltaY = resizeStart.y - e.clientY

      const newWidth = Math.max(280, resizeStart.width + deltaX)
      const newHeight = Math.max(300, resizeStart.height + deltaY)

      setDimensions({ width: newWidth, height: newHeight })
    },
    [
      isResizing,
      resizeStart.x,
      resizeStart.y,
      resizeStart.width,
      resizeStart.height,
    ],
  )

  const handleResizeEnd = () => {
    setIsResizing(false)
  }

  // 리사이즈 이벤트 리스너
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)
      document.body.style.cursor = 'nw-resize'
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', handleResizeMove)
        document.removeEventListener('mouseup', handleResizeEnd)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isResizing, dimensions.width, dimensions.height, handleResizeMove])

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    await sendMessage(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-28 right-8 md:bottom-32 md:right-12 z-50">
      {/* 채팅 팝업 */}
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 relative"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          minWidth: '280px',
          minHeight: '300px',
        }}
      >
        {/* 리사이즈 핸들 */}
        <div
          className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize hover:bg-gray-100 rounded-tl-lg flex items-center justify-center group transition-colors"
          onMouseDown={handleResizeStart}
          title="크기 조정"
        >
          {/* 점 3개로 구성된 리사이즈 핸들 */}
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
            <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
          </div>
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2 ml-4">
            <img
              src="/logo.png"
              alt="Chat"
              className="h-6 w-6 object-contain"
            />
            <h3 className="font-semibold text-gray-800">Campass Chat</h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={clearMessages}
              className="p-1 hover:bg-gray-100 rounded text-gray-500"
              title="대화 내용 지우기"
              aria-label="대화 내용 지우기"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded text-gray-500"
              aria-label="채팅 창 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>
                안녕하세요! 우리 학교 생활이 궁금한가요?
                <br />
                언제든지 Campass한테 물어보세요!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                popupWidth={dimensions.width}
              />
            ))
          )}

          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span>열심히 대답을 준비하고 있어요..</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="border-t p-3">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-white rounded-xl border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:shadow-sm transition-all flex items-center">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
                className="w-full resize-none bg-transparent px-4 py-2.5 pr-12 focus:outline-none placeholder-gray-400 text-sm leading-5"
                rows={1}
                disabled={isLoading}
                style={{ minHeight: '20px', maxHeight: '80px' }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors p-1"
                aria-label="메시지 전송"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const MessageBubble: React.FC<{ message: Message; popupWidth: number }> = ({
  message,
  popupWidth,
}) => {
  const isUser = message.role === 'user'
  // 팝업 너비에 따른 최대 너비 계산 (패딩 고려)
  const maxWidth = Math.min(popupWidth - 64, 320) // 64px는 좌우 패딩

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-3 py-2 rounded-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-teal-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <div className="prose prose-sm max-w-none">
          {isUser ? (
            <p className="whitespace-pre-wrap break-words m-0 font-semibold">
              {message.content}
            </p>
          ) : (
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                p: ({ children }) => (
                  <p className="m-0 mb-2 last:mb-0">{children}</p>
                ),
                code: ({ children, className }) => {
                  const isInline = !className
                  return isInline ? (
                    <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-800 text-white p-2 rounded text-sm font-mono overflow-x-auto">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-800 text-white p-2 rounded text-sm overflow-x-auto m-0 mb-2">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="m-0 mb-2 pl-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="m-0 mb-2 pl-4">{children}</ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                h1: ({ children }) => (
                  <h1 className="text-lg font-bold m-0 mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-bold m-0 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-bold m-0 mb-2">{children}</h3>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <p
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default ChatPopup
