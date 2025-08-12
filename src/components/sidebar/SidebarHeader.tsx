
import { Link } from "react-router-dom"

export function SidebarHeader() {

  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <h2 className="text-xl font-bold text-primary">FeatherBiz</h2>
      </Link>
    </div>
  )
}
