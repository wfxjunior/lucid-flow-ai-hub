import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { CurrencySelector } from "@/components/ui/currency-selector"
import { getCurrencySymbol } from "@/utils/currencyUtils"

export interface LineItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  tax: number
  total: number
}

interface EditableLineItemsProps {
  items: LineItem[]
  onItemsChange: (items: LineItem[]) => void
  currency?: string
  onCurrencyChange?: (currency: string) => void
}

const taxRates = [
  { label: 'No Tax (0%)', value: 0 },
  { label: 'Sales Tax (8.5%)', value: 8.5 },
  { label: 'GST (10%)', value: 10 },
  { label: 'VAT (20%)', value: 20 },
  { label: 'Custom', value: -1 }
]

export function EditableLineItems({ 
  items, 
  onItemsChange, 
  currency = 'USD',
  onCurrencyChange 
}: EditableLineItemsProps) {
  const [customTaxRates, setCustomTaxRates] = useState<Record<string, number>>({})
  const currencySymbol = getCurrencySymbol(currency)

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        
        // Recalculate total when quantity, unitPrice, or tax changes
        if (field === 'quantity' || field === 'unitPrice' || field === 'tax') {
          const subtotal = updated.quantity * updated.unitPrice
          const taxAmount = subtotal * (updated.tax / 100)
          updated.total = subtotal + taxAmount
        }
        
        return updated
      }
      return item
    })
    onItemsChange(updatedItems)
  }

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0
    }
    onItemsChange([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      onItemsChange(items.filter(item => item.id !== id))
    }
  }

  const handleTaxChange = (itemId: string, taxValue: string) => {
    if (taxValue === '-1') {
      // Custom tax rate - show input
      const customRate = prompt('Enter custom tax rate (%):')
      if (customRate && !isNaN(Number(customRate))) {
        const rate = Number(customRate)
        setCustomTaxRates(prev => ({ ...prev, [itemId]: rate }))
        updateItem(itemId, 'tax', rate)
      }
    } else {
      updateItem(itemId, 'tax', Number(taxValue))
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const totalTax = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.tax / 100), 0)
  const grandTotal = subtotal + totalTax

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      {/* Currency Selector */}
      {onCurrencyChange && (
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Currency:</label>
            <CurrencySelector
              value={currency}
              onValueChange={onCurrencyChange}
              className="w-64"
            />
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="w-[200px]">Item</TableHead>
            <TableHead className="w-[250px]">Description</TableHead>
            <TableHead className="w-[100px] text-center">Qty</TableHead>
            <TableHead className="w-[120px] text-center">Unit Price</TableHead>
            <TableHead className="w-[120px] text-center">Tax</TableHead>
            <TableHead className="w-[120px] text-center">Total</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  placeholder="Item name"
                  className="border-none p-0 focus-visible:ring-0"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Description"
                  className="border-none p-0 focus-visible:ring-0"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value) || 0)}
                  className="border-none p-0 text-center focus-visible:ring-0"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="mr-1">{currencySymbol}</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value) || 0)}
                    className="border-none p-0 text-center focus-visible:ring-0"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Select
                  value={customTaxRates[item.id] ? '-1' : item.tax.toString()}
                  onValueChange={(value) => handleTaxChange(item.id, value)}
                >
                  <SelectTrigger className="border-none p-0 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taxRates.map((rate) => (
                      <SelectItem key={rate.value} value={rate.value.toString()}>
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-center font-medium">
                {currencySymbol}{item.total.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="p-4 border-t">
        <Button onClick={addItem} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Line Item
        </Button>
      </div>
      
      {/* Totals Section */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{currencySymbol}{totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>{currencySymbol}{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
