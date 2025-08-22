import React, { useState } from 'react';
import { useClients } from '@/hooks/useClients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Users } from 'lucide-react';
import { ClientDialog } from './clients/ClientDialog';
import { ClientErrorHandler } from './ClientErrorHandler';

export function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const { 
    data: clients = [], 
    isLoading, 
    error, 
    refetch 
  } = useClients();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <ClientErrorHandler error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">Clients</h1>
        </div>
        <Button onClick={() => setShowClientDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute h-5 w-5 top-3 left-3 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search clients..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <Card key={client.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{client.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ClientDialog
        open={showClientDialog}
        setOpen={setShowClientDialog}
        client={selectedClient}
        onClientCreated={() => {
          refetch()
          setSelectedClient(null)
        }}
        onClientUpdated={() => {
          refetch()
          setSelectedClient(null)
        }}
      />
    </div>
  );
}
