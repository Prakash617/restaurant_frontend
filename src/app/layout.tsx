// src/app/layout.tsx
'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AuthProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
