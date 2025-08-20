import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
// import { ThemeProvider } from 'next-themes'

import { routeTree } from './routeTree.gen'

import './styles.css'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
      <RouterProvider router={router} />
      <Toaster />
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  )
}
