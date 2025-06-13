
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
        <div className="w-8 h-8 flex items-center justify-center">
          <img 
            src="/lovable-uploads/7b2174fb-03a6-4038-9b69-f5fdfd2fcdc4.png" 
            alt="FeatherBiz Logo" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-blue-600">FeatherBiz</h2>
      </div>
    </div>
  )
}
