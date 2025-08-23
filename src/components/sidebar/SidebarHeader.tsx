
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <img 
          src="/lovable-uploads/ee7c952e-739a-4ed5-89d9-f10317d79177.png" 
          alt="FeatherBiz" 
          className="h-8 w-auto"
        />
      </Link>
    </div>
  )
}
