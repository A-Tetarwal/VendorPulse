
import { UserProfileCard } from "@/components/UserProfileCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Search } from "lucide-react"

// Define a unified User type with relaxed status
type User = {
  id: string,
  name: string,
  email: string,
  role: "seller" | "buyer",
  joinedAt: string,
  stats: { totalTransactions: number, rating: number, totalSales?: number },
  status: "active" | "suspended"
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "seller",
    joinedAt: "2023-06-15T10:30:00Z",
    stats: {
      totalTransactions: 47,
      rating: 4.8,
      totalSales: 12500,
    },
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "buyer",
    joinedAt: "2023-08-22T14:20:00Z",
    stats: {
      totalTransactions: 23,
      rating: 4.5,
    },
    status: "active",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "seller",
    joinedAt: "2023-09-10T09:15:00Z",
    stats: {
      totalTransactions: 15,
      rating: 3.9,
      totalSales: 3200,
    },
    status: "suspended",
  },
]

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended" | "pending">("all")
  const [activeTab, setActiveTab] = useState<"all" | "seller" | "buyer">("all")

  const handleStatusChange = (id: string, status: "active" | "suspended") => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status } : user
      )
    )
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesTab = activeTab === "all" || user.role === activeTab

    return matchesSearch && matchesStatus && matchesTab
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">Manage sellers and buyers on your platform</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="seller">Sellers</TabsTrigger>
          <TabsTrigger value="buyer">Buyers</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserProfileCard
                key={user.id}
                user={user}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
