import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { api } from '../lib/api'

export enum School {
  GIST = 'GIST',
  POSTECH = 'POSTECH',
  KAIST = 'KAIST',
  서울대학교 = 'SNU',
}

export enum VerifyStatus {
  VERIFIED = 'VERIFIED',
  AWAIT = 'AWAIT',
  NONE = 'NONE',
}

export interface GetUserResponse {
  id: number
  email: string
  name: string
  nickname: string
  school: School
  number: string
  isAdmin: boolean
  verifyStatus: VerifyStatus
  createdAt: string
  updatedAt: string
}

export const getUser = async (): Promise<GetUserResponse | undefined> => {
  try {
    const response = await api.get<GetUserResponse>('/user')

    return response.data
  } catch (error) {
    console.error('Failed to get user:', error)

    if (error instanceof Response) {
      toast.error(
        '사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.',
        {
          description: `Status: ${error.statusText || error.status}`,
        },
      )
    } else if (isAxiosError(error)) {
      toast.error('사용자 정보를 가져오는 데 실패했습니다.', {
        description: error.message,
      })
    } else {
      toast.error('사용자 정보를 가져오는 데 실패했습니다.', {
        description: '알 수 없는 오류가 발생했습니다.',
      })
    }
  }
}
