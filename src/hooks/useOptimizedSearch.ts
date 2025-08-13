import { useState, useEffect, useMemo } from 'react'
import { debounce } from '@/utils/security'

interface SearchOptions {
  debounceMs?: number
  minLength?: number
  caseSensitive?: boolean
}

export function useOptimizedSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  options: SearchOptions = {}
) {
  const { debounceMs = 300, minLength = 1, caseSensitive = false } = options
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce search term updates
  const debouncedSetSearch = useMemo(
    () => debounce((term: string) => setDebouncedSearchTerm(term), debounceMs),
    [debounceMs]
  )

  useEffect(() => {
    debouncedSetSearch(searchTerm)
  }, [searchTerm, debouncedSetSearch])

  // Memoized filtered results
  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < minLength) {
      return items
    }

    const term = caseSensitive ? debouncedSearchTerm : debouncedSearchTerm.toLowerCase()

    return items.filter(item => 
      searchFields.some(field => {
        const value = item[field]
        if (typeof value === 'string') {
          const searchValue = caseSensitive ? value : value.toLowerCase()
          return searchValue.includes(term)
        }
        if (typeof value === 'number') {
          return value.toString().includes(term)
        }
        return false
      })
    )
  }, [items, searchFields, debouncedSearchTerm, minLength, caseSensitive])

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    isSearching: searchTerm !== debouncedSearchTerm,
    resultCount: filteredItems.length
  }
}