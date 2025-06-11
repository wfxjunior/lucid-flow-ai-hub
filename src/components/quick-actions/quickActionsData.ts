
import { LucideIcon } from "lucide-react"
import { mainFeaturesActions } from "./mainFeaturesActions"
import { businessToolsActions } from "./businessToolsActions"
import { communicationActions } from "./communicationActions"
import { analyticsActions } from "./analyticsActions"

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  hoverColor: string
}

export const getAllQuickActions = (): QuickAction[] => [
  ...mainFeaturesActions,
  ...businessToolsActions,
  ...communicationActions,
  ...analyticsActions
]
