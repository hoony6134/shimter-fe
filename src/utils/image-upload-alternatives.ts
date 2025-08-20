// 임시 대안: Cloudinary를 사용한 이미지 업로드
export const uploadToCloudinary = async (
  imageData: string,
): Promise<string> => {
  try {
    // Cloudinary 업로드 URL (실제 cloud_name을 설정해야 함)
    const cloudName = 'demo' // 실제 cloud name으로 변경 필요
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const formData = new FormData()
    formData.append('file', imageData)
    formData.append('upload_preset', 'unsigned_preset') // unsigned upload preset 필요

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary 업로드 중 오류:', error)
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}

// 임시 대안: 이미지를 Data URL로 그대로 사용 (테스트용)
export const getMockImageUrl = (imageData: string): Promise<string> => {
  return new Promise((resolve) => {
    // 실제로는 서버에서 지원하지 않겠지만,
    // 테스트를 위해 data URL을 반환
    resolve(imageData)
  })
}
