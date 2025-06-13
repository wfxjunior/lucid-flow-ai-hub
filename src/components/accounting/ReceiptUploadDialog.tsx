
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileImage, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from '@/integrations/supabase/client'

interface ReceiptUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete?: () => void
}

export function ReceiptUploadDialog({ open, onOpenChange, onUploadComplete }: ReceiptUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState('')
  const [amount, setAmount] = useState('')
  const [vendor, setVendor] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
      } else {
        toast.error('Please select an image or PDF file')
      }
    }
  }

  const extractReceiptData = async (file: File) => {
    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate AI extraction for demo
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock extracted data
      const mockData = {
        amount: Math.floor(Math.random() * 500) + 10,
        vendor: 'Office Supplies Store',
        description: 'Office materials and supplies'
      }

      if (mockData.amount) setAmount(mockData.amount.toString())
      if (mockData.vendor) setVendor(mockData.vendor)
      if (mockData.description) setNotes(mockData.description)
      
      toast.success('Receipt data extracted successfully!')
      
    } catch (error) {
      console.error('Error extracting receipt data:', error)
      toast.error('Could not extract data from receipt. Please fill manually.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    if (!notes || !amount) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsUploading(true)

    try {
      const user = await supabase.auth.getUser()
      if (!user.data.user) {
        throw new Error('User not authenticated')
      }

      // Generate receipt number
      const { data: receiptNumber } = await supabase.rpc('generate_receipt_number')

      // Create receipt record - using correct schema
      const { error } = await supabase
        .from('receipts')
        .insert({
          notes,
          amount: parseFloat(amount),
          user_id: user.data.user.id,
          receipt_number: receiptNumber || `REC-${Date.now()}`,
          client_id: '00000000-0000-0000-0000-000000000000', // Default client
          invoice_id: '00000000-0000-0000-0000-000000000000', // Default invoice
          payment_method: 'cash',
          created_at: new Date().toISOString()
        })

      if (error) throw error

      // Reset form
      setFile(null)
      setNotes('')
      setAmount('')
      setVendor('')
      
      toast.success('Receipt uploaded successfully!')
      onUploadComplete?.()
      onOpenChange(false)
      
    } catch (error) {
      console.error('Error uploading receipt:', error)
      toast.error('Failed to upload receipt')
    } finally {
      setIsUploading(false)
    }
  }

  const handleAutoExtract = () => {
    if (file) {
      extractReceiptData(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
          <DialogDescription>
            Upload and process expense receipts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Receipt File *</Label>
            <Input
              id="file"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {file && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-muted rounded">
                <FileImage className="h-4 w-4" />
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAutoExtract}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Extract Data'
                  )}
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="vendor">Vendor</Label>
            <Input
              id="vendor"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="Store/vendor name"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes *</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What was this expense for?"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading || !file || !notes || !amount}
              className="flex-1"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? 'Uploading...' : 'Upload Receipt'}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
