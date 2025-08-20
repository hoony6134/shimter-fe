import {
  Activity,
  AlertTriangle,
  Camera,
  CameraOff,
  Download,
  Droplets,
  Gauge,
  RefreshCw,
  Sun,
  Thermometer,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import type { AIAnalysisResponse } from '../../data/post-ai-analysis'
import { getCropStatusInfo } from '../../utils/crop-status'

import WebcamComponent from './components/webcam'

function Live() {
  const [showCamera, setShowCamera] = useState(false)
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [analysisResult, setAnalysisResult] =
    useState<AIAnalysisResponse | null>(null)

  const handleCameraToggle = async () => {
    if (!showCamera) {
      setIsLoading(true)
      // 카메라 초기화 시뮬레이션
      setTimeout(() => {
        setShowCamera(true)
        setIsLoading(false)
      }, 800)
    } else {
      setShowCamera(false)
    }
  }

  const handleRetake = () => {
    setShowCamera(true)
    setImageUrl(null)
    setAnalysisResult(null)
  }

  const handleAnalysisComplete = (result: AIAnalysisResponse) => {
    setAnalysisResult(result)
  }

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a')
      link.download = `crop_image_${new Date().toISOString().slice(0, 10)}.jpg`
      link.href = imageUrl
      link.click()
    }
  }

  return (
    <div className="min-h-screen w-full py-18">
      <div className="container mx-auto py-6">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
              <Activity size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              실시간 대시보드
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            AI 기반 작물 상태 분석을 통해 농작물의 건강 상태를 실시간으로
            확인하고 관리하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* 메인 카메라 섹션 */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* 카메라 헤더 */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <Camera className="text-emerald-600 w-full" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        실시간 모니터링
                      </h2>
                      <p className="text-sm text-gray-500">
                        작물 상태를 실시간으로 확인하세요
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCameraToggle}
                      disabled={isLoading}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        showCamera
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          초기화 중...
                        </>
                      ) : showCamera ? (
                        <>
                          <CameraOff size={16} />
                          카메라 끄기
                        </>
                      ) : (
                        <>
                          <Camera size={16} />
                          카메라 켜기
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 카메라 콘텐츠 */}
              <div className="p-4 w-full">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-50 rounded-xl">
                    <RefreshCw
                      size={48}
                      className="animate-spin text-emerald-600 mb-4"
                    />
                    <p className="text-gray-600">
                      카메라를 준비하고 있습니다...
                    </p>
                  </div>
                )}

                {showCamera && !isLoading && (
                  <div className="space-y-4">
                    <WebcamComponent
                      setShowCamera={setShowCamera}
                      setImageUrl={setImageUrl}
                      onAnalysisComplete={handleAnalysisComplete}
                    />
                  </div>
                )}

                {imageUrl && (
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative group">
                        <img
                          src={imageUrl}
                          alt="촬영된 작물 이미지"
                          className="w-full rounded-2xl object-cover shadow-lg border-4 border-white"
                        />
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          촬영 완료
                        </div>
                      </div>
                    </div>

                    {/* AI 분석 결과 */}
                    {analysisResult &&
                      (() => {
                        const statusInfo = getCropStatusInfo(
                          analysisResult.class,
                        )
                        return (
                          <div
                            className={`p-4 rounded-xl border-l-4 ${
                              statusInfo.bgColor
                            } ${
                              statusInfo.severity === 'good'
                                ? 'border-green-500'
                                : statusInfo.severity === 'warning'
                                  ? 'border-orange-500'
                                  : 'border-red-500'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">
                                {statusInfo.icon}
                              </span>
                              <div>
                                <h3
                                  className={`font-semibold text-lg ${statusInfo.color}`}
                                >
                                  {statusInfo.label}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  신뢰도: {analysisResult.confidence}
                                </p>
                              </div>
                              {statusInfo.severity === 'danger' && (
                                <AlertTriangle
                                  className="text-red-500 ml-auto"
                                  size={24}
                                />
                              )}
                            </div>
                            <p className={`text-sm mb-3 ${statusInfo.color}`}>
                              {statusInfo.description}
                            </p>
                            <div className="bg-white bg-opacity-70 rounded-lg p-3">
                              <p className="text-sm text-gray-700">
                                <strong>권장사항:</strong>{' '}
                                {statusInfo.recommendation}
                              </p>
                            </div>
                          </div>
                        )
                      })()}

                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={handleRetake}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
                      >
                        <RefreshCw size={16} />
                        다시 촬영
                      </button>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        <Download size={16} />
                        이미지 저장
                      </button>
                      <button
                        onClick={() => {
                          setImageUrl(null)
                          setAnalysisResult(null)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                      >
                        <Trash2 size={16} />
                        삭제
                      </button>
                    </div>
                  </div>
                )}

                {!showCamera && !imageUrl && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                    <Camera size={64} className="text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      작물을 촬영해보세요
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm">
                      카메라를 켜서 작물의 현재 상태를 확인하고 AI 분석을
                      받아보세요.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 사이드바 정보 */}
          <div className="space-y-6">
            {/* 센서 데이터 */}

            {/* 분석 결과 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-blue-600" />
                분석 결과
              </h3>
              {analysisResult ? (
                (() => {
                  const statusInfo = getCropStatusInfo(analysisResult.class)
                  return (
                    <div className="space-y-3">
                      <div
                        className={`p-3 ${statusInfo.bgColor} rounded-xl border-l-4 ${
                          statusInfo.severity === 'good'
                            ? 'border-green-500'
                            : statusInfo.severity === 'warning'
                              ? 'border-orange-500'
                              : 'border-red-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{statusInfo.icon}</span>
                          <p
                            className={`text-sm font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </p>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          신뢰도: {analysisResult.confidence}
                        </p>
                        <p className={`text-xs ${statusInfo.color}`}>
                          {statusInfo.description}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-700">
                          <strong>권장사항:</strong>
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {statusInfo.recommendation}
                        </p>
                      </div>
                    </div>
                  )
                })()
              ) : (
                <div className="text-center py-4">
                  <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    작물을 촬영하면 AI 분석 결과가 여기에 표시됩니다.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Gauge size={20} className="text-indigo-600" />
                실시간 센서 데이터
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Thermometer className="text-orange-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      온도
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">
                    24°C
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Droplets className="text-emerald-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      습도
                    </span>
                  </div>
                  <span className="text-lg font-bold text-emerald-600">
                    65%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Sun className="text-yellow-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      조도
                    </span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">
                    850 lx
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Live
