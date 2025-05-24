
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  seller: string
  price: number
  category: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  image?: string
}

interface ProductApprovalCardProps {
  product: Product
  onStatusChange: (id: string, status: "approved" | "rejected") => void
}

export function ProductApprovalCard({ product, onStatusChange }: ProductApprovalCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      onStatusChange(product.id, "approved")
      toast({
        title: "Product Approved",
        description: `${product.name} has been approved for listing.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve product.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    setIsLoading(true)
    try {
      onStatusChange(product.id, "rejected")
      toast({
        title: "Product Rejected",
        description: `${product.name} has been rejected.`,
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject product.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case "approved":
        return <Badge variant="default" className="bg-green-500"><Check className="h-3 w-3 mr-1" />Approved</Badge>
      case "rejected":
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">by {product.seller}</p>
          </div>
          {getStatusBadge(product.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Price:</span> ${product.price}
            </div>
            <div>
              <span className="font-medium">Category:</span> {product.category}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Submitted:</span> {new Date(product.submittedAt).toLocaleDateString()}
            </div>
          </div>
          
          {product.status === "pending" && (
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="flex-1"
                size="sm"
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                variant="destructive"
                className="flex-1"
                size="sm"
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
