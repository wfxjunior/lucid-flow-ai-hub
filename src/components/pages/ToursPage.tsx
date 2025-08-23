import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlayCircle, Clock, Users, CheckCircle, AlertCircle, Star, MapPin } from 'lucide-react'

interface Tour {
  id: number
  title: string
  location: string
  duration: string
  rating: number
  reviews: number
  price: number
  image: string
  status: 'available' | 'almost full' | 'full'
}

const tours: Tour[] = [
  {
    id: 1,
    title: "Island Hopping Adventure",
    location: "Phuket, Thailand",
    duration: "7 Days",
    rating: 4.8,
    reviews: 124,
    price: 1200,
    image: "https://images.unsplash.com/photo-1507524946660-f54aa927b6a0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "available"
  },
  {
    id: 2,
    title: "Safari Expedition",
    location: "Serengeti, Tanzania",
    duration: "5 Days",
    rating: 4.9,
    reviews: 212,
    price: 1800,
    image: "https://images.unsplash.com/photo-1541849984-7f9156597c9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "almost full"
  },
  {
    id: 3,
    title: "Andes Trek",
    location: "Machu Picchu, Peru",
    duration: "10 Days",
    rating: 4.7,
    reviews: 98,
    price: 2500,
    image: "https://images.unsplash.com/photo-1505485354009-6658c33066ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "full"
  },
  {
    id: 4,
    title: "Northern Lights Adventure",
    location: "Tromsø, Norway",
    duration: "4 Days",
    rating: 4.6,
    reviews: 155,
    price: 1500,
    image: "https://images.unsplash.com/photo-1485239708572-5c4923451832?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "available"
  }
]

export function ToursPage() {
  const [activeTour, setActiveTour] = useState<Tour | null>(tours[0])

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Explore Our Tours
            </CardTitle>
            <CardDescription>
              Discover amazing destinations and plan your next adventure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Tours</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="almost full">Almost Full</TabsTrigger>
                <TabsTrigger value="full">Full</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tours.map((tour) => (
                    <Card key={tour.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTour(tour)}>
                      <div className="relative">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                        {tour.status === 'full' && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            Full
                          </Badge>
                        )}
                        {tour.status === 'almost full' && (
                          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                            Almost Full
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold">{tour.title}</CardTitle>
                        <CardDescription className="text-gray-500">
                          <MapPin className="mr-1 inline-block h-4 w-4" />
                          {tour.location}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="available" className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tours.filter(tour => tour.status === 'available').map((tour) => (
                    <Card key={tour.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTour(tour)}>
                      <div className="relative">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold">{tour.title}</CardTitle>
                        <CardDescription className="text-gray-500">
                          <MapPin className="mr-1 inline-block h-4 w-4" />
                          {tour.location}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="almost full" className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tours.filter(tour => tour.status === 'almost full').map((tour) => (
                    <Card key={tour.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTour(tour)}>
                      <div className="relative">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                          Almost Full
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold">{tour.title}</CardTitle>
                        <CardDescription className="text-gray-500">
                          <MapPin className="mr-1 inline-block h-4 w-4" />
                          {tour.location}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="full" className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tours.filter(tour => tour.status === 'full').map((tour) => (
                    <Card key={tour.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTour(tour)}>
                      <div className="relative">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          Full
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold">{tour.title}</CardTitle>
                        <CardDescription className="text-gray-500">
                          <MapPin className="mr-1 inline-block h-4 w-4" />
                          {tour.location}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {activeTour && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Tour Details
              </CardTitle>
              <CardDescription>
                Learn more about {activeTour.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={activeTour.image}
                alt={activeTour.title}
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-500">
                    <MapPin className="mr-1 inline-block h-4 w-4" />
                    {activeTour.location}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Duration</h3>
                  <p className="text-gray-500">
                    <Clock className="mr-1 inline-block h-4 w-4" />
                    {activeTour.duration}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Price</h3>
                  <p className="text-gray-500">
                    <DollarSign className="mr-1 inline-block h-4 w-4" />
                    ${activeTour.price}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Rating</h3>
                  <p className="text-gray-500">
                    <Star className="mr-1 inline-block h-4 w-4 text-yellow-500" />
                    {activeTour.rating} ({activeTour.reviews} reviews)
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Status</h3>
                  {activeTour.status === 'available' && (
                    <p className="text-green-500">
                      <CheckCircle className="mr-1 inline-block h-4 w-4" />
                      Available
                    </p>
                  )}
                  {activeTour.status === 'almost full' && (
                    <p className="text-yellow-500">
                      <AlertCircle className="mr-1 inline-block h-4 w-4" />
                      Almost Full
                    </p>
                  )}
                  {activeTour.status === 'full' && (
                    <p className="text-red-500">
                      <AlertCircle className="mr-1 inline-block h-4 w-4" />
                      Full
                    </p>
                  )}
                </div>
              </div>
              <Button>Book Now</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
