
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Marketplace Admin",
    siteDescription: "A comprehensive marketplace administration panel",
    autoApproveProducts: false,
    requireEmailVerification: true,
    maxProductImages: 5,
    commissionRate: 5,
    maintenanceMode: false,
    supportEmail: "support@marketplace.com",
    termsOfService: "",
    privacyPolicy: "",
  })
  
  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would save to your backend
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your marketplace configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange("supportEmail", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Product Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoApprove">Auto-approve Products</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically approve new product listings
                </p>
              </div>
              <Switch
                id="autoApprove"
                checked={settings.autoApproveProducts}
                onCheckedChange={(checked) => handleInputChange("autoApproveProducts", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="maxImages">Max Product Images</Label>
              <Input
                id="maxImages"
                type="number"
                value={settings.maxProductImages}
                onChange={(e) => handleInputChange("maxProductImages", parseInt(e.target.value))}
                min="1"
                max="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                value={settings.commissionRate}
                onChange={(e) => handleInputChange("commissionRate", parseFloat(e.target.value))}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Settings */}
        <Card>
          <CardHeader>
            <CardTitle>User Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailVerification">Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Users must verify their email before listing products
                </p>
              </div>
              <Switch
                id="emailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleInputChange("requireEmailVerification", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable the marketplace for maintenance
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="termsOfService">Terms of Service</Label>
            <Textarea
              id="termsOfService"
              value={settings.termsOfService}
              onChange={(e) => handleInputChange("termsOfService", e.target.value)}
              rows={6}
              placeholder="Enter your terms of service..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="privacyPolicy">Privacy Policy</Label>
            <Textarea
              id="privacyPolicy"
              value={settings.privacyPolicy}
              onChange={(e) => handleInputChange("privacyPolicy", e.target.value)}
              rows={6}
              placeholder="Enter your privacy policy..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
