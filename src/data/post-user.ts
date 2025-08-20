import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { api } from '../lib/api'

export interface PostUserRequest {
  email: string
  password: string
  name: string
  phoneNumber: string
  deviceId: string
}
export interface PostUserResponse {
  id: string
  email: string
  name: string
  password: string
  phoneNumber: string
  deviceId: string
}

export const postUser = async (signupData: PostUserRequest) => {
  try {
    const response = await api.post<PostUserResponse>('/user/join', signupData)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message || 'An error occurred')
    }
    throw error
  }
}
