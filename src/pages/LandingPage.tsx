
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FeatherBiz</h1>
              <span className="ml-2 text-sm text-gray-500">AI-Powered Business Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Admin Panel
              </Button>
              <UserGreeting />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to FeatherBiz
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your AI-powered business management platform. Streamline your operations, 
            manage customers, create invoices, and grow your business with intelligent automation.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            >
              Access Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
            >
              Admin Access
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Dashboard</h3>
              <p className="text-gray-600">
                Access your complete business management suite with sidebar navigation, 
                invoicing, customer management, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Panel</h3>
              <p className="text-gray-600">
                Full administrative control for managing users, system settings, 
                and monitoring platform activity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Powered Tools</h3>
              <p className="text-gray-600">
                Leverage artificial intelligence for voice assistance, document 
                generation, and business automation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
