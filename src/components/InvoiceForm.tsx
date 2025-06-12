import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useReceiptEmail } from '@/hooks/useReceiptEmail';
import { ReceiptEmailButton } from '@/components/ReceiptEmailButton';
import { CurrencySelector } from '@/components/ui/currency-selector';
import { getDefaultCurrency, getCurrencySymbol } from '@/utils/currencyUtils';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface InvoiceFormProps {
  onInvoiceCreated?: (invoice: any) => void;
}

export function InvoiceForm({ onInvoiceCreated }: InvoiceFormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currency, setCurrency] = useState(getDefaultCurrency().code);
  const [loading, setLoading] = useState(false);
  const [lastCreatedInvoice, setLastCreatedInvoice] = useState<any>(null);
  const { sendInvoiceReceipt } = useReceiptEmail();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    }
  };

  const generateInvoiceNumber = async () => {
    try {
      const { data, error } = await supabase.rpc('generate_invoice_number');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error generating invoice number:', error);
      return `INV-${Date.now()}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClientId || !title || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const invoiceNumber = await generateInvoiceNumber();
      const selectedClient = clients.find(c => c.id === selectedClientId);

      const invoiceData = {
        invoice_number: invoiceNumber,
        client_id: selectedClientId,
        title,
        description,
        amount: parseFloat(amount),
        due_date: dueDate || null,
        status: 'pending',
        currency: currency,
        user_id: (await supabase.auth.getUser()).data.user?.id
      };

      const { data, error } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select('*')
        .single();

      if (error) throw error;

      // Create invoice object with client info for email
      const invoiceWithClient = {
        ...data,
        clientInfo: selectedClient,
        lineItems: [{
          name: title,
          description: description,
          quantity: 1,
          unitPrice: parseFloat(amount),
          total: parseFloat(amount)
        }],
        totals: {
          total: parseFloat(amount)
        },
        date: new Date().toISOString(),
        number: invoiceNumber,
        currency: currency
      };

      setLastCreatedInvoice(invoiceWithClient);
      
      toast.success('Invoice created successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setAmount('');
      setDueDate('');
      setSelectedClientId('');
      setCurrency(getDefaultCurrency().code);
      
      if (onInvoiceCreated) {
        onInvoiceCreated(data);
      }

    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
          <CardDescription>
            Generate a new invoice for your client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="client">Client *</Label>
              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Invoice Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter invoice title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter invoice description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <CurrencySelector
                  value={currency}
                  onValueChange={setCurrency}
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {currencySymbol}
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="pl-8"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating...' : 'Create Invoice'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {lastCreatedInvoice && (
        <Card>
          <CardHeader>
            <CardTitle>Invoice Created Successfully!</CardTitle>
            <CardDescription>
              Invoice #{lastCreatedInvoice.number} has been created. You can now send a receipt email to the client.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Client: {lastCreatedInvoice.clientInfo?.name} ({lastCreatedInvoice.clientInfo?.email})
                </p>
                <p className="text-sm text-muted-foreground">
                  Amount: {getCurrencySymbol(lastCreatedInvoice.currency)}{lastCreatedInvoice.totals?.total?.toFixed(2)}
                </p>
              </div>
              <ReceiptEmailButton
                invoice={lastCreatedInvoice}
                transactionId={lastCreatedInvoice.id || 'pending'}
                variant="default"
                size="default"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
