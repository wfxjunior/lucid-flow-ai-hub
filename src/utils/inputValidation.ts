// Legacy file - Import from securityCore instead
export { sanitizeInput, validateInput } from './securityCore'

// Keep existing function for backward compatibility
export const sanitizeText = (text: string): string => {
  return sanitizeInput(text, { allowHtml: false, stripScripts: true })
}
