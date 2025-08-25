
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Book, Search, FileText, ExternalLink } from 'lucide-react'

export function Documentation() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Documentation</h1>
        <p className="text-sm text-gray-500 mt-1">Guides, tutorials, and help resources</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search documentation..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            </div>
            <div className="p-6">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Getting Started
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Project Management
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Financial Tools
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Integrations
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Troubleshooting
                </Button>
              </nav>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Getting Started</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-3">Quick Start Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Welcome to FeatherBiz! This guide will help you get started with managing your construction business effectively.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Setting up your first project</p>
                      <p className="text-xs text-gray-500">Learn how to create and manage projects</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Creating estimates and invoices</p>
                      <p className="text-xs text-gray-500">Generate professional estimates and invoices</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Managing your team</p>
                      <p className="text-xs text-gray-500">Add team members and assign tasks</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900 mb-3">Popular Articles</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">How to track project profitability</p>
                    <p className="text-xs text-gray-500">5 min read • Updated yesterday</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Best practices for client communication</p>
                    <p className="text-xs text-gray-500">8 min read • Updated 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
