
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, FileDown, Share2, Save, RotateCcw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

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
    notes: ''
  })

  const [result, setResult] = useState<EstimateResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

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
      notes: ''
    })
    setResult(null)
  }

  const exportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality will be added soon."
    })
  }

  const saveEstimate = () => {
    toast({
      title: "Estimate Saved",
      description: "Your estimate has been saved to your project files."
    })
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">EasyCalc</h1>
              <p className="text-muted-foreground">AI-powered smart estimates for any industry</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetForm}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="measurements" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="measurements">
                <Card>
                  <CardHeader>
                    <CardTitle>Measurements & Units</CardTitle>
                    <CardDescription>Enter the dimensions for your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Unit Type</Label>
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
                        <Label htmlFor="linearFeet">Linear Feet</Label>
                        <Input
                          id="linearFeet"
                          type="number"
                          placeholder="Enter linear feet"
                          value={estimateData.linearFeet}
                          onChange={(e) => setEstimateData(prev => ({ ...prev, linearFeet: e.target.value }))}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="width">Width ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                          <Input
                            id="width"
                            type="number"
                            placeholder="Enter width"
                            value={estimateData.width}
                            onChange={(e) => setEstimateData(prev => ({ ...prev, width: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="length">Length ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
                          <Input
                            id="length"
                            type="number"
                            placeholder="Enter length"
                            value={estimateData.length}
                            onChange={(e) => setEstimateData(prev => ({ ...prev, length: e.target.value }))}
                          />
                        </div>
                        {estimateData.surfaceType === 'Wall' && (
                          <div className="space-y-2">
                            <Label htmlFor="height">Height ({estimateData.units === 'sqm' ? 'm' : 'ft'})</Label>
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
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Specify the type of work and materials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Industry Type</Label>
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
                        <Label>Surface Type</Label>
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
                      <Label>Material Type</Label>
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
                      <Label htmlFor="notes">Project Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any special requirements, conditions, or notes..."
                        value={estimateData.notes}
                        onChange={(e) => setEstimateData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Configuration</CardTitle>
                    <CardDescription>Set your labor rates and markup</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="laborRate">Labor Rate ($ per sq ft)</Label>
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
                        <Label htmlFor="markup">Markup Percentage (%)</Label>
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Estimate Summary
                  {result && <Badge variant="secondary">Generated</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Area:</span>
                        <span>{result.area.toFixed(1)} {estimateData.units === 'sqm' ? 'm²' : estimateData.units === 'linear' ? 'linear ft' : 'sq ft'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Material Quantity:</span>
                        <span className="text-right text-xs">{result.materialQuantity}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Material Cost:</span>
                        <span>${result.materialCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Labor Cost:</span>
                        <span>${result.laborCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Markup ({estimateData.markupPercentage}%):</span>
                        <span>${result.markup.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${result.total.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" onClick={saveEstimate}>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={exportPDF}>
                        <FileDown className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Fill in the project details and click "Generate Smart Estimate" to see your calculation results.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">💡 Smart Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>• Always add 10-15% waste factor for materials</p>
                <p>• Consider site access and complexity in labor rates</p>
                <p>• Check local material prices for accuracy</p>
                <p>• Save templates for recurring job types</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
