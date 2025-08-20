export interface LogDto {
  description: string
  createdAt: string
}

export interface DiseaseLogDto {
  disease: string
  description: string
  createdAt: string
  overcome: boolean
}

export interface PlantDto {
  id: string
  logs: LogDto[]
  diseaseLogs: DiseaseLogDto[]
}

export interface CreateLogDto {
  description: string
}

export interface CreateDiseaseLogDto {
  disease: string
  description: string
}
