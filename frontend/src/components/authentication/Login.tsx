import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type LoginProps = {
  onToggleRegister?: () => void
}

function Login({ onToggleRegister }: LoginProps) {
  return (
    <Card className="w-full max-w-sm border">
      <div className="space-y-6 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleRegister}
              className="font-medium text-primary hover:underline"
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
