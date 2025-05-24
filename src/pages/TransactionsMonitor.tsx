
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  buyerName: string
  sellerName: string
  productName: string
  amount: number
  status: "completed" | "pending" | "cancelled" | "refunded"
  date: string
  paymentMethod: string
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    buyerName: "Alice Johnson",
    sellerName: "TechStore",
    productName: "iPhone 15 Pro",
    amount: 999,
    status: "completed",
    date: "2024-01-15T14:30:00Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "TXN-002",
    buyerName: "Bob Smith",
    sellerName: "ShoeMart",
    productName: "Nike Air Max",
    amount: 129,
    status: "pending",
    date: "2024-01-15T10:15:00Z",
    paymentMethod: "PayPal",
  },
  {
    id: "TXN-003",
    buyerName: "Carol Davis",
    sellerName: "HomeGoods",
    productName: "Coffee Maker",
    amount: 79,
    status: "refunded",
    date: "2024-01-14T16:45:00Z",
    paymentMethod: "Credit Card",
  },
]

export default function TransactionsMonitor() {
  const [transactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "refunded":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Refunded</Badge>
      default:
        return null
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction Monitor</h1>
        <p className="text-muted-foreground">Monitor and manage all platform transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredTransactions.filter(t => t.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredTransactions.filter(t => t.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>{transaction.buyerName}</TableCell>
                    <TableCell>{transaction.sellerName}</TableCell>
                    <TableCell>{transaction.productName}</TableCell>
                    <TableCell className="font-medium">${transaction.amount}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
