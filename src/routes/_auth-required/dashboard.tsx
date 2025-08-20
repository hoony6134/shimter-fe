import { createFileRoute } from '@tanstack/react-router'

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">대시보드</h1>
      <p>인증이 필요한 페이지입니다.</p>
    </div>
  )
}

export const Route = createFileRoute('/_auth-required/dashboard')({
  component: Dashboard,
})
