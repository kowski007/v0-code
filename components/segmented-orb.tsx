'use client'

import React from 'react'

interface SegmentedOrbProps {
  isActive?: boolean
  isSpeaking?: boolean
  className?: string
}

export function SegmentedOrb({ isActive = false, isSpeaking = false, className = '' }: SegmentedOrbProps) {
  const rotation = isSpeaking ? 'animate-spin' : isActive ? 'animate-pulse-subtle' : ''

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${rotation}`}
        style={{
          filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.2))',
        }}
      >
        {/* Blue segments in a circular pattern */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M 100 100 L 100 30 A 70 70 0 0 1 149.49 50.51 Z"
              fill={angle % 90 === 0 ? '#3b82f6' : '#60a5fa'}
              opacity={angle % 90 === 0 ? 1 : 0.7}
            />
          </g>
        ))}

        {/* Center circle */}
        <circle cx="100" cy="100" r="35" fill="white" />
        
        {/* Inner accent circle */}
        <circle cx="100" cy="100" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
      </svg>

      {/* Outer glow effect when active */}
      {isActive && (
        <div className="absolute inset-0 rounded-full animate-pulse-subtle"
          style={{
            boxShadow: '0 0 0 15px rgba(59, 130, 246, 0.1)',
          }}
        />
      )}
    </div>
  )
}
