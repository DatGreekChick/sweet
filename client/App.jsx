import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, Outlet } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { ErrorFallback } from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div />,
    children: [{ path: '/', element: <div /> }],
  },
])

export const App = () => (
  <>
    <RouterProvider router={router} />
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Outlet />
    </ErrorBoundary>
  </>
)
