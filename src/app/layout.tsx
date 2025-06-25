// src/app/layout.tsx

import { ReactNode } from 'react'
import { Providers } from '@/components/Providers'  // new client wrapper
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body  cz-shortcut-listen="true">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
