
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate, useLocation } from 'react-router-dom'
import { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  // TEMPORARY: Disable authentication for all routes during configuration
  // TODO: Re-enable authentication when configuration is complete
  return <>{children}</>
}
