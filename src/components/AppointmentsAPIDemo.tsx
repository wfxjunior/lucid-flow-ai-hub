
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAppointmentsAPI } from '@/hooks/useAppointmentsAPI'
import { useBusinessData } from '@/hooks/useBusinessData'
import { format } from 'date-fns'
import { Calendar, Clock, User, MapPin, Plus, Search, Trash2, Edit } from 'lucide-react'

export function AppointmentsAPIDemo() {
  const { 
    loading,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointmentsAPI()
  
  const { allClients } = useBusinessData()
  const [appointments, setAppointments] = useState<any[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    client_id: '',
    page: 1,
    limit: 10
  })

  const [formData, setFormData] = useState({
    client_id: '',
    title: '',
    description: '',
    appointment_date: '',
    duration_minutes: 60,
    location: '',
    notes: '',
    status: 'scheduled'
  })

  useEffect(() => {
    loadAppointments()
  }, [filters])

  const loadAppointments = async () => {
    try {
      const result = await getAppointments(filters)
      setAppointments(result.data || [])
    } catch (error) {
      console.error('Error loading appointments:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedAppointment) {
        await updateAppointment(selectedAppointment.id, formData)
      } else {
        await createAppointment(formData)
      }
      resetForm()
      loadAppointments()
    } catch (error) {
      console.error('Error saving appointment:', error)
    }
  }

  const handleEdit = (appointment: any) => {
    setSelectedAppointment(appointment)
    setFormData({
      client_id: appointment.client_id,
      title: appointment.title,
      description: appointment.description || '',
      appointment_date: appointment.appointment_date,
      duration_minutes: appointment.duration_minutes,
      location: appointment.location || '',
      notes: appointment.notes || '',
      status: appointment.status
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este appointment?')) {
      try {
        await deleteAppointment(id)
        loadAppointments()
      } catch (error) {
        console.error('Error deleting appointment:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      client_id: '',
      title: '',
      description: '',
      appointment_date: '',
      duration_minutes: 60,
      location: '',
      notes: '',
      status: 'scheduled'
    })
    setSelectedAppointment(null)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            API de Appointments - Demo
          </CardTitle>
          <CardDescription>
            Demonstração da API RESTful para gerenciar appointments
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cliente</Label>
              <Select value={filters.client_id} onValueChange={(value) => setFilters(prev => ({ ...prev, client_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {allClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Limite por página</Label>
              <Select value={filters.limit.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, limit: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {isEditing ? 'Editar Appointment' : 'Criar Novo Appointment'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client">Cliente *</Label>
                <Select value={formData.client_id} onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {allClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título do appointment"
                  required
                />
              </div>
              <div>
                <Label htmlFor="appointment_date">Data e Hora *</Label>
                <Input
                  id="appointment_date"
                  type="datetime-local"
                  value={formData.appointment_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointment_date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duração (minutos)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
                  placeholder="60"
                />
              </div>
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Local do appointment"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição do appointment"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Notas internas"
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments ({appointments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhum appointment encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {appointment.client?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(appointment.appointment_date), 'dd/MM/yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format(new Date(appointment.appointment_date), 'HH:mm')}
                        </span>
                        {appointment.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {appointment.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(appointment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {appointment.description && (
                    <p className="text-sm text-gray-600 mb-2">{appointment.description}</p>
                  )}
                  {appointment.notes && (
                    <p className="text-xs text-gray-500 italic">Notas: {appointment.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
