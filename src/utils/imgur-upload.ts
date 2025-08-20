export interface ImgurUploadResponse {
  success: boolean
  status: number
  data: {
    id: string
    title: string | null
    description: string | null
    datetime: number
    type: string
    animated: boolean
    width: number
    height: number
    size: number
    views: number
    bandwidth: number
    vote: string | null
    favorite: boolean
    nsfw: string | null
    section: string | null
    account_url: string | null
    account_id: number
    is_ad: boolean
    in_most_viral: boolean
    has_sound: boolean
    tags: string[]
    ad_type: number
    ad_url: string
    edited: string
    in_gallery: boolean
    deletehash: string
    name: string
    link: string
  }
}

export const uploadToImgur = async (imageData: string): Promise<string> => {
  // base64 데이터에서 데이터 URL 헤더 제거
  const base64Data = imageData.split(',')[1]

  const formData = new FormData()
  formData.append('image', base64Data)
  formData.append('type', 'base64')

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ImgurUploadResponse = await response.json()

    if (result.success) {
      return result.data.link
    } else {
      throw new Error('Imgur 업로드에 실패했습니다.')
    }
  } catch (error) {
    console.error('Imgur 업로드 중 오류:', error)
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}
