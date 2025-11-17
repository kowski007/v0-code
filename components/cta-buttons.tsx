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
  { label: 'Set a reminder', subtitle: 'Never forget again', icon: 'https://cdn.lordicon.com/rzrkjzuj.json', delay: 0.2 },
  { label: 'Send an email', subtitle: 'Compose & send', icon: 'https://cdn.lordicon.com/rhvddzym.json', delay: 0.3 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="w-full py-2 -mt-8"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto px-4">
        {buttons.map((btn, index) => (
          <motion.div
            key={index}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <lord-icon
              src={btn.icon}
              trigger="hover"
              colors="primary:#000000"
              style={{ width: '48px', height: '48px' }}
            />
            <div className="text-center">
              <span className="text-sm font-medium text-foreground block leading-tight">
                {btn.label}
              </span>
              <span className="text-xs text-muted-foreground block leading-tight mt-0.5">
                {btn.subtitle}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
