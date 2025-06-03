
import { AdminDashboard } from "@/components/AdminDashboard"
import { UserGreeting } from "@/components/UserGreeting"

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FeatherBiz</h1>
              <span className="ml-2 text-sm text-gray-500">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <UserGreeting />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}

export default AdminPage
