import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Thermometer, Map, Layers, Bell } from 'lucide-react'

export function FeatureCards() {
  const items = [
    { icon: Thermometer, title: 'Unified heat score', text: 'Blend temperature, canopy, and social data into a single, transparent index.' },
    { icon: Map, title: 'Neighborhood granularity', text: 'Visualize risk by region with clickable drill-downs and charts.' },
    { icon: Layers, title: 'Layer toggles', text: 'Enable vegetation, heat, demographics, and trends for deeper insight.' },
    { icon: Bell, title: 'Proactive alerts', text: 'Get notified when thresholds are exceeded in your area.' },
  ]
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-12">
      <Badge variant="outline">Features</Badge>
      <h2 className="mt-3 text-2xl font-semibold">What you get</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Card key={it.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <it.icon className="h-5 w-5" />
                <CardTitle className="text-base">{it.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{it.text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
