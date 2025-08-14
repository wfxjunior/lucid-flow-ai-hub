
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Calculator } from "lucide-react"
import { Card } from "@/components/ui/card"

interface LineItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  tax: number
  total: number
}

interface ProfessionalLineItemsProps {
  items: LineItem[]
  onItemsChange: (items: LineItem[]) => void
  currency: string
  onCurrencyChange: (currency: string) => void
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
]

export function ProfessionalLineItems({
  items,
  onItemsChange,
  currency,
  onCurrencyChange
}: ProfessionalLineItemsProps) {
  const currencySymbol = currencies.find(c => c.code === currency)?.symbol || '$'

  const calculateItemTotal = (item: LineItem) => {
    const subtotal = item.quantity * item.unitPrice
    const discountAmount = subtotal * (item.discount / 100)
    const afterDiscount = subtotal - discountAmount
    const taxAmount = afterDiscount * (item.tax / 100)
    return afterDiscount + taxAmount
  }

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value }
        updatedItem.total = calculateItemTotal(updatedItem)
        return updatedItem
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
      discount: 0,
      tax: 0,
      total: 0
    }
    onItemsChange([...items, newItem])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      onItemsChange(items.filter((_, i) => i !== index))
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const totalDiscount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * (item.discount / 100)), 0)
  const afterDiscount = subtotal - totalDiscount
  const totalTax = items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice
    const itemAfterDiscount = itemSubtotal - (itemSubtotal * (item.discount / 100))
    return sum + (itemAfterDiscount * (item.tax / 100))
  }, 0)
  const grandTotal = afterDiscount + totalTax

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Items & Services</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Currency:</span>
            <Select value={currency} onValueChange={onCurrencyChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addItem} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded-t-lg border text-sm font-medium text-gray-700">
            <div className="col-span-4">Item & Description</div>
            <div className="col-span-1 text-center">Qty</div>
            <div className="col-span-1 text-right">Rate</div>
            <div className="col-span-1 text-right">Discount%</div>
            <div className="col-span-1 text-right">Tax%</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-1"></div>
          </div>

          {/* Items */}
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 p-3 border-l border-r border-b bg-white">
              {/* Item & Description */}
              <div className="col-span-4 space-y-2">
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  placeholder="Item name"
                  className="font-medium"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Description (optional)"
                  rows={2}
                  className="text-sm resize-none"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-1">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="text-center"
                />
              </div>

              {/* Rate */}
              <div className="col-span-1">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>

              {/* Discount */}
              <div className="col-span-1">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.discount}
                  onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>

              {/* Tax */}
              <div className="col-span-1">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.tax}
                  onChange={(e) => updateItem(index, 'tax', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>

              {/* Amount */}
              <div className="col-span-2 flex items-center justify-end">
                <div className="text-right font-medium">
                  {currencySymbol}{item.total.toFixed(2)}
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals Section */}
      <div className="mt-6 flex justify-end">
        <div className="w-80 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{currencySymbol}{subtotal.toFixed(2)}</span>
          </div>
          
          {totalDiscount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Discount:</span>
              <span className="font-medium text-red-600">-{currencySymbol}{totalDiscount.toFixed(2)}</span>
            </div>
          )}
          
          {totalTax > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Tax:</span>
              <span className="font-medium">{currencySymbol}{totalTax.toFixed(2)}</span>
            </div>
          )}
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-primary">{currencySymbol}{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
