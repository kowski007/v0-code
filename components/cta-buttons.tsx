'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ButtonConfig {
  label: string
  subtitle: string
  icon: string
  delay: number
}

const buttons: ButtonConfig[] = [
  { label: 'Order food', subtitle: 'Browse & order meals', icon: 'https://cdn.lordicon.com/qhvyklyi.json', delay: 0 },
  { label: 'Order a ride', subtitle: 'Book your ride', icon: 'https://cdn.lordicon.com/sbnjyzxn.json', delay: 0.1 },
  { label: 'Set a reminder', subtitle: 'Never forget again', icon: 'https://cdn.lordicon.com/fnmwkbkl.json', delay: 0.2 },
  { label: 'Send an email', subtitle: 'Compose & send', icon: 'https://cdn.lordicon.com/hqjqosmf.json', delay: 0.3 },
]

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': any
    }
  }
}

export function CtaButtons() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if script is already loaded
    if (typeof window !== 'undefined' && !(window as any).lordicon) {
      const script = document.createElement('script')
      script.src = 'https://cdn.lordicon.com/lordicon.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { margin: '-50px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="w-full py-4 md:py-6 -mt-2"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto px-4">
        {buttons.map((btn, index) => (
          <motion.button
            key={index}
            variants={buttonVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-200 border border-accent/20 hover:border-accent/40"
          >
            <lord-icon
              src={btn.icon}
              trigger="hover"
              colors="primary:#000000"
              style={{ width: '40px', height: '40px' }}
            />
            <div className="text-center">
              <span className="text-xs md:text-sm font-medium text-foreground block leading-tight">
                {btn.label}
              </span>
              <span className="text-xs text-muted-foreground block leading-tight">
                {btn.subtitle}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
