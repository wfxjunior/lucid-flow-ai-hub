
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const questionnaireSchema = z.object({
  // Business Information
  businessActivity: z.string().min(1, "Please select your main business activity"),
  serviceType: z.enum(["residential", "commercial", "both"], {
    required_error: "Please select your service type"
  }),
  companySize: z.string().min(1, "Please select your company size"),
  employmentType: z.enum(["full-time", "part-time", "mixed"], {
    required_error: "Please select employment type"
  }),
  businessDuration: z.enum(["new", "established", "expanding"], {
    required_error: "Please select business stage"
  }),
  primaryIndustry: z.enum(["construction", "service", "consulting", "other"], {
    required_error: "Please select your primary industry"
  }),
  
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  
  // Terms and Privacy
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to our privacy policy"
  })
})

type QuestionnaireFormData = z.infer<typeof questionnaireSchema>

interface FreeTrialQuestionnaireProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (data: QuestionnaireFormData) => void
}

export function FreeTrialQuestionnaire({ open, onOpenChange, onComplete }: FreeTrialQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()
  
  const form = useForm<QuestionnaireFormData>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      agreeToTerms: false,
      privacyConsent: false
    }
  })

  const businessActivities = [
    "HVAC", "Plumbing", "Flooring", "Electrical", "Pest Control", 
    "Landscaping", "Commercial Cleaning", "Pool Services", "Roofing", 
    "Septic", "IT", "Beauty", "General Services", "Other"
  ]

  const companySizes = [
    "Just me", "2-5 employees", "6-15 employees", "16-50 employees", "50+ employees"
  ]

  const nextStep = async () => {
    const currentStepFields = getCurrentStepFields()
    const isValid = await form.trigger(currentStepFields)
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const getCurrentStepFields = (): (keyof QuestionnaireFormData)[] => {
    switch (currentStep) {
      case 1:
        return ["businessActivity", "serviceType", "primaryIndustry"]
      case 2:
        return ["companySize", "employmentType", "businessDuration"]
      case 3:
        return ["firstName", "lastName", "email", "phone"]
      case 4:
        return ["agreeToTerms", "privacyConsent"]
      default:
        return []
    }
  }

  const onSubmit = (data: QuestionnaireFormData) => {
    toast({
      title: "Welcome to FeatherBiz!",
      description: "Your account is being set up with your preferences.",
    })
    onComplete(data)
    onOpenChange(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Tell us about your business</h3>
              <p className="text-gray-600">This helps us customize your experience</p>
            </div>
            
            <FormField
              control={form.control}
              name="businessActivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your main business activity?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business activity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessActivities.map((activity) => (
                        <SelectItem key={activity} value={activity.toLowerCase()}>
                          {activity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you serve residential or commercial clients?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="residential" id="residential" />
                        <Label htmlFor="residential">Residential only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="commercial" id="commercial" />
                        <Label htmlFor="commercial">Commercial only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both residential and commercial</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primaryIndustry"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Which industry best describes your business?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="construction" id="construction" />
                        <Label htmlFor="construction">Construction & Trades</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="service" id="service" />
                        <Label htmlFor="service">Service Industry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="consulting" id="consulting" />
                        <Label htmlFor="consulting">Consulting & Professional</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Company details</h3>
              <p className="text-gray-600">Help us understand your team structure</p>
            </div>

            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many people work in your company?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size.toLowerCase().replace(/\s+/g, '-')}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Are your employees primarily full-time or part-time?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time">Mostly full-time employees</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="part-time" />
                        <Label htmlFor="part-time">Mostly part-time employees</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mixed" id="mixed" />
                        <Label htmlFor="mixed">Mix of full-time and part-time</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessDuration"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What stage is your business in?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">Just starting out (less than 1 year)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="established" id="established" />
                        <Label htmlFor="established">Established business (1+ years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expanding" id="expanding" />
                        <Label htmlFor="expanding">Growing and expanding</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Your contact information</h3>
              <p className="text-gray-600">We'll use this to set up your account</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Privacy & Terms</h3>
              <p className="text-gray-600">Your information is safe with us</p>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Your privacy matters to us</h4>
                    <p className="text-sm text-green-700 mt-1">
                      We take data security seriously. Your personal information is encrypted and stored securely. 
                      We never share your data with third parties without your explicit consent, and you can 
                      delete your account and data at any time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="privacyConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I consent to the collection and processing of my personal information as described in the Privacy Policy
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to the Terms of Service and End User License Agreement
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Start Your Free Trial</DialogTitle>
          <DialogDescription>
            Step {currentStep} of 4 - Let's customize FeatherBiz for your business
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {renderStep()}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Start Free Trial
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
