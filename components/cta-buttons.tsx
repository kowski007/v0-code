'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Car, Bell, Mail } from 'lucide-react'

interface ButtonConfig {
  label: string
  subtitle: string
  icon: React.ElementType
  delay: number
}

const buttons: ButtonConfig[] = [
  { label: 'Order food', subtitle: 'Browse & order meals', icon: UtensilsCrossed, delay: 0 },
  { label: 'Order a ride', subtitle: 'Book your ride', icon: Car, delay: 0.1 },
  { label: 'Set a reminder', subtitle: 'Never forget again', icon: Bell, delay: 0.2 },
  { label: 'Send an email', subtitle: 'Compose & send', icon: Mail, delay: 0.3 },
]

export function CtaButtons() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
      className="w-full py-8 md:py-12"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto px-4">
        {buttons.map((btn, index) => {
          const Icon = btn.icon
          return (
            <motion.div
              key={index}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center gap-3 cursor-pointer"
            >
              <Icon className="w-12 h-12 md:w-14 md:h-14 text-foreground" strokeWidth={1.5} />
              <div className="text-center">
                <span className="text-sm md:text-base font-medium text-foreground block leading-tight">
                  {btn.label}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground block leading-tight mt-1">
                  {btn.subtitle}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
