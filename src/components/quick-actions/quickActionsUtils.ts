
export interface QuickAction {
  id: string
  title: string
  description: string
  icon: keyof typeof import('lucide-react')
  color: string
  hoverColor: string
}

export const filterActions = (actions: QuickAction[], searchTerm: string): QuickAction[] => {
  if (!searchTerm.trim()) {
    return actions
  }
  
  return actions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
