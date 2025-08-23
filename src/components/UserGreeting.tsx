import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Users, Target } from "lucide-react";

export function UserGreeting() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Good morning! 👋
            </h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Welcome to FeatherBiz! Ready to streamline your business operations? 
            Let's get you set up with our powerful automation tools.
          </p>
        </div>
        <div className="hidden sm:block">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-sm font-medium">Quick Setup</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs">
              Get started in under 5 minutes
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              <CardTitle className="text-sm font-medium">AI-Powered</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs">
              Smart automation for your business
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-sm font-medium">All-in-One</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs">
              Everything you need in one place
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Get Started
        </Button>
      </div>
      
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to FeatherBiz!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Let's get you started with setting up your business profile and exploring our features.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setShowModal(false)}>
                Start Setup
              </Button>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
