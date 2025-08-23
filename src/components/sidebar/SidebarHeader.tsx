
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <img 
          src="/lovable-uploads/72c320c3-26d7-40fd-862e-f1c3270c013f.png" 
          alt="FeatherBiz" 
          className="h-8 w-auto"
        />
      </Link>
    </div>
  )
}
