"use client"

import { useEffect } from 'react'

export function Features() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.lordicon.com/lordicon.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (script.parentElement) {
        script.parentElement.removeChild(script)
      }
    }
  }, [])

  return null
}
