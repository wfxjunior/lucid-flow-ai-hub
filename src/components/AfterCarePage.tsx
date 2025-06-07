
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AfterCareForm } from './aftercare/AfterCareForm'
import { AfterCareAdmin } from './aftercare/AfterCareAdmin'
import { AfterCareDashboard } from './aftercare/AfterCareDashboard'
import { Heart, Star, MessageSquare } from 'lucide-react'

export const AfterCarePage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-blue-500 rounded-full p-3">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AfterCare</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AfterCare is the final step of every project. It allows your client to rate the service, 
          evaluate communication, and leave suggestions to help your business grow.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Client Feedback
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Admin Panel
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="mt-6">
          <AfterCareForm />
        </TabsContent>

        <TabsContent value="admin" className="mt-6">
          <AfterCareAdmin />
        </TabsContent>

        <TabsContent value="dashboard" className="mt-6">
          <AfterCareDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
