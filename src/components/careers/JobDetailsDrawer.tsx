
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from '@/components/ui/AppIcon'

interface JobDetailsDrawerProps {
  job: any | null
  isOpen: boolean
  onClose: () => void
  onApply: (job: any) => void
}

export function JobDetailsDrawer({ job, isOpen, onClose, onApply }: JobDetailsDrawerProps) {
  if (!job) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6">
          <div className="flex items-start gap-4">
            <AppIcon 
              name={job.icon as keyof typeof import('lucide-react')} 
              size="lg" 
              tone="primary" 
              aria-hidden={true}
            />
            <div className="space-y-2 flex-1">
              <SheetTitle className="text-2xl font-bold">{job.title}</SheetTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <AppIcon name="MapPin" size="xs" className="mr-1" aria-hidden={true} />
                  {job.location}
                </Badge>
                <Badge variant="outline">{job.type}</Badge>
                <Badge variant="outline">{job.team}</Badge>
              </div>
            </div>
          </div>
          <SheetDescription className="text-base">
            {job.description}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="font-semibold text-foreground">Compensation</div>
              <div className="text-sm text-muted-foreground">{job.compensation}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Location</div>
              <div className="text-sm text-muted-foreground">{job.location}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Employment</div>
              <div className="text-sm text-muted-foreground">{job.type}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">About the role</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join our {job.team.toLowerCase()} team and help build the next generation of business automation tools. 
                You'll work with cutting-edge technologies and collaborate with a passionate team to deliver impactful solutions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <AppIcon name="Check" size="sm" tone="success" className="mt-0.5 flex-shrink-0" aria-hidden={true} />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <AppIcon name="Dot" size="sm" tone="default" className="mt-0.5 flex-shrink-0" aria-hidden={true} />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Nice to Have</h3>
              <ul className="space-y-2">
                {job.niceToHave.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <AppIcon name="Plus" size="sm" tone="default" className="mt-0.5 flex-shrink-0" aria-hidden={true} />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-border">
            <Button 
              className="flex-1 h-11 px-6 font-medium text-[15px] bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-none transition-all duration-200 rounded-lg" 
              onClick={() => onApply(job)}
            >
              <AppIcon name="Mail" size="sm" className="mr-2 w-4 h-4" aria-hidden={true} />
              Apply by email
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="h-11 px-6 font-medium text-[15px] bg-transparent text-foreground border border-border hover:bg-muted/50 shadow-none transition-all duration-200 rounded-lg"
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
