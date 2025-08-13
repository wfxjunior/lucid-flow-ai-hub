import { useEffect, useRef } from 'react'

interface IntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useLazyLoading(
  options: IntersectionObserverOptions = {}
) {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options
  const elementRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible, trigger loading
            entry.target.setAttribute('data-loaded', 'true')
            
            if (triggerOnce) {
              observerRef.current?.unobserve(entry.target)
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return elementRef
}