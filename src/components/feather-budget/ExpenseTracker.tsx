
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Receipt, Trash2, Camera } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/utils/currencyUtils"

interface Expense {
  id: string
  description: string
  amount: number
  category_id: string
  expense_date: string
  payment_method: string
  receipt_url?: string
  notes?: string
  category?: {
    name: string
    color: string
  }
}

interface Category {
  id: string
  name: string
  color: string
}

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const { toast } = useToast()

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category_id: '',
    expense_date: new Date().toISOString().split('T')[0],
    payment_method: 'cash',
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load categories first
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('feather_budget_categories')
        .select('*')
        .order('name')

      if (categoriesError) {
        console.error('Error loading categories:', categoriesError)
        // Create default categories if none exist
        await createDefaultCategories()
        return loadData()
      }

      setCategories(categoriesData || [])

      // Load expenses with category info
      const { data: expensesData, error: expensesError } = await supabase
        .from('feather_budget_expenses')
        .select(`
          *,
          category:feather_budget_categories(name, color)
        `)
        .order('expense_date', { ascending: false })

      if (expensesError) {
        console.error('Error loading expenses:', expensesError)
        toast({
          title: "Error",
          description: "Failed to load expenses",
          variant: "destructive",
        })
        return
      }

      setExpenses(expensesData || [])
    } catch (error) {
      console.error('Error loading data:', error)
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createDefaultCategories = async () => {
    const defaultCategories = [
      { name: 'Gas', color: '#EF4444' },
      { name: 'Food', color: '#10B981' },
      { name: 'Entertainment', color: '#8B5CF6' },
      { name: 'Health', color: '#06B6D4' },
      { name: 'Shopping', color: '#F59E0B' },
      { name: 'Other', color: '#6B7280' }
    ]

    const { data, error } = await supabase
      .from('feather_budget_categories')
      .insert(defaultCategories.map(cat => ({
        ...cat,
        is_default: true,
        user_id: (await supabase.auth.getUser()).data.user?.id
      })))
      .select()

    if (error) {
      console.error('Error creating default categories:', error)
    }
  }

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category_id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const { data, error } = await supabase
        .from('feather_budget_expenses')
        .insert([{
          ...newExpense,
          amount: parseFloat(newExpense.amount),
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select(`
          *,
          category:feather_budget_categories(name, color)
        `)

      if (error) throw error

      if (data) {
        setExpenses([data[0], ...expenses])
        setNewExpense({
          description: '',
          amount: '',
          category_id: '',
          expense_date: new Date().toISOString().split('T')[0],
          payment_method: 'cash',
          notes: ''
        })
        setIsAddingExpense(false)
        toast({
          title: "Success",
          description: "Expense added successfully",
        })
      }
    } catch (error) {
      console.error('Error adding expense:', error)
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      })
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('feather_budget_expenses')
        .delete()
        .eq('id', id)

      if (error) throw error

      setExpenses(expenses.filter(expense => expense.id !== id))
      toast({
        title: "Success",
        description: "Expense deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting expense:', error)
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Expense Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Track Daily Expenses</CardTitle>
              <CardDescription>Add and manage your daily expenses with receipt uploads</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddingExpense(!isAddingExpense)}
              variant={isAddingExpense ? "outline" : "default"}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAddingExpense ? "Cancel" : "Add Expense"}
            </Button>
          </div>
        </CardHeader>
        
        {isAddingExpense && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  placeholder="e.g., Grocery shopping"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={newExpense.category_id} onValueChange={(value) => setNewExpense({...newExpense, category_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: category.color}} />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select value={newExpense.payment_method} onValueChange={(value) => setNewExpense({...newExpense, payment_method: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expense_date">Date</Label>
                <Input
                  id="expense_date"
                  type="date"
                  value={newExpense.expense_date}
                  onChange={(e) => setNewExpense({...newExpense, expense_date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddExpense}>Add Expense</Button>
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Upload Receipt
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest expense entries</CardDescription>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No expenses recorded yet. Start tracking your spending!
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{backgroundColor: expense.category?.color || '#6B7280'}}
                    />
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{expense.expense_date}</span>
                        <span>•</span>
                        <Badge variant="outline">{expense.category?.name}</Badge>
                        <span>•</span>
                        <span className="capitalize">{expense.payment_method.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {expense.receipt_url && (
                      <Button variant="ghost" size="sm">
                        <Receipt className="h-4 w-4" />
                      </Button>
                    )}
                    <span className="font-bold text-lg">{formatCurrency(expense.amount, 'USD')}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
