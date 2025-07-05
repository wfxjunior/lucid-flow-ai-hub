
import React, { useState } from "react";
import { Play, X } from "lucide-react";

export const LandingDashboardPreview = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-6">
            See It In Action
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Your business command center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage your business in one beautiful, intuitive dashboard
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="ml-4 bg-white rounded px-3 py-1 text-sm text-gray-600 border">
                  app.featherbiz.com/dashboard
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-8 bg-gray-50">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h3>
                  <p className="text-gray-600">Welcome back, here's what's happening</p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white px-4 py-2 rounded-lg border text-sm">Export</div>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ New Invoice</div>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-blue-600 rounded"></div>
                    </div>
                    <span className="text-green-600 text-sm font-medium">+12%</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">$24,780</h4>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-green-600 rounded"></div>
                    </div>
                    <span className="text-green-600 text-sm font-medium">+8%</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">142</h4>
                  <p className="text-gray-600 text-sm">Active Projects</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-purple-600 rounded"></div>
                    </div>
                    <span className="text-green-600 text-sm font-medium">+23%</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">89</h4>
                  <p className="text-gray-600 text-sm">New Clients</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-orange-600 rounded"></div>
                    </div>
                    <span className="text-red-600 text-sm font-medium">-5%</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">12</h4>
                  <p className="text-gray-600 text-sm">Pending Tasks</p>
                </div>
              </div>
              
              {/* Chart and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">Revenue Overview</h4>
                    <div className="flex gap-2">
                      <div className="bg-gray-100 px-3 py-1 rounded text-sm">7D</div>
                      <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">30D</div>
                      <div className="bg-gray-100 px-3 py-1 rounded text-sm">90D</div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-lg relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <path
                        d="M 0 180 Q 100 120 200 100 T 400 80"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M 0 180 Q 100 120 200 100 T 400 80 L 400 200 L 0 200 Z"
                        fill="url(#gradient)"
                        opacity="0.2"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl border">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">New invoice sent</p>
                        <p className="text-xs text-gray-500">Invoice #1234 sent to Acme Corp</p>
                        <p className="text-xs text-gray-400">2 mins ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">Payment received</p>
                        <p className="text-xs text-gray-500">$2,500 from TechStart Inc</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">New appointment</p>
                        <p className="text-xs text-gray-500">Meeting with Sarah Johnson</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* Play Button Overlay */}
          {!showVideo && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <button
                onClick={() => setShowVideo(true)}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200"
              >
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </button>
            </div>
          )}
          
          {/* Video Modal */}
          {showVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="relative bg-white rounded-2xl p-6 w-full max-w-4xl">
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Demo video would play here</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};
