
import { Building2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function SidebarHeader() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <div className="p-4 border-b">
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleLogoClick}
      >
        <Building2 className="h-6 w-6 text-blue-600" />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-blue-600">FeatherBiz</h2>
          <p className="text-xs text-gray-500 font-medium">Organize. Send. Grow. All-in-one</p>
          <p className="text-xs text-gray-400">AI-Powered Business Platform</p>
        </div>
      </div>
    </div>
  )
}
