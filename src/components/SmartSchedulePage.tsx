
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Settings, Plus, List } from 'lucide-react'
import { ScheduleCalendar } from './smartschedule/ScheduleCalendar'
import { ScheduleForm } from './smartschedule/ScheduleForm'
import { ScheduleList } from './smartschedule/ScheduleList'
import { IntegrationSettings } from './smartschedule/IntegrationSettings'
import { TodaysJobs } from './smartschedule/TodaysJobs'

export const SmartSchedulePage = () => {
  const [activeView, setActiveView] = useState('calendar')

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <div className="bg-blue-500 rounded-full p-2 md:p-3">
            <Calendar className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">SmartSchedule</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
          Comprehensive job scheduling management across services, clients, and team members. 
          Plan, assign, track, and automate your business operations.
        </p>
      </div>

      {/* Today's Jobs Widget */}
      <TodaysJobs />

      {/* Main Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
          <TabsTrigger value="calendar" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Calendar</span>
            <span className="sm:hidden">Cal</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Plus className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Create Job</span>
            <span className="sm:hidden">Add</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <List className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Job List</span>
            <span className="sm:hidden">List</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Settings className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Integrations</span>
            <span className="sm:hidden">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4 md:mt-6">
          <ScheduleCalendar />
        </TabsContent>

        <TabsContent value="create" className="mt-4 md:mt-6">
          <ScheduleForm />
        </TabsContent>

        <TabsContent value="list" className="mt-4 md:mt-6">
          <ScheduleList />
        </TabsContent>

        <TabsContent value="settings" className="mt-4 md:mt-6">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
