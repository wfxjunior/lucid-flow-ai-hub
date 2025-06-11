
import { QuickAction } from "./quickActionsData"

export const filterActions = (actions: QuickAction[], searchTerm: string): QuickAction[] => {
  if (!searchTerm.trim()) {
    return actions
  }
  
  return actions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
