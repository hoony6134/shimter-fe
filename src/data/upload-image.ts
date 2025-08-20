import api from '../lib/api'

export interface ImageUploadResponse {
  url: string
}

// Base64를 Blob으로 변환하는 유틸리티 함수
const base64ToBlob = (
  base64Data: string,
  contentType: string = 'image/jpeg',
): Blob => {
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

export const uploadImageToServer = async (
  imageData: string,
): Promise<string> => {
  try {
    // base64 데이터에서 데이터 URL 헤더 제거
    const base64Data = imageData.split(',')[1]

    // Base64를 Blob으로 변환
    const blob = base64ToBlob(base64Data, 'image/jpeg')

    // FormData 생성
    const formData = new FormData()
    formData.append('image', blob, `crop_image_${Date.now()}.jpg`)

    const response = await api.post<ImageUploadResponse>('/ai', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.url
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error)
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}
