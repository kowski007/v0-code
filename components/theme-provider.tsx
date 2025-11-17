'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Sometimes the `children` passed from a Server Component can be a function
  // (a render callback). Client Components can't receive a function as a
  // child, so detect that case and call it to obtain the element to render.
  const content = typeof children === 'function' ? (children as any)() : children

  return <NextThemesProvider {...props}>{content}</NextThemesProvider>
}
