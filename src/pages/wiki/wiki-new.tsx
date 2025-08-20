import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function NewWikiPage() {
  const nav = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const canSubmit = useMemo(
    () => title.trim().length > 0 && body.trim().length > 0,
    [title, body]
  )

  useEffect(() => {
    const savedTitle = localStorage.getItem("wiki.new.title") ?? ""
    const savedBody = localStorage.getItem("wiki.new.body") ?? ""
    setTitle(savedTitle)
    setBody(savedBody)
  }, [])

  useEffect(() => { localStorage.setItem("wiki.new.title", title) }, [title])
  useEffect(() => { localStorage.setItem("wiki.new.body", body) }, [body])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    console.log("submit wiki", { title, body })
    localStorage.removeItem("wiki.new.title")
    localStorage.removeItem("wiki.new.body")
    nav({ to: "/wiki" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          새로운 글 제목을 입력하세요.
        </h2>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예) 대학원, 교육 과정"
          className="w-full border-0 border-b border-slate-300 focus-visible:ring-0 focus:border-blue-600 text-xl py-3 rounded-none h-auto"
        />
      </div>

      <div>
        <label className="block text-slate-600 mb-2">새로운 정보 내용을 입력하세요.</label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`예)
광주과학기술원 대학원의 기본정보, GIST 학부생이 누릴 수 있는 특전 등을 작성하세요.
`}
          rows={14}
          className="w-full border border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-100 focus:border-blue-600 rounded-lg p-4 text-base min-h-[360px]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className={`h-11 px-5 rounded-lg text-white ${canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-300 cursor-not-allowed"}`}
        >
          저장
        </button>
        <button
          type="button"
          onClick={() => nav({ to: "/wiki" })}
          className="h-11 px-5 rounded-lg border border-slate-300"
        >
          취소
        </button>
        <div className="ml-auto text-sm text-slate-500">
          제목 {title.trim().length}자 · 본문 {body.trim().length}자
        </div>
      </div>
    </form>
  )
}