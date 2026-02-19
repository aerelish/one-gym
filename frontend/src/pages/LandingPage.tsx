'use client'

import { useNavigate } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

function LandingPage() {
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/auth')
  }

  return <MainLayout onSignIn={handleSignIn} />
}

export default LandingPage