
import React from "react";

export const LandingDashboardPreview = () => {

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-md bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-medium mb-6">
            See It In Action
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4">
            Your business command center
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Everything you need to manage your business in one beautiful, intuitive dashboard
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
            
            {/* Browser Chrome */}
            <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-primary/40 rounded-full"></div>
                  <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-primary/80 rounded-full"></div>
                </div>
                  <div className="ml-4 bg-background rounded px-3 py-1 text-sm text-muted-foreground border border-border">
                  app.featherbiz.com/dashboard
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-8 bg-muted/30">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Dashboard</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Welcome back, here's what's happening</p>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="bg-card px-3 sm:px-4 py-2 rounded-lg border border-border text-xs sm:text-sm flex-1 sm:flex-none text-center text-foreground">Export</div>
                  <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex-1 sm:flex-none text-center">+ New Invoice</div>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-accent rounded"></div>
                    </div>
                    <span className="text-primary text-xs sm:text-sm font-medium">+12%</span>
                  </div>
                  <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-1">$24,780</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">Total Revenue</p>
                </div>
                
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded"></div>
                    </div>
                    <span className="text-primary text-xs sm:text-sm font-medium">+8%</span>
                  </div>
                  <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-1">142</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">Active Projects</p>
                </div>
                
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded"></div>
                    </div>
                    <span className="text-primary text-xs sm:text-sm font-medium">+23%</span>
                  </div>
                  <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-1">89</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">New Clients</p>
                </div>
                
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-accent rounded"></div>
                    </div>
                    <span className="text-destructive text-xs sm:text-sm font-medium">-5%</span>
                  </div>
                  <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-1">12</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">Pending Tasks</p>
                </div>
              </div>
              
              {/* Chart and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Chart */}
                <div className="lg:col-span-2 bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">Revenue Overview</h4>
                    <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
                      <div className="bg-muted px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex-1 sm:flex-none text-center">7D</div>
                      <div className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex-1 sm:flex-none text-center">30D</div>
                      <div className="bg-muted px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex-1 sm:flex-none text-center">90D</div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-32 sm:h-48 bg-gradient-to-t from-primary/10 to-transparent rounded-lg relative overflow-hidden">
                    <svg className="w-full h-full text-primary" viewBox="0 0 400 200">
                      <path
                        d="M 0 180 Q 100 120 200 100 T 400 80"
                        stroke="hsl(var(--primary))"
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
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">New invoice sent</p>
                        <p className="text-xs text-muted-foreground">Invoice #1234 sent to Acme Corp</p>
                        <p className="text-xs text-muted-foreground/70">2 mins ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">Payment received</p>
                        <p className="text-xs text-muted-foreground">$2,500 from TechStart Inc</p>
                        <p className="text-xs text-muted-foreground/70">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">New appointment</p>
                        <p className="text-xs text-muted-foreground">Meeting with Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground/70">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
