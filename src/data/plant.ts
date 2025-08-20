import { api } from '@/lib/api'
import type { PlantDto, CreateLogDto, CreateDiseaseLogDto } from '@/types/plant'

export const createPlant = async (): Promise<PlantDto> => {
  const response = await api.post<PlantDto>('/plant')
  return response.data
}

export const getPlant = async (id: string): Promise<PlantDto> => {
  const response = await api.get<PlantDto>(`/plant/${id}`)
  return response.data
}

export const createLog = async (
  id: string,
  data: CreateLogDto,
): Promise<PlantDto> => {
  const response = await api.post<PlantDto>(`/plant/${id}`, data)
  return response.data
}

export const createDiseaseLog = async (
  id: string,
  data: CreateDiseaseLogDto,
): Promise<PlantDto> => {
  const response = await api.post<PlantDto>(`/plant/disease/${id}`, data)
  return response.data
}
