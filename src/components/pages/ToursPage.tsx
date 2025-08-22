
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Camera, Video, Plus, Eye } from 'lucide-react'

interface ToursPageProps {
  onNavigate: (view: string) => void
}

export function ToursPage({ onNavigate }: ToursPageProps) {
  const [tours] = useState([
    {
      id: 1,
      title: "Tour Virtual - Casa de Luxo",
      client: "Maria Santos",
      date: "2024-02-15",
      time: "14:00",
      location: "Alphaville, SP",
      type: "Virtual",
      status: "Agendado",
      participants: 3,
      description: "Tour virtual para apresentação de projeto residencial de alto padrão",
      image: "/lovable-uploads/ad242619-cc12-44fd-aff8-553280a96a7f.png"
    },
    {
      id: 2,
      title: "Visita Técnica - Obra Comercial",
      client: "TechCorp",
      date: "2024-02-18",
      time: "09:30",
      location: "Centro, RJ",
      type: "Presencial",
      status: "Confirmado",
      participants: 5,
      description: "Visita técnica para acompanhamento da obra do novo escritório"
    },
    {
      id: 3,
      title: "Tour 360° - Apartamento Modelo",
      client: "João Silva",
      date: "2024-02-20",
      time: "16:00",
      location: "Vila Olímpia, SP",
      type: "360°",
      status: "Concluído",
      participants: 2,
      description: "Apresentação de apartamento decorado com tour imersivo"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado": return "bg-green-100 text-green-800"
      case "Agendado": return "bg-blue-100 text-blue-800"
      case "Concluído": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Virtual": return <Video className="h-4 w-4" />
      case "360°": return <Camera className="h-4 w-4" />
      case "Presencial": return <Eye className="h-4 w-4" />
      default: return <Eye className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tours & Visitas</h1>
          <p className="text-muted-foreground mt-2">Gerencie tours virtuais e visitas presenciais</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agendar Tour
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {tour.image && (
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(tour.status)}>
                    {tour.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tour.type)}
                    <span className="text-sm font-medium">{tour.type}</span>
                  </div>
                </div>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-lg">{tour.title}</CardTitle>
              <CardDescription>{tour.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{tour.client}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(tour.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{tour.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{tour.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {tour.participants} participantes
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button size="sm">
                    {tour.status === "Concluído" ? "Ver Detalhes" : "Iniciar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Tours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Este Mês</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Confirmados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-muted-foreground">Virtuais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">95%</div>
              <div className="text-sm text-muted-foreground">Taxa de Conversão</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
