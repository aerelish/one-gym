import type { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type MainLayoutProps = {
  children?: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout