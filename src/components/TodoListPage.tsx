import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3,
  CheckCircle2,
  Circle,
  Calendar,
  Flag,
  Clock,
  Target,
  Share2,
  Mail,
  MessageSquare
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TodoItem {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: 'personal' | 'work' | 'business' | 'urgent'
  dueDate?: string
  createdAt: string
  completedAt?: string
}

const priorityColors = {
  'low': 'bg-gray-100 text-gray-600',
  'medium': 'bg-yellow-100 text-yellow-700',
  'high': 'bg-red-100 text-red-700'
}

const categoryColors = {
  'personal': 'bg-blue-100 text-blue-700',
  'work': 'bg-green-100 text-green-700',
  'business': 'bg-purple-100 text-purple-700',
  'urgent': 'bg-red-100 text-red-700'
}

export function TodoListPage() {
  const { toast } = useToast()
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: 'Review client proposals',
      description: 'Go through all pending client proposals and provide feedback',
      completed: false,
      priority: 'high',
      category: 'business',
      dueDate: '2024-01-25',
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Update website portfolio',
      description: 'Add recent projects to the company website portfolio section',
      completed: true,
      priority: 'medium',
      category: 'work',
      createdAt: '2024-01-19',
      completedAt: '2024-01-21'
    },
    {
      id: '3',
      title: 'Schedule team meeting',
      description: 'Organize weekly team sync meeting for project updates',
      completed: false,
      priority: 'medium',
      category: 'work',
      dueDate: '2024-01-23',
      createdAt: '2024-01-18'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'pending' | 'completed'>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [sharePhone, setSharePhone] = useState('')
  const [shareMessage, setShareMessage] = useState('')

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'work' as const,
    dueDate: ''
  })

  const handleAddTodo = () => {
    if (!newTodo.title.trim()) return

    const todo: TodoItem = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      category: newTodo.category,
      dueDate: newTodo.dueDate || undefined,
      createdAt: new Date().toISOString()
    }

    setTodos(prev => [todo, ...prev])
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      category: 'work',
      dueDate: ''
    })
    setShowAddForm(false)
    
    toast({
      title: "Task Added",
      description: `"${todo.title}" has been added to your todo list.`,
    })
  }

  const handleToggleComplete = (todoId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const updatedTodo = {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : undefined
        }
        
        toast({
          title: !todo.completed ? "Task Completed" : "Task Reopened",
          description: `"${todo.title}" has been ${!todo.completed ? 'completed' : 'reopened'}.`,
        })
        
        return updatedTodo
      }
      return todo
    }))
  }

  const handleDeleteTodo = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId)
    setTodos(prev => prev.filter(t => t.id !== todoId))
    
    toast({
      title: "Task Deleted",
      description: `"${todo?.title}" has been deleted.`,
      variant: "destructive"
    })
  }

  const generateShareableContent = () => {
    const tasksToShare = filteredTodos.length > 0 ? filteredTodos : todos
    let content = "My To-Do List:\n\n"
    
    tasksToShare.forEach((todo, index) => {
      const status = todo.completed ? "[DONE]" : "[TODO]"
      content += `${index + 1}. ${status} ${todo.title}\n`
      if (todo.description) content += `   Description: ${todo.description}\n`
      if (todo.dueDate) content += `   Due: ${new Date(todo.dueDate).toLocaleDateString()}\n`
      content += `   ${todo.category} | ${todo.priority}\n\n`
    })
    
    content += `\nShared from FeatherBiz - ${new Date().toLocaleDateString()}`
    return content
  }

  const handleShareViaEmail = () => {
    if (!shareEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      })
      return
    }

    const content = generateShareableContent()
    const subject = "Shared To-Do List from FeatherBiz"
    const body = shareMessage ? `${shareMessage}\n\n${content}` : content
    
    const mailtoLink = `mailto:${shareEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
    
    toast({
      title: "Email Client Opened",
      description: `To-do list ready to share with ${shareEmail}`,
    })
    
    setShareDialogOpen(false)
    setShareEmail('')
    setShareMessage('')
  }

  const handleShareViaText = () => {
    if (!sharePhone.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a phone number",
        variant: "destructive"
      })
      return
    }

    const content = generateShareableContent()
    const message = shareMessage ? `${shareMessage}\n\n${content}` : content
    
    // Create SMS link (works on mobile devices)
    const smsLink = `sms:${sharePhone}?body=${encodeURIComponent(message)}`
    window.open(smsLink, '_blank')
    
    toast({
      title: "SMS Client Opened",
      description: `To-do list ready to share via text to ${sharePhone}`,
    })
    
    setShareDialogOpen(false)
    setSharePhone('')
    setShareMessage('')
  }

  const handleCopyToClipboard = () => {
    const content = generateShareableContent()
    const finalContent = shareMessage ? `${shareMessage}\n\n${content}` : content
    
    navigator.clipboard.writeText(finalContent).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "To-do list copied and ready to share",
      })
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive"
      })
    })
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCompleted = filterCompleted === 'all' || 
                            (filterCompleted === 'completed' && todo.completed) ||
                            (filterCompleted === 'pending' && !todo.completed)
    const matchesCategory = filterCategory === 'all' || todo.category === filterCategory
    
    return matchesSearch && matchesCompleted && matchesCategory
  })

  const completedCount = todos.filter(t => t.completed).length
  const pendingCount = todos.filter(t => !t.completed).length
  const todaysDue = todos.filter(t => 
    t.dueDate && new Date(t.dueDate).toDateString() === new Date().toDateString()
  ).length

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            To-Do List
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Organize your daily tasks and track your productivity
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share List
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share To-Do List</DialogTitle>
                <DialogDescription>
                  Share your current to-do list via email or text message
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="share-message">Personal Message (Optional)</Label>
                  <Textarea
                    id="share-message"
                    placeholder="Add a personal message..."
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="share-email">Share via Email</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="share-email"
                        type="email"
                        placeholder="Enter email address"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                      />
                      <Button onClick={handleShareViaEmail} size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="share-phone">Share via Text</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="share-phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={sharePhone}
                        onChange={(e) => setSharePhone(e.target.value)}
                      />
                      <Button onClick={handleShareViaText} size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button onClick={handleCopyToClipboard} variant="outline" className="w-full">
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Circle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Today</p>
                <p className="text-2xl font-bold text-gray-900">{todaysDue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>Create a new task to add to your todo list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Task title..."
                value={newTodo.title}
                onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <Textarea
                placeholder="Task description (optional)..."
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Priority</label>
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select
                  value={newTodo.category}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="business">Business</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Due Date</label>
                <Input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddTodo}>Add Task</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="business">Business</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <Card key={todo.id} className={`transition-all duration-200 ${todo.completed ? 'opacity-60' : 'hover:shadow-md'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleComplete(todo.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {todo.title}
                    </h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingTodo(todo)}>
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteTodo(todo.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {todo.description && (
                    <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {todo.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={priorityColors[todo.priority]}>
                      <Flag className="h-3 w-3 mr-1" />
                      {todo.priority}
                    </Badge>
                    <Badge className={categoryColors[todo.category]}>
                      {todo.category}
                    </Badge>
                    {todo.dueDate && (
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </Badge>
                    )}
                    {todo.completed && todo.completedAt && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed {new Date(todo.completedAt).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterCompleted !== 'all' || filterCategory !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first task'}
          </p>
          {!searchTerm && filterCompleted === 'all' && filterCategory === 'all' && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
