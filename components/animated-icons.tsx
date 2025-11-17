
'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, Car, Clock, Mail } from 'lucide-react'

const icons = [
  {
    icon: UtensilsCrossed,
    label: 'Order food',
    color: 'text-orange-500',
  },
  {
    icon: Car,
    label: 'Order a ride',
    color: 'text-blue-500',
  },
  {
    icon: Clock,
    label: 'Set a reminder',
    color: 'text-purple-500',
  },
  {
    icon: Mail,
    label: 'Send an email',
    color: 'text-pink-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
}

export function AnimatedIcons() {
  return (
    <motion.div
      className="w-full py-8 md:py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto px-4">
        {icons.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3 md:gap-4"
              variants={iconVariants}
              whileHover="hover"
            >
              <div className={`${item.color} transition-colors duration-300`}>
                <Icon size={48} className="md:w-16 md:h-16" strokeWidth={1.5} />
              </div>
              <p className="text-sm md:text-base text-foreground font-medium text-center">
                {item.label}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
