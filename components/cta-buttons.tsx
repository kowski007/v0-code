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
      { rootMargin: '-50px' }
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
      className="w-full py-2 -mt-20"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-3xl mx-auto px-4">
        {buttons.map((btn, index) => {
          const Icon = btn.icon
          return (
            <motion.div
              key={index}
              variants={buttonVariants}
              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Icon className="w-8 h-8 md:w-12 md:h-12 text-foreground" strokeWidth={1.5} />
              </motion.div>
              <div className="text-center">
                <span className="text-[10px] md:text-sm font-medium text-foreground block leading-tight">
                  {btn.label}
                </span>
                <span className="text-[8px] md:text-xs text-muted-foreground block leading-tight mt-0.5">
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
