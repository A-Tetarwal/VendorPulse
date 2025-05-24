
import { ProductApprovalCard } from "@/components/ProductApprovalCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search } from "lucide-react"

// Mock data
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    seller: "TechStore",
    price: 999,
    category: "Electronics",
    status: "pending" as const,
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Nike Air Max",
    seller: "ShoeMart",
    price: 129,
    category: "Fashion",
    status: "approved" as const,
    submittedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    name: "Coffee Maker",
    seller: "HomeGoods",
    price: 79,
    category: "Home",
    status: "rejected" as const,
    submittedAt: "2024-01-13T09:20:00Z",
  },
]

export default function ProductListings() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, status } : product
      )
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Product Listings</h1>
        <p className="text-muted-foreground">Manage and approve product listings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products or sellers..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductApprovalCard
            key={product.id}
            product={product}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
