"use client"

export function OrbLogo({ size = 32 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="orbGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
          </radialGradient>

          <filter id="orbGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>{`
            @keyframes pulse-orb {
              0%, 100% { r: 40; opacity: 0.7; }
              50% { r: 42; opacity: 0.9; }
            }
            @keyframes shimmer-orb {
              0% { offset: 0; }
              100% { offset: 628; }
            }
            .pulse-ring { animation: pulse-orb 3s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Outer glow background */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

        {/* Core orb */}
        <circle cx="50" cy="50" r="40" fill="url(#orbGradient)" filter="url(#orbGlow)" className="pulse-ring" />

        {/* Highlight */}
        <circle cx="35" cy="35" r="12" fill="white" opacity="0.4" />

        {/* Inner ring */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
      </svg>
    </div>
  )
}
