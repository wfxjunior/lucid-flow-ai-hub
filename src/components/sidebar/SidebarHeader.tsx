
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
        <h2 className="text-xl font-bold text-primary">FeatherBiz</h2>
      </div>
    </div>
  )
}
