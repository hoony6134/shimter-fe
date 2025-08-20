import { AlertTriangle, Camera, RefreshCw, RotateCcw, X } from 'lucide-react'
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import Webcam from 'react-webcam'

import type { AIAnalysisResponse } from '../../../data/post-ai-analysis'
import { postAIAnalysis } from '../../../data/post-ai-analysis'
import { uploadImageToServer } from '../../../data/upload-image'

interface WebcamComponentType {
  setShowCamera: Dispatch<SetStateAction<boolean>>
  setImageUrl: Dispatch<SetStateAction<string | null>>
  onAnalysisComplete?: (result: AIAnalysisResponse) => void
}

function WebcamComponent({
  setShowCamera,
  setImageUrl,
  onAnalysisComplete,
}: WebcamComponentType) {
  const webcamRef = React.useRef<Webcam>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // 카메라 권한 확인 및 요청
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 미디어 장치 지원 확인
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(
            '이 브라우저에서는 카메라 기능을 지원하지 않습니다. 최신 브라우저를 사용해주세요.',
          )
        }

        // 카메라 권한 요청
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        })

        // 권한이 성공적으로 획득되면 스트림 정리
        stream.getTracks().forEach((track) => track.stop())
        setHasPermission(true)
        setIsLoading(false)
      } catch (err) {
        console.error('카메라 접근 오류:', err)
        setHasPermission(false)
        setIsLoading(false)

        if (err instanceof DOMException) {
          switch (err.name) {
            case 'NotAllowedError':
            case 'PermissionDeniedError':
              setError(
                '카메라 접근 권한이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.',
              )
              break
            case 'NotFoundError':
            case 'DevicesNotFoundError':
              setError(
                '카메라를 찾을 수 없습니다. 카메라가 연결되어 있는지 확인해주세요.',
              )
              break
            case 'NotReadableError':
            case 'TrackStartError':
              setError('카메라가 다른 애플리케이션에서 사용 중입니다.')
              break
            case 'OverconstrainedError':
            case 'ConstraintNotSatisfiedError':
              setError('요청한 카메라 설정을 지원하지 않습니다.')
              break
            default:
              setError('카메라에 접근할 수 없습니다: ' + err.message)
          }
        } else {
          setError(
            err instanceof Error
              ? err.message
              : '알 수 없는 오류가 발생했습니다.',
          )
        }
      }
    }

    checkPermissions()
  }, [facingMode])

  const capture = React.useCallback(async () => {
    if (webcamRef.current) {
      setIsCapturing(true)

      try {
        // 캡처 효과를 위한 약간의 지연
        setTimeout(async () => {
          const imageSrc = webcamRef.current?.getScreenshot()
          if (imageSrc) {
            setImageUrl(imageSrc)
            setShowCamera(false)
            setIsCapturing(false)

            // 서버에 이미지 업로드하고 AI 분석 요청
            if (onAnalysisComplete) {
              setIsUploading(true)
              try {
                // 1. 서버에 이미지 업로드하여 URL 받기
                const imageUrl = await uploadImageToServer(imageSrc)
                // 2. 받은 URL로 AI 분석 요청
                const analysisResult = await postAIAnalysis({ url: imageUrl })
                onAnalysisComplete(analysisResult)
              } catch (error) {
                console.error('분석 중 오류:', error)
                // 오류가 발생해도 이미지는 보여줌
              } finally {
                setIsUploading(false)
              }
            }
          } else {
            setIsCapturing(false)
          }
        }, 300)
      } catch (error) {
        console.error('캡처 중 오류:', error)
        setIsCapturing(false)
      }
    }
  }, [webcamRef, setImageUrl, setShowCamera, onAnalysisComplete])

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }

  const retryConnection = () => {
    setError(null)
    setHasPermission(null)
    setIsLoading(true)
  }

  const handleWebcamError = (error: string | DOMException) => {
    console.error('웹캠 오류:', error)
    setError('카메라 연결에 실패했습니다. 새로고침 후 다시 시도해주세요.')
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="relative w-full">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xl h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <RefreshCw
              size={48}
              className="animate-spin text-blue-600 mx-auto mb-4"
            />
            <p className="text-gray-600 font-medium">
              카메라를 준비하고 있습니다...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              권한 요청을 확인해주세요
            </p>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => setShowCamera(false)}
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error || hasPermission === false) {
    return (
      <div className="relative w-full">
        <div className="relative overflow-hidden rounded-2xl bg-red-50 shadow-2xl h-[70vh] flex items-center justify-center border-2 border-red-200">
          <div className="text-center p-6">
            <AlertTriangle size={48} className="text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              카메라 접근 오류
            </h3>
            <p className="text-red-700 mb-4 text-sm max-w-sm">{error}</p>

            <div className="space-y-2">
              <button
                onClick={retryConnection}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mx-auto"
              >
                <RefreshCw size={16} />
                다시 시도
              </button>
              <p className="text-xs text-red-600">
                문제가 지속되면 브라우저를 새로고침하거나 HTTPS 환경에서
                접속해주세요.
              </p>
            </div>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => setShowCamera(false)}
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* 웹캠 컨테이너 */}
      <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl h-[70vh]">
        {/* 캡처 오버레이 효과 */}
        {isCapturing && (
          <div className="absolute inset-0 z-20 bg-white opacity-80 animate-pulse" />
        )}

        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode,
            width: { ideal: 1920, min: 1280 },
            height: { ideal: 1080, min: 720 },
          }}
          className="w-full h-full object-cover"
          onUserMediaError={handleWebcamError}
        />

        {/* 상단 컨트롤 바 */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setShowCamera(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
          >
            <X size={20} />
          </button>
          <button
            onClick={toggleCamera}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* 실시간 표시기 */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-medium">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>

        {/* 하단 캡처 버튼 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={capture}
            disabled={isCapturing || isUploading}
            className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-full border-4 border-gray-300 flex items-center justify-center">
              <Camera size={24} className="text-gray-700" />
            </div>
            {(isCapturing || isUploading) && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500 animate-spin" />
            )}
          </button>
        </div>

        {/* 업로드 상태 표시 */}
        {isUploading && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              이미지 업로드 및 AI 분석 중...
            </div>
          </div>
        )}
      </div>

      {/* 캡처 팁 */}
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          원형 버튼을 눌러 사진을 촬영하세요 | 카메라 전환: 우측 상단 회전 버튼
        </p>
      </div>
    </div>
  )
}

export default WebcamComponent
