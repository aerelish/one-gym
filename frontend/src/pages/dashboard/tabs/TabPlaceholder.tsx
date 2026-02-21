import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type TabPlaceholderProps = {
  title: string
  description: string
}

function TabPlaceholder({ title, description }: TabPlaceholderProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-8 text-sm text-muted-foreground">
          Placeholder content for {title}.
        </div>
      </CardContent>
    </Card>
  )
}

export default TabPlaceholder
