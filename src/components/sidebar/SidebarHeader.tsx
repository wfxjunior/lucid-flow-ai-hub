
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <img 
          src="/lovable-uploads/6670f9f6-835f-4a84-8dae-2354ddecb733.png" 
          alt="FeatherBiz" 
          className="h-8 w-auto"
        />
      </Link>
    </div>
  )
}
