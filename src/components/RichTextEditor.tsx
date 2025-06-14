
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

  const insertFormatting = useCallback((prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    let newText: string
    let newCursorPos: number

    if (selectedText) {
      // Se há texto selecionado, envolve o texto com a formatação
      newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end)
      newCursorPos = start + prefix.length + selectedText.length + suffix.length
    } else {
      // Se não há texto selecionado, insere a formatação e posiciona o cursor entre as marcações
      newText = value.substring(0, start) + prefix + suffix + value.substring(end)
      newCursorPos = start + prefix.length
    }
    
    onChange(newText)

    // Restaura o foco e posição do cursor
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }, [value, onChange])

  const insertListItem = useCallback((listType: 'bullet' | 'numbered') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const currentLine = value.substring(lineStart, start)
    
    const prefix = listType === 'bullet' ? '• ' : '1. '
    
    if (currentLine.trim() === '') {
      insertFormatting(prefix)
    } else {
      insertFormatting('\n' + prefix)
    }
  }, [value, insertFormatting])

  const insertQuote = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const currentLine = value.substring(lineStart, start)
    
    if (currentLine.trim() === '') {
      insertFormatting('> ')
    } else {
      insertFormatting('\n> ')
    }
  }, [value, insertFormatting])

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('**', '**')}
          className="h-8 px-2"
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('*', '*')}
          className="h-8 px-2"
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('__', '__')}
          className="h-8 px-2"
          title="Sublinhado"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertListItem('bullet')}
          className="h-8 px-2"
          title="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertListItem('numbered')}
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
        Use **negrito**, *itálico*, __sublinhado__, • para marcadores, 1. para números, {'>'}  para citações
      </div>
    </div>
  )
}
