'use client'

import { useState } from 'react'
import Login from '@/components/authentication/Login'
import Register from '@/components/authentication/Register'

function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm">
        {isLogin ? (
          <Login onToggleRegister={() => setIsLogin(false)} />
        ) : (
          <Register onToggleLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}

export default AuthenticationPage