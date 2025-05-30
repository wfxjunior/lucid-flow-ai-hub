
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useLanguage } from "@/contexts/LanguageContext"
import { 
  FolderOpen, 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Plus,
  Search,
  Star,
  StarOff,
  Eye,
  MoreVertical
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Folder {
  id: string
  name: string
  description?: string
  created_at: string
}

interface File {
  id: string
  name: string
  original_name: string
  file_type: string
  file_size: number
  file_url: string
  description?: string
  is_favorite: boolean
  folder_id?: string
  created_at: string
}

export function FileManager() {
  const { t } = useLanguage()
  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderDescription, setNewFolderDescription] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchFolders()
    fetchFiles()
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [selectedFolder])

  const fetchFolders = async () => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setFolders(data || [])
    } catch (error) {
      console.error('Error fetching folders:', error)
      toast({
        title: t("files.error"),
        description: t("files.errorLoadingFolders"),
        variant: "destructive"
      })
    }
  }

  const fetchFiles = async () => {
    try {
      const query = supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false })

      if (selectedFolder) {
        query.eq('folder_id', selectedFolder)
      }

      if (searchTerm) {
        query.ilike('name', `%${searchTerm}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setFiles(data || [])
    } catch (error) {
      console.error('Error fetching files:', error)
      toast({
        title: t("files.error"),
        description: t("files.errorLoadingFiles"),
        variant: "destructive"
      })
    }
  }

  const createFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('folders')
        .insert({
          user_id: user.id,
          name: newFolderName.trim(),
          description: newFolderDescription.trim() || null
        })

      if (error) throw error

      toast({
        title: t("files.success"),
        description: t("files.folderCreated")
      })

      setNewFolderName("")
      setNewFolderDescription("")
      setIsNewFolderDialogOpen(false)
      fetchFolders()
    } catch (error) {
      console.error('Error creating folder:', error)
      toast({
        title: t("files.error"),
        description: t("files.errorCreatingFolder"),
        variant: "destructive"
      })
    }
  }

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Upload file to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('business-files')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('business-files')
        .getPublicUrl(fileName)

      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('files')
        .insert({
          user_id: user.id,
          folder_id: selectedFolder,
          name: file.name.split('.')[0],
          original_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_url: publicUrl
        })

      if (dbError) throw dbError

      toast({
        title: t("files.success"),
        description: t("files.fileUploaded")
      })

      setIsUploadDialogOpen(false)
      fetchFiles()
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: t("files.error"),
        description: t("files.errorUploadingFile"),
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const toggleFavorite = async (fileId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('files')
        .update({ is_favorite: !currentStatus })
        .eq('id', fileId)

      if (error) throw error

      fetchFiles()
      toast({
        title: t("files.success"),
        description: currentStatus ? t("files.removedFromFavorites") : t("files.addedToFavorites")
      })
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast({
        title: t("files.error"),
        description: t("files.errorFavoriteStatus"),
        variant: "destructive"
      })
    }
  }

  const deleteFile = async (fileId: string, fileName: string) => {
    try {
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId)

      if (error) throw error

      // Also delete from storage
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.storage
          .from('business-files')
          .remove([`${user.id}/${fileName}`])
      }

      fetchFiles()
      toast({
        title: t("files.success"),
        description: t("files.fileDeleted")
      })
    } catch (error) {
      console.error('Error deleting file:', error)
      toast({
        title: t("files.error"),
        description: t("files.errorDeletingFile"),
        variant: "destructive"
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('image')) return '🖼️'
    if (fileType.includes('text')) return '📝'
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return '📊'
    return '📎'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t("files.title")}</h2>
          <p className="text-muted-foreground">{t("files.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {t("files.newFolder")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("files.createNewFolder")}</DialogTitle>
                <DialogDescription>
                  {t("files.createFolderDescription")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="folder-name">{t("files.folderName")}</Label>
                  <Input
                    id="folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder={t("files.folderNamePlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder-description">{t("files.folderDescription")}</Label>
                  <Input
                    id="folder-description"
                    value={newFolderDescription}
                    onChange={(e) => setNewFolderDescription(e.target.value)}
                    placeholder={t("files.folderDescriptionPlaceholder")}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                  {t("features.cancel")}
                </Button>
                <Button onClick={createFolder}>{t("files.createNewFolder")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                {t("files.uploadFile")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("files.uploadFileTitle")}</DialogTitle>
                <DialogDescription>
                  {t("files.uploadFileDescription")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-input">{t("files.file")}</Label>
                  <Input
                    id="file-input"
                    type="file"
                    onChange={uploadFile}
                    disabled={uploading}
                  />
                </div>
                {selectedFolder && (
                  <p className="text-sm text-muted-foreground">
                    {t("files.uploadingTo")} {folders.find(f => f.id === selectedFolder)?.name || 'Pasta selecionada'}
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t("files.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              {t("files.folders")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={selectedFolder === null ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedFolder(null)}
            >
              {t("files.allFiles")}
            </Button>
            {folders.map((folder) => (
              <Button
                key={folder.id}
                variant={selectedFolder === folder.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFolder(folder.id)}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                {folder.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Files Grid */}
        <div className="lg:col-span-3">
          {files.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("files.noFilesFound")}</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {selectedFolder 
                    ? t("files.noFilesInFolder")
                    : t("files.noFilesMessage")}
                </p>
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  {t("files.uploadFirstFile")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getFileIcon(file.file_type)}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium truncate">{file.name}</h4>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => window.open(file.file_url, '_blank')}>
                            <Eye className="h-4 w-4 mr-2" />
                            {t("files.view")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(file.file_url, '_blank')}>
                            <Download className="h-4 w-4 mr-2" />
                            {t("files.download")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleFavorite(file.id, file.is_favorite)}>
                            {file.is_favorite ? (
                              <StarOff className="h-4 w-4 mr-2" />
                            ) : (
                              <Star className="h-4 w-4 mr-2" />
                            )}
                            {file.is_favorite ? t("files.removeFromFavorites") : t("files.addToFavorites")}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteFile(file.id, file.original_name)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("files.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(file.created_at).toLocaleDateString()}
                      </span>
                      {file.is_favorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
