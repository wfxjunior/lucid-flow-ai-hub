import { AdminDashboard } from "@/components/AdminDashboard"
import { UserGreeting } from "@/components/UserGreeting"
import { AdminGuard } from "@/components/auth/AdminGuard"
import { FeatherBizLogo } from "@/components/FeatherBizLogo"

const AdminPage = () => {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <FeatherBizLogo />
                <h1 className="text-2xl font-bold text-primary">FeatherBiz</h1>
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
