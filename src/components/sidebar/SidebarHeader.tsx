
import { useNavigate } from "react-router-dom"
import { Icons } from "@/components/icons"

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
        <Icons.logo className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-blue-600">FeatherBiz</h2>
      </div>
    </div>
  )
}
