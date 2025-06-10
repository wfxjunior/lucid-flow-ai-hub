import React from 'react'

interface FormattedTextProps {
  content: string
  className?: string
}

export function FormattedText({ content, className = '' }: FormattedTextProps) {
  const formatText = (text: string) => {
    if (!text) return ''
    
    // Split by lines to handle line-by-line formatting
    const lines = text.split('\n')
    
    return lines.map((line, lineIndex) => {
      // Handle quotes
      if (line.trim().startsWith('> ')) {
        return (
          <blockquote key={lineIndex} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-2">
            {formatInlineText(line.replace(/^>\s*/, ''))}
          </blockquote>
        )
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={lineIndex} className="ml-4 my-1">
            {formatInlineText(line)}
          </div>
        )
      }
      
      // Handle bullet lists
      if (line.trim().startsWith('• ')) {
        return (
          <div key={lineIndex} className="ml-4 my-1">
            {formatInlineText(line)}
          </div>
        )
      }
      
      // Regular paragraph
      if (line.trim() === '') {
        return <br key={lineIndex} />
      }
      
      return (
        <div key={lineIndex} className="my-1">
          {formatInlineText(line)}
        </div>
      )
    })
  }
  
  const formatInlineText = (text: string) => {
    if (!text) return text
    
    let result = text
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    
    // Find all formatting matches and sort them by position
    const allMatches: Array<{index: number, length: number, replacement: React.ReactNode, type: string}> = []
    
    // Bold (**text**)
    const boldRegex = /\*\*((?:[^*]|\*(?!\*))+?)\*\*/g
    let match
    while ((match = boldRegex.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        replacement: <strong key={`bold-${match.index}`}>{match[1]}</strong>,
        type: 'bold'
      })
    }
    
    // Reset regex
    boldRegex.lastIndex = 0
    
    // Italic (*text*) - must not be part of bold
    const italicRegex = /(?<!\*)\*([^*\n]+?)\*(?!\*)/g
    while ((match = italicRegex.exec(text)) !== null) {
      // Check if this italic is not inside a bold pattern
      const isInsideBold = allMatches.some(m => 
        m.type === 'bold' && 
        match.index >= m.index && 
        match.index + match[0].length <= m.index + m.length
      )
      
      if (!isInsideBold) {
        allMatches.push({
          index: match.index,
          length: match[0].length,
          replacement: <em key={`italic-${match.index}`}>{match[1]}</em>,
          type: 'italic'
        })
      }
    }
    
    // Reset regex
    italicRegex.lastIndex = 0
    
    // Underline (__text__)
    const underlineRegex = /__([^_\n]+?)__/g
    while ((match = underlineRegex.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        replacement: <u key={`underline-${match.index}`}>{match[1]}</u>,
        type: 'underline'
      })
    }
    
    // Sort matches by index to process them in order
    allMatches.sort((a, b) => a.index - b.index)
    
    // Remove overlapping matches (keep the first one)
    const filteredMatches = []
    for (const current of allMatches) {
      const hasOverlap = filteredMatches.some(existing => 
        (current.index < existing.index + existing.length && current.index + current.length > existing.index)
      )
      if (!hasOverlap) {
        filteredMatches.push(current)
      }
    }
    
    // Build the result with formatting applied
    for (const formatMatch of filteredMatches) {
      if (lastIndex < formatMatch.index) {
        parts.push(text.substring(lastIndex, formatMatch.index))
      }
      parts.push(formatMatch.replacement)
      lastIndex = formatMatch.index + formatMatch.length
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }
    
    return parts.length > 0 ? parts : text
  }
  
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      {formatText(content)}
    </div>
  )
}
