
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/auth/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage('')
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <Card className="w-full max-w-sm border">
      <div className="space-y-6 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setErrorMessage('')
            login({ email: form.email, password: form.password })
            try {
              await login({ email: form.email, password: form.password })
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(error.message)
                return
              }
              setErrorMessage('Login Failed')
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name='password'
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          {errorMessage ? (
            <p className="text-sm text-center text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </Card>
  )
}

export default Login
