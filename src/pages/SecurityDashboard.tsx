
import React from 'react'
import { SecurityMonitoringDashboard } from '@/components/security/SecurityMonitoringDashboard'
import { SecurityIncidentResponse } from '@/components/security/SecurityIncidentResponse'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield } from 'lucide-react'

export default function SecurityDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Security Center</h1>
          <p className="text-muted-foreground">Monitor and manage your application's security</p>
        </div>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monitoring">Security Monitoring</TabsTrigger>
          <TabsTrigger value="incident-response">Incident Response</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitoring" className="space-y-6">
          <SecurityMonitoringDashboard />
        </TabsContent>
        
        <TabsContent value="incident-response" className="space-y-6">
          <SecurityIncidentResponse />
        </TabsContent>
      </Tabs>
    </div>
  )
}
