import { useEffect, useMemo, useRef, useState } from "react"

type FileItem = {
  id: string
  file?: File
  previewUrl?: string
}

export default function VerifySchoolPage() {
  const [items, setItems] = useState<FileItem[]>([
    { id: "slot-1" },
    { id: "slot-2" },
    { id: "slot-3" },
  ])
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({})

  const canSubmit = useMemo(() => items.some((it) => !!it.file), [items])

  const openPicker = (slotId: string) => {
    fileInputs.current[slotId]?.click()
  }

  const onPick = (slotId: string, file?: File) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setItems((prev) =>
      prev.map((it) =>
        it.id === slotId ? { ...it, file, previewUrl: url } : it
      )
    )
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>, slotId: string) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) onPick(slotId, file)
  }

  const clearSlot = (slotId: string) => {
    const prevUrl = items.find((i) => i.id === slotId)?.previewUrl
    if (prevUrl) URL.revokeObjectURL(prevUrl)
    setItems((prev) => prev.map((it) => (it.id === slotId ? { id: slotId } : it)))
    fileInputs.current[slotId] = null
  }

  useEffect(() => {
    return () => {
      items.forEach((it) => {
        if (it.previewUrl) URL.revokeObjectURL(it.previewUrl)
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const payload = items
      .filter((it) => it.file)
      .map((it) => ({
        id: it.id,
        name: it.file!.name,
        size: it.file!.size,
        type: it.file!.type,
      }))
    console.log("학교 인증 업로드:", payload)
    alert("인증 서류가 업로드되었습니다.")
  }

  return (
    <section className="pt-32 md:pt-40 pb-20 max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-2xl font-semibold mb-3">학교 인증</h1>
      <p className="text-slate-500 leading-relaxed mb-10">
        회원가입 시 입력한 학교의 합격 인증 여부를 확인하겠습니다.
        인증을 할 수 있을만한 서류를 업로드 해주세요.
        <br />
        (학생증, 재학증명서, 합격증명서 등)
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {items.map((slot) => (
            <div
              key={slot.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, slot.id)}
              className="w-[132px] h-[132px] rounded-2xl border border-slate-300 bg-white shadow-sm
                         flex items-center justify-center relative cursor-pointer transition hover:shadow-md"
              onClick={() => openPicker(slot.id)}
              role="button"
              aria-label="인증 서류 업로드"
            >
              {slot.previewUrl ? (
                <img
                  src={slot.previewUrl}
                  alt="업로드 미리보기"
                  className="w-[92px] h-[92px] object-contain"
                />
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="w-10 h-10 text-slate-400"
                >
                  <rect x="6" y="8" width="36" height="32" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="20" r="3" fill="currentColor" />
                  <path d="M12 32l9-8 7 6 6-6 6 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              )}

              {slot.file && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearSlot(slot.id)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white text-xs"
                  aria-label="삭제"
                >
                  ×
                </button>
              )}

              <input
                ref={(el) => {
                  fileInputs.current[slot.id] = el
                }}
                type="file"
                accept="image/webp,image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={(e) => onPick(slot.id, e.target.files?.[0])}
              />
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full sm:w-[420px] h-12 rounded-xl text-white text-base font-semibold
                       ${canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-300 cursor-not-allowed"}`}
          >
            인증 신청
          </button>
        </div>

        <p className="text-xs text-slate-400">
          WEBP, JPG, JPEG, PNG 업로드 가능 • 각 파일 최대 10MB 권장
        </p>
      </form>
    </section>
  )
}