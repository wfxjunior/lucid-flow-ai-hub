
import React, { useState, useEffect } from 'react';
import { sanitizeHtml } from '@/utils/htmlSanitizer';
import { securityEvent } from '@/utils/security';

interface SecureRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowedTags?: string[];
  maxLength?: number;
  disabled?: boolean;
}

export const SecureRichTextEditor: React.FC<SecureRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Type your content...',
  allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3'],
  maxLength = 50000,
  disabled = false
}) => {
  const [sanitizedContent, setSanitizedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const sanitized = sanitizeHtml(value, { allowedTags });
    setSanitizedContent(sanitized);
    
    // Log if content was modified during sanitization
    if (sanitized !== value && value.length > 0) {
      securityEvent('Content sanitized in rich text editor', {
        originalLength: value.length,
        sanitizedLength: sanitized.length,
        containedScript: value.includes('<script'),
        containedEvents: /on\w+=/i.test(value)
      });
    }
  }, [value, allowedTags]);

  const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
    const newContent = event.currentTarget.innerHTML;
    
    // Enforce length limit
    if (newContent.length > maxLength) {
      return;
    }

    const sanitized = sanitizeHtml(newContent, { allowedTags });
    onChange(sanitized);
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    
    const paste = event.clipboardData.getData('text/html') || event.clipboardData.getData('text/plain');
    const sanitized = sanitizeHtml(paste, { allowedTags });
    
    // Insert sanitized content at cursor position
    document.execCommand('insertHTML', false, sanitized);
  };

  return (
    <div className="relative border border-gray-300 rounded-lg">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => document.execCommand('bold', false)}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          disabled={disabled}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => document.execCommand('italic', false)}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          disabled={disabled}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => document.execCommand('underline', false)}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          disabled={disabled}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => document.execCommand('insertUnorderedList', false)}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          disabled={disabled}
        >
          • List
        </button>
      </div>
      
      <div
        contentEditable={!disabled}
        className={`min-h-[200px] p-4 outline-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        onInput={handleContentChange}
        onPaste={handlePaste}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        style={{ wordBreak: 'break-word' }}
        data-placeholder={placeholder}
      />
      
      <div className="flex justify-between items-center p-2 text-xs text-gray-500 border-t border-gray-200">
        <span>
          {sanitizedContent.length} / {maxLength} characters
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Content secured
        </span>
      </div>
    </div>
  );
};
