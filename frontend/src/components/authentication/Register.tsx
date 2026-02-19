import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type RegisterProps = {
  onToggleLogin?: () => void
}

function Register({ onToggleLogin }: RegisterProps) {
  return (
    <Card className="w-full max-w-sm border">
      <div className="space-y-6 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started with One Gym
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleLogin}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </Card>
  )
}

export default Register
