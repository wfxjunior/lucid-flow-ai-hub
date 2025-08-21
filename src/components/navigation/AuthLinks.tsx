
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function AuthLinks() {
  return (
    <div className="flex gap-2">
      <Link to="/signin">
        <Button variant="outline" size="sm">
          Entrar
        </Button>
      </Link>
      <Link to="/signin">
        <Button size="sm">
          Criar Conta
        </Button>
      </Link>
    </div>
  )
}
