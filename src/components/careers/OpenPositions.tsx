import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Clock, DollarSign, Users, Briefcase, Search, Filter } from 'lucide-react'
import { JobDetailsDrawer } from './JobDetailsDrawer'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  level: string
  salary: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  posted: string
  applications: number
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    salary: "$120,000 - $150,000",
    description: "We're looking for a Senior Frontend Developer to join our growing engineering team...",
    requirements: [
      "5+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with modern build tools",
      "Understanding of responsive design principles"
    ],
    responsibilities: [
      "Build and maintain user-facing features",
      "Collaborate with design and backend teams",
      "Optimize applications for performance",
      "Mentor junior developers"
    ],
    benefits: [
      "Remote-first culture",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Professional development budget"
    ],
    posted: "2 days ago",
    applications: 24
  },
  {
    id: "2",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$110,000 - $140,000",
    description: "Join our backend team to build scalable APIs and services using Node.js...",
    requirements: [
      "3+ years of Node.js development experience",
      "Experience with Express.js and PostgreSQL",
      "Understanding of RESTful API design",
      "Experience with testing frameworks"
    ],
    responsibilities: [
      "Design and implement backend services",
      "Write unit and integration tests",
      "Participate in code reviews",
      "Deploy and monitor applications"
    ],
    benefits: [
      "Competitive salary",
      "Medical, dental, and vision insurance",
      "401(k) with company match",
      "Paid time off and holidays"
    ],
    posted: "5 days ago",
    applications: 18
  },
  {
    id: "3",
    title: "Data Scientist",
    department: "Data Science",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior",
    salary: "$130,000 - $170,000",
    description: "We are seeking a Data Scientist to help us analyze and interpret complex data...",
    requirements: [
      "Master's or Ph.D. in Statistics, Mathematics, or related field",
      "5+ years of experience in data science",
      "Proficiency in Python and SQL",
      "Experience with machine learning algorithms"
    ],
    responsibilities: [
      "Develop and implement machine learning models",
      "Analyze large datasets to identify trends",
      "Communicate findings to stakeholders",
      "Collaborate with engineering teams"
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "Generous PTO policy",
      "Professional development opportunities",
      "Stock options"
    ],
    posted: "1 week ago",
    applications: 32
  },
  {
    id: "4",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$110,000 - $140,000",
    description: "We are looking for a Product Manager to define and execute our product strategy...",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills",
      "Experience with Agile methodologies"
    ],
    responsibilities: [
      "Define product requirements and roadmaps",
      "Work closely with engineering and design teams",
      "Conduct market research and competitive analysis",
      "Track and analyze product performance"
    ],
    benefits: [
      "Competitive salary",
      "Medical, dental, and vision insurance",
      "401(k) with company match",
      "Paid time off and holidays"
    ],
    posted: "1 week ago",
    applications: 26
  },
  {
    id: "5",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior",
    salary: "$120,000 - $150,000",
    description: "We are seeking a talented UX Designer to create intuitive and engaging user experiences...",
    requirements: [
      "5+ years of UX design experience",
      "Proficiency in Figma or Sketch",
      "Strong portfolio of design projects",
      "Experience with user research and testing"
    ],
    responsibilities: [
      "Design user interfaces and prototypes",
      "Conduct user research and usability testing",
      "Collaborate with product and engineering teams",
      "Ensure designs are accessible and user-friendly"
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "Generous PTO policy",
      "Professional development opportunities",
      "Stock options"
    ],
    posted: "2 weeks ago",
    applications: 41
  },
  {
    id: "6",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$90,000 - $120,000",
    description: "We are looking for a Marketing Manager to develop and execute marketing campaigns...",
    requirements: [
      "3+ years of marketing experience",
      "Strong understanding of digital marketing channels",
      "Excellent communication and writing skills",
      "Experience with marketing automation tools"
    ],
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Manage social media and email marketing",
      "Track and analyze campaign performance",
      "Collaborate with sales and product teams"
    ],
    benefits: [
      "Competitive salary",
      "Medical, dental, and vision insurance",
      "401(k) with company match",
      "Paid time off and holidays"
    ],
    posted: "3 weeks ago",
    applications: 35
  },
  {
    id: "7",
    title: "Customer Support Specialist",
    department: "Customer Support",
    location: "Remote",
    type: "Full-time",
    level: "Entry-Level",
    salary: "$50,000 - $70,000",
    description: "We are seeking a Customer Support Specialist to provide excellent customer service...",
    requirements: [
      "1+ years of customer support experience",
      "Excellent communication and problem-solving skills",
      "Ability to work independently",
      "Experience with CRM software"
    ],
    responsibilities: [
      "Respond to customer inquiries via email, phone, and chat",
      "Troubleshoot technical issues",
      "Escalate complex issues to senior support staff",
      "Document customer interactions"
    ],
    benefits: [
      "Competitive salary",
      "Medical, dental, and vision insurance",
      "401(k) with company match",
      "Paid time off and holidays"
    ],
    posted: "1 month ago",
    applications: 52
  }
]

interface OpenPositionsProps {
  onApply?: (jobId: string) => void
}

export function OpenPositions({ onApply }: OpenPositionsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [open, setOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setOpen(true)
  }

  const handleCloseDrawer = () => {
    setOpen(false)
  }

  const locations = ['All', ...new Set(jobs.map((job) => job.location))]
  const departments = ['All', ...new Set(jobs.map((job) => job.department))]

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const locationMatch =
      selectedLocation === 'All' || job.location === selectedLocation

    const departmentMatch =
      selectedDepartment === 'All' || job.department === selectedDepartment

    return searchMatch && locationMatch && departmentMatch
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Open Positions</CardTitle>
          <CardDescription>
            Explore our current job openings and find the perfect fit for your
            skills and experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Search by job title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-6 w-6 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">
                No matching jobs found. Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.department}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{job.applications} Applications</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full mt-4"
                      onClick={() => handleJobClick(job)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <JobDetailsDrawer
        open={open}
        onClose={handleCloseDrawer}
        job={selectedJob}
      />
    </div>
  )
}
