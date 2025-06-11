
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { DocumentForm } from "@/components/DocumentForm"

interface DocumentCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentCreationDialog({ open, onOpenChange }: DocumentCreationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Create Document</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            Create a new document for your business needs
          </DialogDescription>
        </DialogHeader>
        <DocumentForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
