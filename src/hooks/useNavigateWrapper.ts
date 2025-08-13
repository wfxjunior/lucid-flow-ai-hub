import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export const useNavigateWrapper = () => {
  const navigate = useNavigate()
  
  const secureNavigate = useCallback((path: string, options?: { replace?: boolean }) => {
    try {
      navigate(path, options)
    } catch (error) {
      console.warn('React Router navigation failed, falling back to window.location:', error)
      if (options?.replace) {
        window.location.replace(path)
      } else {
        window.location.href = path
      }
    }
  }, [navigate])

  return secureNavigate
}