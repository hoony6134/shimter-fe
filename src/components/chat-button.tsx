import { IconX } from '@tabler/icons-react'
import { useState } from 'react'

import ChatPopup from './chat-popup'

function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="채팅 열기"
      >
        {isOpen ? (
          <IconX size={24} />
        ) : (
          <img src="/logo.png" alt="Chat" className="h-8 object-contain" />
        )}
      </button>

      <ChatPopup isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </>
  )
}

export default ChatButton
