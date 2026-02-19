import Login from '@/components/auth/Login'

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm">
        <Login />
      </div>
    </div>
  )
}

export default LoginPage