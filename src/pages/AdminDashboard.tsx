
import { MetricCard } from "@/components/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, CreditCard, TrendingUp, ShoppingCart, Star } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const salesData = [
  { name: "Jan", sales: 4000, transactions: 240 },
  { name: "Feb", sales: 3000, transactions: 139 },
  { name: "Mar", sales: 2000, transactions: 980 },
  { name: "Apr", sales: 2780, transactions: 390 },
  { name: "May", sales: 1890, transactions: 480 },
  { name: "Jun", sales: 2390, transactions: 380 },
]

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Fashion", value: 300 },
  { name: "Home", value: 300 },
  { name: "Books", value: 200 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your marketplace performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value="2,847"
          change={12.5}
          icon={<Users className="h-4 w-4" />}
          description="Active users this month"
        />
        <MetricCard
          title="Active Listings"
          value="1,234"
          change={-2.3}
          icon={<Package className="h-4 w-4" />}
          description="Products currently listed"
        />
        <MetricCard
          title="Monthly Revenue"
          value="$54,729"
          change={8.7}
          icon={<CreditCard className="h-4 w-4" />}
          description="Total revenue this month"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.24%"
          change={1.2}
          icon={<TrendingUp className="h-4 w-4" />}
          description="Visitors to customers"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Products awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Sellers with active listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              Platform average rating
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
