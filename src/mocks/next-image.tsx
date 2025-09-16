import React from 'react'

// Mock for Next.js Image component for Vite
interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  [key: string]: any
}

export default function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
}
