"use client"

export type AgentState = null | "thinking" | "listening" | "talking"

type OrbProps = {
  agentState?: AgentState
  className?: string
}

export function Orb({ agentState = null, className }: OrbProps) {
  const getAnimationClass = () => {
    switch (agentState) {
      case "listening":
        return "animate-pulse-listen"
      case "talking":
        return "animate-pulse-talk"
      default:
        return "animate-pulse-idle"
    }
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className ?? ""}`}>
      {/* Outer glow rings */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/20 blur-3xl ${getAnimationClass()}`}
        style={{
          animation: agentState === "talking" ? "pulse-talk 0.6s ease-in-out infinite" : agentState === "listening" ? "pulse-listen 1.2s ease-in-out infinite" : "pulse-idle 3s ease-in-out infinite"
        }}
      />

      {/* Middle glow */}
      <div
        className="absolute inset-1/4 rounded-full bg-gradient-to-br from-blue-300/40 to-cyan-300/30 blur-2xl"
        style={{
          animation: agentState === "talking" ? "float-fast 4s ease-in-out infinite" : agentState === "listening" ? "float 6s ease-in-out infinite" : "float-slow 8s ease-in-out infinite"
        }}
      />

      {/* Core orb */}
      <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-300 opacity-80" />
        
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          style={{
            animation: agentState === "talking" ? "shimmer-fast 0.8s ease-in-out infinite" : agentState === "listening" ? "shimmer 1.5s ease-in-out infinite" : "shimmer-slow 4s ease-in-out infinite",
          }}
        />

        {/* Noise texture effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${agentState === "talking" ? "30%" : "50%"} 30%, rgba(255,255,255,0.2), transparent)`,
            animation: agentState === "talking" ? "rotate 2s linear infinite" : "none",
          }}
        />

        {/* Inner highlight */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-white/40 blur-lg" />
      </div>

      {/* Pulsing ring (for listening state) */}
      {agentState === "listening" && (
        <div
          className="absolute inset-0 rounded-full border-2 border-blue-400/60"
          style={{
            animation: "ring-pulse 1.5s ease-out infinite",
          }}
        />
      )}

      {/* Outer active ring (for talking state) */}
      {agentState === "talking" && (
        <>
          <div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/80"
            style={{
              animation: "ring-pulse 0.6s ease-out infinite",
            }}
          />
          <div
            className="absolute -inset-2 rounded-full border-2 border-purple-400/40"
            style={{
              animation: "ring-pulse 0.9s ease-out infinite 0.3s",
            }}
          />
        </>
      )}

      <style jsx>{`
        @keyframes pulse-idle {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes pulse-listen {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes pulse-talk {
          0%, 100% { transform: scale(0.95); opacity: 0.9; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.2; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

