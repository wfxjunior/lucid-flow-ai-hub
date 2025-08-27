
import { Link } from "react-router-dom"

export function SidebarHeader() {
  return (
    <div className="p-4 border-b">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <svg width="32" height="32" viewBox="0 0 200 200" className="h-8 w-8">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#1E40AF', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#gradient1)" stroke="#1E40AF" strokeWidth="4"/>
          <text x="100" y="115" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">F</text>
        </svg>
      </Link>
    </div>
  )
}
