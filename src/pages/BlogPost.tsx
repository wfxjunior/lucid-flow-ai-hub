
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"

const BlogPost = () => {
  const { slug } = useParams()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          <article className="bg-background rounded-lg shadow-sm border p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Blog Post: {slug}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>March 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>FeatherBiz Team</span>
                </div>
              </div>
            </header>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                This is a placeholder blog post for slug: <strong>{slug}</strong>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
