
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface FeatureHelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const FeatureHelpDialog: React.FC<FeatureHelpDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      toast({
        title: "Your question was sent!",
        description: "Our team will get back to you soon.",
        variant: "success"
      })
      setSubmitting(false)
      setEmail("")
      setMessage("")
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Features Help</DialogTitle>
          <DialogDescription>
            Have questions about the features? Send us your question or request and we’ll get back to you!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="features-help-email">Your Email</label>
            <Input
              required
              type="email"
              id="features-help-email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="features-help-question">Question or Request</label>
            <Textarea
              required
              id="features-help-question"
              placeholder="Write your question or request about the features..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              minLength={5}
              rows={4}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
