
import { mainFeaturesActions } from './mainFeaturesActions'
import { businessToolsActions } from './businessToolsActions'
import { communicationActions } from './communicationActions'
import { analyticsActions } from './analyticsActions'

export const quickActionsData = [
  ...mainFeaturesActions,
  ...businessToolsActions,
  ...communicationActions,
  ...analyticsActions
]
