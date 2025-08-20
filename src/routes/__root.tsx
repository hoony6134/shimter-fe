import { Outlet, createRootRoute } from '@tanstack/react-router'

import Header from '@/components/header'
import Page404 from '@/pages/404'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="mx-6 md:mx-12 lg:mx-24 xl:mx-48">
        <Outlet />
      </div>
    </>
  ),
  notFoundComponent: () => <Page404 />,
})
