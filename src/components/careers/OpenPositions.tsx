import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, DollarSign, Search, Filter } from "lucide-react"
import { JobDetailsDrawer } from "./JobDetailsDrawer"

interface Job {
  id: number
  title: string
  location: string
  department: string
  type: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  urgent?: boolean
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "San Francisco, CA",
    department: "Engineering",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for a skilled frontend developer to join our team. You will be responsible for developing and maintaining the user interface of our web applications.",
    requirements: [
      "3+ years of frontend development experience",
      "Proficiency in React, JavaScript, and HTML/CSS",
      "Experience with responsive design",
    ],
    benefits: ["Health insurance", "Paid time off", "401k"],
    postedDate: "2 days ago",
    urgent: true,
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "New York, NY",
    department: "Engineering",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    description:
      "We are looking for a skilled backend developer to join our team. You will be responsible for developing and maintaining the server-side logic of our web applications.",
    requirements: [
      "3+ years of backend development experience",
      "Proficiency in Node.js, Python, or Java",
      "Experience with databases such as PostgreSQL or MongoDB",
    ],
    benefits: ["Health insurance", "Paid time off", "401k"],
    postedDate: "3 days ago",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Austin, TX",
    department: "Design",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description:
      "We are looking for a talented UI/UX designer to join our team. You will be responsible for designing the user interface and user experience of our web applications.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma, Sketch, or Adobe XD",
      "Experience with user research and usability testing",
    ],
    benefits: ["Health insurance", "Paid time off", "401k"],
    postedDate: "4 days ago",
  },
  {
    id: 4,
    title: "Marketing Manager",
    location: "Remote",
    department: "Marketing",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "We are looking for a results-driven marketing manager to join our team. You will be responsible for developing and executing marketing strategies to promote our products and services.",
    requirements: [
      "3+ years of marketing experience",
      "Experience with digital marketing, social media marketing, and email marketing",
      "Strong analytical and problem-solving skills",
    ],
    benefits: ["Health insurance", "Paid time off", "401k"],
    postedDate: "5 days ago",
  },
  {
    id: 5,
    title: "Sales Representative",
    location: "San Francisco, CA",
    department: "Sales",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    description:
      "We are looking for a motivated sales representative to join our team. You will be responsible for generating leads, closing sales, and building relationships with customers.",
    requirements: [
      "3+ years of sales experience",
      "Excellent communication and interpersonal skills",
      "Strong negotiation and closing skills",
    ],
    benefits: ["Health insurance", "Paid time off", "401k"],
    postedDate: "6 days ago",
  },
  {
    id: 6,
    title: "Operations Manager",
    location: "New York, NY",
    department: "Operations",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description:
      "We are looking for a detail-oriented operations manager to join our team. You will be responsible for overseeing the day-to-day operations of our company.",
    requirements: [
      "3+ years of operations experience",
      "Strong organizational and problem-solving skills",
      "Excellent communication and interpersonal skills",
    ],
    benefits: ["Health insurance", "Paid time off", "401k"],
    postedDate: "7 days ago",
  },
]

export function OpenPositions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredJobs = mockJobs.filter((job) => {
    const searchRegex = new RegExp(searchTerm, "i")
    const locationMatch =
      locationFilter === "all" || job.location.toLowerCase().includes(locationFilter)
    const departmentMatch =
      departmentFilter === "all" || job.department.toLowerCase().includes(departmentFilter)
    const typeMatch = typeFilter === "all" || job.type.toLowerCase().includes(typeFilter)

    return (
      searchRegex.test(job.title) && locationMatch && departmentMatch && typeMatch
    )
  })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
        <p className="text-muted-foreground mt-2">
          Find your next opportunity with us
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by job title, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found
        </p>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Job Listings */}
      <div className="grid gap-4">
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No positions match your search criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search terms.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <JobDetailsDrawer key={job.id} job={job}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-muted-foreground">{job.department}</p>
                      </div>
                      <Badge variant={job.urgent ? "destructive" : "secondary"}>
                        {job.urgent ? "Urgent" : "Open"}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        Posted {job.postedDate}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </JobDetailsDrawer>
          ))
        )}
      </div>
    </div>
  )
}
