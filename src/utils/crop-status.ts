export type CropStatus =
  | 'normal'
  | 'temp-humid'
  | 'unripe'
  | 'disease_powdery'
  | 'disease_intonsa'
  | 'disease_latus'

export interface CropStatusInfo {
  label: string
  description: string
  severity: 'good' | 'warning' | 'danger'
  color: string
  bgColor: string
  icon: string
  recommendation: string
}

export const getCropStatusInfo = (status: CropStatus): CropStatusInfo => {
  const statusMap: Record<CropStatus, CropStatusInfo> = {
    normal: {
      label: '정상',
      description: '작물이 건강한 상태입니다',
      severity: 'good',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      icon: '✅',
      recommendation: '현재 상태를 유지하세요. 정기적인 관찰을 계속해주세요.',
    },
    'temp-humid': {
      label: '온습도 문제',
      description: '온도나 습도에 문제가 있습니다',
      severity: 'warning',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      icon: '🌡️',
      recommendation:
        '온습도 조절이 필요합니다. 환기를 늘리거나 온도 조절을 해주세요.',
    },
    unripe: {
      label: '안익은 과실',
      description: '아직 익지 않은 과실입니다',
      severity: 'warning',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      icon: '🟡',
      recommendation: '더 익을 때까지 기다려주세요. 며칠 후 다시 확인해보세요.',
    },
    disease_powdery: {
      label: '흰가루병',
      description: '흰가루병 증상이 감지되었습니다',
      severity: 'danger',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      icon: '🦠',
      recommendation:
        '즉시 살균제를 처리하고 환기를 개선해주세요. 전문가 상담을 받으시길 권합니다.',
    },
    disease_intonsa: {
      label: '대만총채벌레',
      description: '대만총채벌레 피해가 감지되었습니다',
      severity: 'danger',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      icon: '🐛',
      recommendation: '즉시 적절한 살충제를 사용하고 방제 작업을 진행해주세요.',
    },
    disease_latus: {
      label: '차먼지응애',
      description: '차먼지응애 피해가 감지되었습니다',
      severity: 'danger',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      icon: '🕷️',
      recommendation:
        '살비제를 사용하여 응애를 방제하고, 습도 관리에 신경써주세요.',
    },
  }

  return statusMap[status]
}
