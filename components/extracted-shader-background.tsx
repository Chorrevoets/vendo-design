"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ExtractedShaderBackgroundProps {
  children: React.ReactNode
  className?: string
}

/**
 * Reusable Shader Background Component
 *
 * Features:
 * - Animated mesh gradient with violet/purple theme
 * - Interactive hover effects
 * - SVG filters for glass and gooey effects
 * - Layered gradients for depth
 *
 * Dependencies:
 * - @paper-design/shaders-react
 *
 * Usage:
 * <ExtractedShaderBackground>
 *   <YourContent />
 * </ExtractedShaderBackground>
 */
function ExtractedShaderBackground({ children, className = "min-h-screen" }: ExtractedShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`bg-black relative overflow-hidden ${className}`}>
      {/* SVG Filters for Enhanced Visual Effects */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Primary Mesh Gradient Layer */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#f3f5fb", "#dccbff", "#bff2ec", "#c7d7ff", "#f3f5fb"]}
        speed={0.3}
      />

      {/* Secondary Wireframe Layer for Depth */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={["#dccbff", "#c7d7ff", "#bff2ec", "#f3f5fb"]}
        speed={0.2}
      />

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export { ExtractedShaderBackground }
export default ExtractedShaderBackground
