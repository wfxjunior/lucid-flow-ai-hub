
import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Eye, Calendar, Tag, User, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserRole } from "@/hooks/useUserRole"
import { useNavigate } from "react-router-dom"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  status: "draft" | "published" | "scheduled"
  author: string
  publishDate: string
  category: string
  tags: string[]
  views: number
}

export function BlogAdmin() {
  const { isAdmin, loading } = useUserRole()
  const navigate = useNavigate()

  // Security check: redirect if not admin
  useEffect(() => {
    if (!loading && !isAdmin) {
      console.warn('BlogAdmin: Non-admin user attempted access')
      navigate('/')
    }
  }, [isAdmin, loading, navigate])

  // Don't render anything while checking permissions
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Verificando permissões...</span>
      </div>
    )
  }

  // Security: only render if user is admin
  if (!isAdmin) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Acesso Negado</h2>
        <p className="text-red-600">Você não tem permissão para acessar o painel de administração do blog.</p>
      </div>
    )
  }
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "How to Maximize Your Business Efficiency with AI",
      content: "Complete article content here...",
      excerpt: "Discover how AI can transform your business operations and boost productivity.",
      status: "published",
      author: "Admin",
      publishDate: "2024-01-20",
      category: "AI & Technology",
      tags: ["AI", "Business", "Productivity"],
      views: 1250
    },
    {
      id: "2",
      title: "Invoice Management Best Practices",
      content: "Complete article content here...",
      excerpt: "Learn the best practices for managing invoices and improving cash flow.",
      status: "draft",
      author: "Admin",
      publishDate: "2024-01-25",
      category: "Finance",
      tags: ["Invoicing", "Finance", "Best Practices"],
      views: 0
    }
  ])

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    status: "draft" as const,
    publishDate: new Date().toISOString().split('T')[0]
  })

  const categories = ["AI & Technology", "Finance", "Business Tips", "Product Updates", "Industry News"]
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSavePost = () => {
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...editingPost, tags: editingPost.tags }
          : post
      ))
      setEditingPost(null)
    } else {
      // Create new post
      const post: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt,
        status: newPost.status,
        author: "Admin",
        publishDate: newPost.publishDate,
        category: newPost.category,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        views: 0
      }
      setPosts([post, ...posts])
    }
    
    setNewPost({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      status: "draft",
      publishDate: new Date().toISOString().split('T')[0]
    })
    setShowEditor(false)
  }

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800"
      case "scheduled": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Administration</h1>
          <p className="text-lg text-muted-foreground">Manage your blog posts and content</p>
        </div>
        <Button onClick={() => setShowEditor(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
            <CardDescription>
              {editingPost ? 'Update your blog post' : 'Write a new blog post for your audience'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Post title..."
                value={editingPost ? editingPost.title : newPost.title}
                onChange={(e) => editingPost 
                  ? setEditingPost({ ...editingPost, title: e.target.value })
                  : setNewPost({ ...newPost, title: e.target.value })
                }
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={editingPost ? editingPost.category : newPost.category}
                  onValueChange={(value) => editingPost
                    ? setEditingPost({ ...editingPost, category: value })
                    : setNewPost({ ...newPost, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={editingPost ? editingPost.status : newPost.status}
                  onValueChange={(value) => editingPost
                    ? setEditingPost({ ...editingPost, status: value as any })
                    : setNewPost({ ...newPost, status: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input
                placeholder="tag1, tag2, tag3"
                value={editingPost ? editingPost.tags.join(', ') : newPost.tags}
                onChange={(e) => editingPost
                  ? setEditingPost({ ...editingPost, tags: e.target.value.split(',').map(tag => tag.trim()) })
                  : setNewPost({ ...newPost, tags: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                placeholder="Brief description of the post..."
                value={editingPost ? editingPost.excerpt : newPost.excerpt}
                onChange={(e) => editingPost
                  ? setEditingPost({ ...editingPost, excerpt: e.target.value })
                  : setNewPost({ ...newPost, excerpt: e.target.value })
                }
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Write your blog post content here..."
                value={editingPost ? editingPost.content : newPost.content}
                onChange={(e) => editingPost
                  ? setEditingPost({ ...editingPost, content: e.target.value })
                  : setNewPost({ ...newPost, content: e.target.value })
                }
                rows={10}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSavePost}>
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowEditor(false)
                  setEditingPost(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <Badge variant="outline" className={getStatusColor(post.status)}>
                      <span className="capitalize">{post.status}</span>
                    </Badge>
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingPost(post)
                      setShowEditor(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
