// RAG(Retrieval Augmented Generation) 도우미 함수들

export interface DocumentChunk {
  id: string
  content: string
  metadata: {
    section: string
    page?: number
  }
}

/**
 * Markdown 문서를 의미있는 청크로 분할하는 함수 (개선된 버전)
 */
export function splitMarkdownIntoChunks(markdown: string): DocumentChunk[] {
  const chunks: DocumentChunk[] = []
  
  // 페이지별로 먼저 분할
  const pageMatches = markdown.split(/## Page \d+/)
  
  pageMatches.forEach((pageContent, pageIndex) => {
    if (pageContent.trim() === '' || pageContent.startsWith('# house_campass')) return
    
    // 주요 섹션 분할 (번호가 있는 항목들과 한글 순서)
    const majorSections = pageContent.split(/(?=\d+\)|^\d+\))/m)
    
    majorSections.forEach((section, sectionIndex) => {
      const trimmedSection = section.trim()
      if (trimmedSection.length < 100) return // 너무 짧은 섹션은 제외
      
      // 섹션 제목 추출 (더 정확하게)
      const lines = trimmedSection.split('\n').filter(line => line.trim())
      let sectionTitle = '기타'
      
      // 번호가 있는 제목 찾기
      const titleLine = lines.find(line => /^\d+\)/.test(line.trim()))
      if (titleLine) {
        sectionTitle = titleLine.replace(/^\d+\)\s*/, '').trim()
      } else {
        // 첫 번째 의미있는 줄을 제목으로 사용
        const meaningfulLine = lines.find(line => 
          line.trim().length > 5 && !line.includes('**Table')
        )
        if (meaningfulLine) {
          sectionTitle = meaningfulLine.substring(0, 50).trim()
        }
      }
      
      // 내용이 충분히 길면 더 작은 청크로 분할
      if (trimmedSection.length > 1000) {
        const subSections = trimmedSection.split(/(?=[가-힣]\)|^\s*[가-힣]\))/m)
        
        subSections.forEach((subSection, subIndex) => {
          const trimmedSubSection = subSection.trim()
          if (trimmedSubSection.length < 50) return
          
          // 하위 섹션 제목 추출
          const subTitleMatch = trimmedSubSection.match(/^([가-힣]\))\s*(.+)/)
          const subTitle = subTitleMatch ? 
            `${sectionTitle} - ${subTitleMatch[2].split('\n')[0].trim()}` : 
            sectionTitle
          
          chunks.push({
            id: `page_${pageIndex}_section_${sectionIndex}_sub_${subIndex}`,
            content: trimmedSubSection,
            metadata: {
              section: subTitle,
              page: pageIndex + 1,
            },
          })
        })
      } else {
        chunks.push({
          id: `page_${pageIndex}_section_${sectionIndex}`,
          content: trimmedSection,
          metadata: {
            section: sectionTitle,
            page: pageIndex + 1,
          },
        })
      }
    })
  })
  
  return chunks.filter(chunk => chunk.content.length >= 50) // 최종 필터링
}

/**
 * 한국어 키워드 기반 유사도 계산 함수 (개선된 버전)
 */
export function calculateSimilarity(query: string, content: string): number {
  const queryWords = query
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, ' ') // 한국어와 영문, 숫자만 남김
    .split(/\s+/)
    .filter(word => word.length > 1) // 한 글자는 제외
  
  const contentWords = content
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, ' ')
    .split(/\s+/)
  
  let matchCount = 0
  let totalWords = queryWords.length
  
  // 정확한 매칭과 부분 매칭 모두 고려
  queryWords.forEach(queryWord => {
    let hasMatch = false
    
    // 정확한 매칭 (가중치 높음)
    if (contentWords.some(contentWord => contentWord === queryWord)) {
      matchCount += 1.0
      hasMatch = true
    }
    // 부분 매칭 (가중치 낮음)
    else if (contentWords.some(contentWord => 
      contentWord.includes(queryWord) || queryWord.includes(contentWord)
    )) {
      matchCount += 0.5
      hasMatch = true
    }
    
    // 동의어/관련어 매칭
    if (!hasMatch) {
      const synonyms = getSynonyms(queryWord)
      if (synonyms.some(synonym => 
        contentWords.some(contentWord => contentWord.includes(synonym))
      )) {
        matchCount += 0.3
      }
    }
  })
  
  return matchCount / totalWords
}

/**
 * 기숙사 관련 동의어 매핑
 */
function getSynonyms(word: string): string[] {
  const synonymMap: Record<string, string[]> = {
    '기숙사': ['생활관', '학사기숙사', '학사관', '하우스'],
    '생활관': ['기숙사', '학사기숙사', '학사관', '하우스'],
    '하우스': ['기숙사', '생활관', '학사기숙사'],
    '방': ['호실', '룸'],
    '호실': ['방', '룸'],
    '세탁': ['빨래', '세탁기'],
    '빨래': ['세탁', '세탁기'],
    '식당': ['매점', '식사', '밥'],
    '밥': ['식사', '식당', '급식'],
    '택배': ['배송', '배달', '소포'],
    '배달': ['택배', '배송', '배달음식'],
    '체육관': ['운동', '헬스', '헬스장'],
    '운동': ['체육관', '헬스', '헬스장', '피트니스'],
    '도서관': ['열람실', '공부', '독서실'],
    '공부': ['학습', '열람실', '독서실'],
    '프린터': ['인쇄', '출력', '복사'],
    '인쇄': ['프린터', '출력', '복사'],
    'wifi': ['와이파이', '인터넷', '무선'],
    '와이파이': ['wifi', '인터넷', '무선'],
    '인터넷': ['wifi', '와이파이', '무선', '네트워크'],
    '규칙': ['수칙', '규정', '벌점'],
    '수칙': ['규칙', '규정', '벌점'],
    '벌점': ['징계', '규칙', '수칙'],
  }
  
  return synonymMap[word] || []
}

/**
 * 사용자 질문과 관련된 문서 청크들을 검색하는 함수
 */
export function searchRelevantChunks(
  query: string,
  chunks: DocumentChunk[],
  topK: number = 3
): DocumentChunk[] {
  const scoredChunks = chunks.map(chunk => ({
    chunk,
    score: calculateSimilarity(query, chunk.content),
  }))
  
  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(item => item.score > 0.1) // 최소 유사도 임계값
    .map(item => item.chunk)
}

/**
 * 검색된 청크들을 컨텍스트로 포맷하는 함수
 */
export function formatContextFromChunks(chunks: DocumentChunk[]): string {
  if (chunks.length === 0) {
    return ''
  }
  
  return `다음은 GIST 생활관 안내서에서 관련된 내용들입니다:\n\n${chunks
    .map((chunk, index) => 
      `[${index + 1}] ${chunk.metadata.section}:\n${chunk.content}\n`
    )
    .join('\n---\n\n')}`
}