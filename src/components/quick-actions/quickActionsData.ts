
import { mainFeaturesActions } from "./mainFeaturesActions"
import { businessToolsActions } from "./businessToolsActions" 
import { communicationActions } from "./communicationActions"
import { analyticsActions } from "./analyticsActions"

// Combine all actions into a single array
export const quickActionsData = [
  ...mainFeaturesActions,
  ...businessToolsActions,
  ...communicationActions, 
  ...analyticsActions
]

console.log('quickActionsData loaded with', quickActionsData.length, 'actions')
console.log('Business tools actions:', businessToolsActions.map(action => action.id))
console.log('EasyCalc included:', businessToolsActions.find(action => action.id === 'easy-calc') ? 'YES' : 'NO')
