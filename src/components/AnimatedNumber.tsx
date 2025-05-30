
import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  delay?: number
}

export function AnimatedNumber({ 
  value, 
  duration = 2000, 
  decimals = 0, 
  suffix = '', 
  prefix = '', 
  delay = 0 
}: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0
    const endValue = value

    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = startValue + (endValue - startValue) * easeOutQuart
      
      setCurrentValue(current)

      if (progress < 1) {
        requestAnimationFrame(animateValue)
      }
    }

    requestAnimationFrame(animateValue)
  }, [value, duration, isVisible])

  const formatNumber = (num: number) => {
    return num.toFixed(decimals)
  }

  return (
    <span className="animate-scale-in">
      {prefix}{formatNumber(currentValue)}{suffix}
    </span>
  )
}
