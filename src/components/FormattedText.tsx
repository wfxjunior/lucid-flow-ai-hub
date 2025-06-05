
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
      let formattedLine = line
      
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
    let result = text
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    
    // Handle bold (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g
    let match
    
    // Process all formatting
    const allMatches: Array<{index: number, length: number, replacement: React.ReactNode}> = []
    
    // Bold
    while ((match = boldRegex.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        replacement: <strong key={`bold-${match.index}`}>{match[1]}</strong>
      })
    }
    
    // Italic (*text*)
    const italicRegex = /(?<!\*)\*([^*]+?)\*(?!\*)/g
    while ((match = italicRegex.exec(text)) !== null) {
      // Make sure it's not part of a bold pattern
      if (!allMatches.some(m => match.index >= m.index && match.index < m.index + m.length)) {
        allMatches.push({
          index: match.index,
          length: match[0].length,
          replacement: <em key={`italic-${match.index}`}>{match[1]}</em>
        })
      }
    }
    
    // Underline (__text__)
    const underlineRegex = /__(.*?)__/g
    while ((match = underlineRegex.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        replacement: <u key={`underline-${match.index}`}>{match[1]}</u>
      })
    }
    
    // Sort matches by index
    allMatches.sort((a, b) => a.index - b.index)
    
    // Build the result
    for (const formatMatch of allMatches) {
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
