
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <img 
          src="/lovable-uploads/0d97c0c0-7910-4438-93bc-cf330d3652c9.png" 
          alt="FeatherBiz" 
          className="h-8 w-auto object-contain"
        />
      </Link>
    </div>
  )
}
