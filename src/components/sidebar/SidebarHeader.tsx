
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <div className="h-18 flex items-center justify-center">
          <img 
            src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
            alt="FeatherBiz" 
            className="h-18 w-auto"
          />
        </div>
      </Link>
    </div>
  )
}
