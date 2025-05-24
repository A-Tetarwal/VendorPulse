
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Calendar, ShoppingBag, Star } from "lucide-react"
import { useState } from "react"

interface UserProfile {
  id: string
  name: string
  email: string
  role: "seller" | "buyer"
  joinedAt: string
  avatar?: string
  stats: {
    totalTransactions: number
    rating: number
    totalSales?: number
  }
  status: "active" | "suspended" | "pending"
}

interface UserProfileCardProps {
  user: UserProfile
  onStatusChange: (id: string, status: "active" | "suspended") => void
}

export function UserProfileCard({ user, onStatusChange }: UserProfileCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleStatus = async () => {
    setIsLoading(true)
    const newStatus = user.status === "active" ? "suspended" : "active"
    try {
      onStatusChange(user.id, newStatus)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    return (
      <Badge variant="outline" className={role === "seller" ? "border-blue-500 text-blue-500" : "border-purple-500 text-purple-500"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span>{user.stats.totalTransactions} transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span>{user.stats.rating}/5 rating</span>
            </div>
            {user.role === "seller" && user.stats.totalSales && (
              <div className="flex items-center gap-2">
                <span className="font-medium">${user.stats.totalSales} total sales</span>
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t">
            <Button
              onClick={handleToggleStatus}
              disabled={isLoading || user.status === "pending"}
              variant={user.status === "active" ? "destructive" : "default"}
              size="sm"
              className="w-full"
            >
              {user.status === "active" ? "Suspend User" : "Activate User"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
