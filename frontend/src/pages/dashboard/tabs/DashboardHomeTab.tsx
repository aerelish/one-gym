import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function DashboardHomeTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Overview panel for one-gym.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-8 text-sm text-muted-foreground">
          Main dashboard widgets will go here.
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardHomeTab
