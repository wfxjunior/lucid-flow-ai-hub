import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Globe } from "lucide-react"

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", languages: ["en-US"] },
  { code: "DE", name: "Germany", flag: "🇩🇪", languages: ["de"] },
  { code: "FR", name: "France", flag: "🇫🇷", languages: ["fr"] },
  { code: "ES", name: "Spain", flag: "🇪🇸", languages: ["es"] },
  { code: "CN", name: "China", flag: "🇨🇳", languages: ["zh"] },
  { code: "BR", name: "Brazil", flag: "🇧🇷", languages: ["pt-BR"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", languages: ["en-US"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", languages: ["en-US", "fr"] },
  { code: "MX", name: "Mexico", flag: "🇲🇽", languages: ["es"] },
  { code: "IT", name: "Italy", flag: "🇮🇹", languages: ["en-US"] },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", languages: ["en-US"] },
  { code: "SE", name: "Sweden", flag: "🇸🇪", languages: ["en-US"] },
  { code: "NO", name: "Norway", flag: "🇳🇴", languages: ["en-US"] },
  { code: "DK", name: "Denmark", flag: "🇩🇰", languages: ["en-US"] },
  { code: "FI", name: "Finland", flag: "🇫🇮", languages: ["en-US"] },
]

const Auth = () => {
  const { t, setLanguage } = useLanguage()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: ""
  })

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate("/dashboard")
      }
    }
    checkAuth()
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou senha incorretos")
        } else {
          toast.error(error.message || "Erro no login")
        }
        return
      }

      if (data.user) {
        toast.success("Login realizado com sucesso!")
        navigate("/dashboard")
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error("Erro inesperado no login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("As senhas não coincidem")
      return
    }

    if (!signupData.country) {
      toast.error("Por favor, selecione seu país")
      return
    }

    if (signupData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: signupData.firstName,
            last_name: signupData.lastName,
            country: signupData.country,
          }
        }
      })

      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("Este email já está cadastrado. Tente fazer login.")
        } else {
          toast.error(error.message || "Erro no cadastro")
        }
        return
      }

      if (data.user) {
        // Set language based on country
        const country = countries.find(c => c.code === signupData.country)
        if (country && country.languages.length > 0) {
          setLanguage(country.languages[0])
        }
        
        toast.success("Conta criada! Verifique seu email para confirmar a conta.")
        navigate("/dashboard")
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error("Erro inesperado no cadastro")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCountryChange = (countryCode: string) => {
    setSignupData({ ...signupData, country: countryCode })
    setSelectedCountry(countryCode)
    
    // Auto-set language based on country
    const country = countries.find(c => c.code === countryCode)
    if (country && country.languages.length > 0) {
      setLanguage(country.languages[0])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">FeatherBiz</h1>
          <p className="text-gray-600">Plataforma Empresarial com IA</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Bem-vindo</CardTitle>
            <CardDescription className="text-center">
              Faça login na sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="country">País</Label>
                    <Select value={signupData.country} onValueChange={handleCountryChange} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu país" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Criando Conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-sm text-gray-500"
            disabled={isLoading}
          >
            ← Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Auth
