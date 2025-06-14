
import React, { useRef, useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, ListOrdered, Quote } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function RichTextEditor({ value, onChange, placeholder, rows = 6 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

  const applyFormat = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    updateActiveFormats()
    updateContent()
  }, [])

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>()
    
    if (document.queryCommandState('bold')) formats.add('bold')
    if (document.queryCommandState('italic')) formats.add('italic')
    if (document.queryCommandState('underline')) formats.add('underline')
    if (document.queryCommandState('insertUnorderedList')) formats.add('bulletList')
    if (document.queryCommandState('insertOrderedList')) formats.add('numberedList')
    
    setActiveFormats(formats)
  }, [])

  const updateContent = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
    }
  }, [onChange])

  const handleInput = useCallback(() => {
    updateContent()
    updateActiveFormats()
  }, [updateContent, updateActiveFormats])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          applyFormat('bold')
          break
        case 'i':
          e.preventDefault()
          applyFormat('italic')
          break
        case 'u':
          e.preventDefault()
          applyFormat('underline')
          break
      }
    }
  }, [applyFormat])

  const handleSelectionChange = useCallback(() => {
    updateActiveFormats()
  }, [updateActiveFormats])

  React.useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [handleSelectionChange])

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const insertQuote = useCallback(() => {
    applyFormat('formatBlock', 'blockquote')
  }, [applyFormat])

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
        <Button
          type="button"
          variant={activeFormats.has('bold') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => applyFormat('bold')}
          className="h-8 px-2"
          title="Negrito (Cmd+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={activeFormats.has('italic') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => applyFormat('italic')}
          className="h-8 px-2"
          title="Itálico (Cmd+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={activeFormats.has('underline') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => applyFormat('underline')}
          className="h-8 px-2"
          title="Sublinhado (Cmd+U)"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant={activeFormats.has('bulletList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => applyFormat('insertUnorderedList')}
          className="h-8 px-2"
          title="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={activeFormats.has('numberedList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => applyFormat('insertOrderedList')}
          className="h-8 px-2"
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertQuote}
          className="h-8 px-2"
          title="Citação"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="min-h-[200px] p-4 border rounded-b-md rounded-t-none border-t-0 focus:ring-0 focus:border-gray-300 focus:outline-none bg-white rich-text-editor"
        style={{ 
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: '1.6'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      <div className="text-xs text-gray-500 px-2">
        Use Cmd+B para negrito, Cmd+I para itálico, Cmd+U para sublinhado
      </div>
      <style>{`
        .rich-text-editor:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rich-text-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 16px;
          margin: 8px 0;
          color: #6b7280;
          font-style: italic;
        }
        .rich-text-editor ul {
          list-style-type: disc;
          padding-left: 20px;
          margin: 8px 0;
        }
        .rich-text-editor ol {
          list-style-type: decimal;
          padding-left: 20px;
          margin: 8px 0;
        }
        .rich-text-editor li {
          margin: 4px 0;
        }
        .rich-text-editor strong {
          font-weight: bold;
        }
        .rich-text-editor em {
          font-style: italic;
        }
        .rich-text-editor u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
