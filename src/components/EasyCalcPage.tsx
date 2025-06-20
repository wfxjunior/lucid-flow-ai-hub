import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, FileDown, Share2, Save, RotateCcw, Plus, Minus, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface DimensionPair {
  id: string
  width: string
  length: string
}

interface EstimateData {
  width: string
  length: string
  height: string
  linearFeet: string
  units: 'sqft' | 'sqm' | 'linear'
  industry: string
  surfaceType: string
  materialType: string
  laborRate: string
  markupPercentage: string
  notes: string
  dimensions: DimensionPair[]
}

interface EstimateResult {
  area: number
  materialCost: number
  laborCost: number
  markup: number
  total: number
  materialQuantity: string
}

export function EasyCalcPage() {
  const { toast } = useToast()
  const [estimateData, setEstimateData] = useState<EstimateData>({
    width: '',
    length: '',
    height: '',
    linearFeet: '',
    units: 'sqft',
    industry: '',
    surfaceType: '',
    materialType: '',
    laborRate: '50',
    markupPercentage: '20',
    notes: '',
    dimensions: []
  })

  const [result, setResult] = useState<EstimateResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [projectName, setProjectName] = useState('')

  const industries = [
    'Flooring',
    'Painting',
    'Landscaping',
    'Cleaning',
    'Fencing',
    'Carpentry',
    'Drywall',
    'Tile',
    'Roofing',
    'Plumbing',
    'Electrical',
    'Other'
  ]

  const surfaceTypes = [
    'Floor',
    'Wall', 
    'Ceiling',
    'Exterior',
    'Deck/Patio',
    'Stairs',
    'Other'
  ]

  const materialTypes = [
    'Vinyl',
    'Hardwood',
    'Tile',
    'Paint (Interior)',
    'Paint (Exterior)',
    'Laminate',
    'Carpet',
    'Drywall',
    'Lumber',
    'Concrete',
    'Custom'
  ]

  const addDimensionPair = () => {
    if (estimateData.dimensions.length >= 10) {
      toast({
        title: "Maximum Reached",
        description: "You can add up to 10 dimension pairs maximum.",
        variant: "destructive"
      })
      return
    }

    const newDimension: DimensionPair = {
      id: Date.now().toString(),
      width: '',
      length: ''
    }

    setEstimateData(prev => ({
      ...prev,
      dimensions: [...prev.dimensions, newDimension]
    }))
  }

  const removeDimensionPair = (id: string) => {
    setEstimateData(prev => ({
      ...prev,
      dimensions: prev.dimensions.filter(dim => dim.id !== id)
    }))
  }

  const updateDimensionPair = (id: string, field: 'width' | 'length', value: string) => {
    setEstimateData(prev => ({
      ...prev,
      dimensions: prev.dimensions.map(dim => 
        dim.id === id ? { ...dim, [field]: value } : dim
      )
    }))
  }

  const calculateEstimate = async () => {
    setIsCalculating(true)
    
    try {
      // Calculate area based on measurement type
      let area = 0
      if (estimateData.units === 'linear') {
        area = parseFloat(estimateData.linearFeet) || 0
      } else {
        const width = parseFloat(estimateData.width) || 0
        const length = parseFloat(estimateData.length) || 0
        const height = parseFloat(estimateData.height) || 1
        
        if (estimateData.surfaceType === 'Wall') {
          area = (width * height) + (length * height)
        } else {
          area = width * length
        }

        // Add areas from additional dimension pairs
        estimateData.dimensions.forEach(dim => {
          const dimWidth = parseFloat(dim.width) || 0
          const dimLength = parseFloat(dim.length) || 0
          if (estimateData.surfaceType === 'Wall') {
            area += (dimWidth * height) + (dimLength * height)
          } else {
            area += dimWidth * dimLength
          }
        })
      }

      // Convert to square meters if needed
      if (estimateData.units === 'sqm') {
        area = area * 10.764 // Convert m² to ft² for calculations
      }

      // AI-powered material cost estimation based on industry and material
      const materialCostPerUnit = getMaterialCostEstimate(
        estimateData.industry,
        estimateData.materialType,
        estimateData.surfaceType
      )

      const materialCost = area * materialCostPerUnit
      const laborRate = parseFloat(estimateData.laborRate) || 50
      const laborCost = area * (laborRate / 100) // Labor cost per sq ft
      
      const subtotal = materialCost + laborCost
      const markupPercentage = parseFloat(estimateData.markupPercentage) || 0
      const markup = subtotal * (markupPercentage / 100)
      const total = subtotal + markup

      const materialQuantity = getMaterialQuantityEstimate(
        estimateData.industry,
        estimateData.materialType,
        area
      )

      setResult({
        area: estimateData.units === 'sqm' ? area / 10.764 : area,
        materialCost,
        laborCost,
        markup,
        total,
        materialQuantity
      })

      toast({
        title: "Estimate Generated",
        description: "Your smart estimate has been calculated successfully."
      })

    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your estimate.",
        variant: "destructive"
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const getMaterialCostEstimate = (industry: string, material: string, surface: string): number => {
    // AI-powered cost estimation logic
    const baseCosts: Record<string, number> = {
      'Vinyl': 3.50,
      'Hardwood': 8.00,
      'Tile': 5.50,
      'Paint (Interior)': 1.50,
      'Paint (Exterior)': 2.00,
      'Laminate': 4.50,
      'Carpet': 3.00,
      'Drywall': 1.80,
      'Lumber': 4.00,
      'Concrete': 6.00
    }

    let baseCost = baseCosts[material] || 3.00

    // Industry multipliers
    if (industry === 'Flooring' && surface === 'Floor') baseCost *= 1.1
    if (industry === 'Painting' && surface === 'Exterior') baseCost *= 1.3
    if (industry === 'Tile' && surface === 'Wall') baseCost *= 1.2

    return baseCost
  }

  const getMaterialQuantityEstimate = (industry: string, material: string, area: number): string => {
    const wasteFactor = 1.1 // 10% waste factor

    if (material.includes('Paint')) {
      const gallons = Math.ceil((area / 350) * wasteFactor)
      return `${gallons} gallon${gallons > 1 ? 's' : ''} of paint`
    }

    if (material === 'Tile' || material === 'Vinyl' || material === 'Laminate') {
      const sqft = Math.ceil(area * wasteFactor)
      return `${sqft} sq ft of ${material.toLowerCase()}`
    }

    if (material === 'Drywall') {
      const sheets = Math.ceil((area / 32) * wasteFactor) // 4x8 sheets
      return `${sheets} drywall sheet${sheets > 1 ? 's' : ''} (4x8)`
    }

    return `${Math.ceil(area * wasteFactor)} sq ft of materials`
  }

  const resetForm = () => {
    setEstimateData({
      width: '',
      length: '',
      height: '',
      linearFeet: '',
      units: 'sqft',
      industry: '',
      surfaceType: '',
      materialType: '',
      laborRate: '50',
      markupPercentage: '20',
      notes: '',
      dimensions: []
    })
    setResult(null)
    setProjectName('')
  }

  const exportProject = () => {
    const projectData = {
      name: projectName || 'Untitled Project',
      estimate: estimateData,
      result: result,
      timestamp: new Date().toISOString()
    }

    const dataStr = JSON.stringify(projectData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${projectName || 'easycalc-project'}.json`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Project Exported",
      description: "Your project has been exported successfully."
    })
  }

  const importProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target?.result as string)
        setEstimateData(projectData.estimate)
        setResult(projectData.result)
        setProjectName(projectData.name)
        
        toast({
          title: "Project Loaded",
          description: "Your project has been loaded successfully."
        })
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Failed to load project file.",
          variant: "destructive"
        })
      }
    }
    reader.readAsText(file)
  }

  const exportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality will be added soon."
    })
  }

  const saveEstimate = () => {
    const projectData = {
      name: projectName || 'Untitled Project',
      estimate: estimateData,
      result: result,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('easycalc-project', JSON.stringify(projectData))
    
    toast({
      title: "Project Saved",
      description: "Your project has been saved locally."
    })
  }

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header - Responsive */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">EasyCalc</h1>
                <p className="text-sm sm:text-base text-muted-foreground">AI-powered smart estimates for any industry</p>
              </div>
            </div>
            
            {/* Project Name Input - Full width on mobile */}
            <div className="w-full sm:w-auto">
              <Input
                placeholder="Project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full sm:w-48"
              />
            </div>
          </div>

          {/* Action Buttons - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <Button variant="outline" onClick={exportProject} className="text-xs sm:text-sm">
              <FileDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Export</span>
              <span className="xs:hidden">Export</span>
            </Button>
            <Button variant="outline" asChild className="text-xs sm:text-sm">
              <label htmlFor="import-project" className="cursor-pointer">
                <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Import</span>
                <span className="xs:hidden">Import</span>
                <input
                  id="import-project"
                  type="file"
                  accept=".json"
                  onChange={importProject}
                  className="hidden"
                />
              </label>
            </Button>
            <Button variant="outline" onClick={saveEstimate} className="text-xs sm:text-sm">
              <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Save</span>
              <span className="xs:hidden">Save</span>
            </Button>
            <Button variant="outline" onClick={resetForm} className="text-xs sm:text-sm">
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Reset</span>
              <span className="xs:hidden">Reset</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Input Form */}
          <div className="xl:col-span-2">
            <Tabs defaultValue="measurements" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="measurements" className="text-xs sm:text-sm">Measurements</TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm">Job Details</TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs sm:text-sm">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="measurements">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl">Measurements & Units</CardTitle>
                    <CardDescription className="text-sm">Enter the dimensions for your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2 sm:col-span-1">
                        <Label className="text-sm">Unit Type</Label>
                        <Select value={estimateData.units} onValueChange={(value: 'sqft' | 'sqm' | 'linear') => 
                          setEstimateData(prev => ({ ...prev, units: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sqft">Square Feet</SelectItem>
                            <SelectItem value="sqm">Square Meters</SelectItem>
                            <SelectItem value="linear">Linear Feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {estimateData.units === 'linear' ? (
                      <div className="space-y-2">
                        <Label htmlFor="linearFeet" className="text-sm">Linear Feet</Label>
                        <Input
                          id="linearFeet"
                          type="number"
                          placeholder="Enter linear feet"
                          value={estimateData.linearFeet}
                          onChange={(e) => setEstimateData(prev => ({ ...prev, linearFeet: e.target.value }))}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Primary Area</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="width" className="text-sm">Width ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                              <Input
                                id="width"
                                type="number"
                                placeholder="Enter width"
                                value={estimateData.width}
                                onChange={(e) => setEstimateData(prev => ({ ...prev, width: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="length" className="text-sm">Length ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                              <Input
                                id="length"
                                type="number"
                                placeholder="Enter length"
                                value={estimateData.length}
                                onChange={(e) => setEstimateData(prev => ({ ...prev, length: e.target.value }))}
                              />
                            </div>
                            {estimateData.surfaceType === 'Wall' && (
                              <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="height" className="text-sm">Height ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                                <Input
                                  id="height"
                                  type="number"
                                  placeholder="Enter height"
                                  value={estimateData.height}
                                  onChange={(e) => setEstimateData(prev => ({ ...prev, height: e.target.value }))}
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <Separator />

                        {/* Additional Dimension Pairs */}
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h4 className="text-sm font-medium">Additional Areas</h4>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addDimensionPair}
                              disabled={estimateData.dimensions.length >= 10}
                              className="w-full sm:w-auto text-xs sm:text-sm"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              Add Area
                            </Button>
                          </div>

                          {estimateData.dimensions.map((dimension, index) => (
                            <div key={dimension.id} className="space-y-2 p-3 sm:p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Area {index + 2}</Label>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeDimensionPair(dimension.id)}
                                  className="text-xs"
                                >
                                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm">Width ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                                  <Input
                                    type="number"
                                    placeholder="Enter width"
                                    value={dimension.width}
                                    onChange={(e) => updateDimensionPair(dimension.id, 'width', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Length ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                                  <Input
                                    type="number"
                                    placeholder="Enter length"
                                    value={dimension.length}
                                    onChange={(e) => updateDimensionPair(dimension.id, 'length', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          {estimateData.dimensions.length < 10 && (
                            <div className="text-center text-xs sm:text-sm text-muted-foreground">
                              You can add up to {10 - estimateData.dimensions.length} more areas
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl">Job Details</CardTitle>
                    <CardDescription className="text-sm">Specify the type of work and materials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Industry Type</Label>
                        <Select value={estimateData.industry} onValueChange={(value) => 
                          setEstimateData(prev => ({ ...prev, industry: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map(industry => (
                              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Surface Type</Label>
                        <Select value={estimateData.surfaceType} onValueChange={(value) => 
                          setEstimateData(prev => ({ ...prev, surfaceType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select surface" />
                          </SelectTrigger>
                          <SelectContent>
                            {surfaceTypes.map(surface => (
                              <SelectItem key={surface} value={surface}>{surface}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Material Type</Label>
                      <Select value={estimateData.materialType} onValueChange={(value) => 
                        setEstimateData(prev => ({ ...prev, materialType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materialTypes.map(material => (
                            <SelectItem key={material} value={material}>{material}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm">Project Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any special requirements, conditions, or notes..."
                        value={estimateData.notes}
                        onChange={(e) => setEstimateData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl">Pricing Configuration</CardTitle>
                    <CardDescription className="text-sm">Set your labor rates and markup</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="laborRate" className="text-sm">Labor Rate ($ per sq ft)</Label>
                        <Input
                          id="laborRate"
                          type="number"
                          step="0.01"
                          placeholder="50.00"
                          value={estimateData.laborRate}
                          onChange={(e) => setEstimateData(prev => ({ ...prev, laborRate: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="markup" className="text-sm">Markup Percentage (%)</Label>
                        <Input
                          id="markup"
                          type="number"
                          placeholder="20"
                          value={estimateData.markupPercentage}
                          onChange={(e) => setEstimateData(prev => ({ ...prev, markupPercentage: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={calculateEstimate} 
                      className="w-full" 
                      disabled={isCalculating}
                      size="lg"
                    >
                      {isCalculating ? "Calculating..." : "Generate Smart Estimate"}
                      <Calculator className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  Estimate Summary
                  {result && <Badge variant="secondary" className="text-xs">Generated</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Total Area:</span>
                        <span>{result.area.toFixed(1)} {estimateData.units === 'sqm' ? 'm²' : estimateData.units === 'linear' ? 'linear ft' : 'sq ft'}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Material Quantity:</span>
                        <span className="text-right text-xs">{result.materialQuantity}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Material Cost:</span>
                        <span>${result.materialCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Labor Cost:</span>
                        <span>${result.laborCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Markup ({estimateData.markupPercentage}%):</span>
                        <span>${result.markup.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-base sm:text-lg">
                      <span>Total:</span>
                      <span>${result.total.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4">
                      <Button variant="outline" size="sm" onClick={exportPDF} className="text-xs">
                        <FileDown className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={saveEstimate} className="text-xs">
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-6 sm:py-8">
                    <Calculator className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-xs sm:text-sm px-2">Fill in the project details and click "Generate Smart Estimate" to see your calculation results.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips Card */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-sm">💡 Smart Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 p-4 sm:p-6">
                <p>• Use the + button to add multiple rooms/areas</p>
                <p>• Export your project to save and edit later</p>
                <p>• Always add 10-15% waste factor for materials</p>
                <p>• Consider site access and complexity in labor rates</p>
                <p>• Check local material prices for accuracy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
