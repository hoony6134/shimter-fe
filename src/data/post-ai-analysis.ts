import api from '../lib/api'

export interface AIAnalysisRequest {
  url: string
}

export interface AIAnalysisResponse {
  class:
    | 'normal'
    | 'temp-humid'
    | 'unripe'
    | 'disease_powdery'
    | 'disease_intonsa'
    | 'disease_latus'
  confidence: string
}

export const postAIAnalysis = async (
  data: AIAnalysisRequest,
): Promise<AIAnalysisResponse> => {
  const response = await api.post<AIAnalysisResponse>('/ai', data)
  return response.data
}
