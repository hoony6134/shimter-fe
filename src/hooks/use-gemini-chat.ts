import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState, useEffect } from 'react'
import {
  type DocumentChunk,
  splitMarkdownIntoChunks,
  searchRelevantChunks,
  formatContextFromChunks,
} from '../utils'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const useGeminiChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [documentChunks, setDocumentChunks] = useState<DocumentChunk[]>([])

  // 문서 로드 및 청크 분할
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const response = await fetch('/data/house_campass.md')
        const markdown = await response.text()
        const chunks = splitMarkdownIntoChunks(markdown)
        setDocumentChunks(chunks)
      } catch (err) {
        console.error('문서 로드 실패:', err)
      }
    }

    loadDocument()
  }, [])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error(
          'Gemini API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.',
        )
      }

      // RAG: 관련된 문서 청크 검색
      const relevantChunks = searchRelevantChunks(content, documentChunks, 3)
      const context = formatContextFromChunks(relevantChunks)

      // 컨텍스트가 있으면 질문에 추가
      const enrichedContent = context
        ? `${context}\n\n사용자 질문: ${content}`
        : content

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: `너는 Campass의 AI 챗봇이야. 사용자 질문에 친절하게 답변해줘. 
          
          주요 역할:
          1. GIST 대학생활관(기숙사)에 대한 정보를 제공하는 전문 챗봇
          2. 제공된 생활관 안내서 내용을 바탕으로 정확한 정보 제공
          3. 생활관 시설, 규칙, 이용방법 등에 대한 질문에 상세히 답변
          4. 학교 생활에 대한 일반적인 조언과 도움 제공
          
          응답 방식:
          - 언제나 존댓말 사용
          - 제공된 문서 정보를 바탕으로 정확하고 구체적인 답변 제공
          - 문서에 없는 내용은 일반적인 조언으로 도움을 주되, 확실하지 않다고 명시
          - 친근하고 도움이 되는 톤으로 답변
          
          만약 제공된 문서에서 관련 정보를 찾을 수 있다면, 그 정보를 활용해서 답변해줘.`,
      })

      // Streaming response
      const streamResult = await model.generateContentStream(enrichedContent)

      // Create a placeholder assistant message to stream into
      const assistantId = crypto.randomUUID()
      const startTimestamp = new Date()
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: startTimestamp,
        },
      ])

      try {
        for await (const chunk of streamResult.stream) {
          const chunkText = chunk.text()
          if (!chunkText) continue
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunkText }
                : m,
            ),
          )
        }

        // Ensure we end with the aggregated final text (just in case)
        const aggregated = await streamResult.response
        const finalText = aggregated.text()
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: finalText } : m,
          ),
        )
      } catch (streamErr) {
        // If streaming fails mid-way, annotate the assistant message and surface error
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    m.content + '\n\n(응답 스트리밍 중 오류가 발생했습니다.)',
                }
              : m,
          ),
        )
        throw streamErr
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    setError(null)
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    documentChunks, // RAG 관련 상태도 노출
  }
}
