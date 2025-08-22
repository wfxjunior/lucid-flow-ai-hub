
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Calendar, DollarSign } from 'lucide-react';

interface BusinessDashboardProps {
  onNavigate?: (path: string) => void;
}

export function BusinessDashboard({ onNavigate }: BusinessDashboardProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Business Dashboard</h1>
          <p className="text-muted-foreground">Manage your business operations from one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contracts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active contracts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Scheduled meetings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>Manage your client relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigation('/clients')} className="w-full">
                View Clients
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contracts</CardTitle>
              <CardDescription>Create and manage contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigation('/contracts')} className="w-full">
                View Contracts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Orders</CardTitle>
              <CardDescription>Track your work orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigation('/work-orders')} className="w-full">
                View Work Orders
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage billing and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigation('/invoices')} className="w-full">
                View Invoices
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estimates</CardTitle>
              <CardDescription>Create project estimates</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigation('/estimates')} className="w-full">
                View Estimates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meetings</CardTitle>
              <CardDescription>Schedule and manage meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigation('/meetings')} className="w-full">
                View Meetings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
