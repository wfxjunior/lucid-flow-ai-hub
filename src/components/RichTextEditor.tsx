
import React, { useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, ListOrdered, Quote } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function RichTextEditor({ value, onChange, placeholder, rows = 6 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }, [value, onChange])

  const insertBulletList = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lines = value.substring(0, start).split('\n')
    const currentLineStart = value.lastIndexOf('\n', start - 1) + 1
    
    if (lines[lines.length - 1].trim() === '') {
      insertText('• ')
    } else {
      insertText('\n• ')
    }
  }, [value, insertText])

  const insertNumberedList = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lines = value.substring(0, start).split('\n')
    const currentLineStart = value.lastIndexOf('\n', start - 1) + 1
    
    if (lines[lines.length - 1].trim() === '') {
      insertText('1. ')
    } else {
      insertText('\n1. ')
    }
  }, [value, insertText])

  const insertQuote = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lines = value.substring(0, start).split('\n')
    
    if (lines[lines.length - 1].trim() === '') {
      insertText('> ')
    } else {
      insertText('\n> ')
    }
  }, [value, insertText])

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('**', '**')}
          className="h-8 px-2"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('*', '*')}
          className="h-8 px-2"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('__', '__')}
          className="h-8 px-2"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertBulletList}
          className="h-8 px-2"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertNumberedList}
          className="h-8 px-2"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertQuote}
          className="h-8 px-2"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-none rounded-t-none border-t-0 focus:ring-0 focus:border-gray-300"
        style={{ fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Monaco, Consolas, monospace' }}
      />
      <div className="text-xs text-gray-500 px-2">
        Use **bold**, *italic*, __underline__, • for bullets, 1. for numbers, > for quotes
      </div>
    </div>
  )
}
