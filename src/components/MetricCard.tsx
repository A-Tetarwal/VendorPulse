
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  description?: string
}

export function MetricCard({ title, value, change, icon, description }: MetricCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {isPositive && <TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
            {isNegative && <TrendingDown className="h-3 w-3 mr-1 text-red-500" />}
            <span className={cn(
              isPositive && "text-green-500",
              isNegative && "text-red-500"
            )}>
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="ml-1">from last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
