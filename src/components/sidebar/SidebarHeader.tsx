
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <img 
          src="/lovable-uploads/069b8ac1-1317-4e74-8d64-94f03ad80e69.png" 
          alt="FeatherBiz" 
          className="h-8 w-auto object-contain"
        />
      </Link>
    </div>
  )
}
