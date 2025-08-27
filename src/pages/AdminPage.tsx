
import { AdminDashboard } from "@/components/AdminDashboard"
import { UserGreeting } from "@/components/UserGreeting"
import { AdminGuard } from "@/components/auth/AdminGuard"

const AdminPage = () => {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
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
                <span className="ml-2 text-sm text-gray-500">Admin Panel</span>
              </div>
              <div className="flex items-center gap-4">
                <UserGreeting />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full mx-auto" 
              style={{ 
                maxWidth: 'var(--content-max)', 
                paddingInline: 'var(--content-px)' 
              }}>
          <AdminDashboard />
        </main>
      </div>
    </AdminGuard>
  )
}

export default AdminPage
