
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AfterCareForm } from './aftercare/AfterCareForm'
import { AfterCareAdmin } from './aftercare/AfterCareAdmin'
import { AfterCareDashboard } from './aftercare/AfterCareDashboard'
import { FeedbackLinkGenerator } from './aftercare/FeedbackLinkGenerator'
import { Heart, Star, MessageSquare, Link } from 'lucide-react'

export const AfterCarePage = () => {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <div className="bg-blue-500 rounded-full p-2 md:p-3">
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">AfterCare</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
          AfterCare is the final step of every project. Generate shareable links for clients to rate your service, 
          evaluate communication, and leave suggestions to help your business grow.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="generate" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Link className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Generate Links</span>
            <span className="sm:hidden">Links</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Internal Form</span>
            <span className="sm:hidden">Form</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Star className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Admin Panel</span>
            <span className="sm:hidden">Admin</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Heart className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-4 md:mt-6">
          <FeedbackLinkGenerator />
        </TabsContent>

        <TabsContent value="feedback" className="mt-4 md:mt-6">
          <AfterCareForm />
        </TabsContent>

        <TabsContent value="admin" className="mt-4 md:mt-6">
          <AfterCareAdmin />
        </TabsContent>

        <TabsContent value="dashboard" className="mt-4 md:mt-6">
          <AfterCareDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
