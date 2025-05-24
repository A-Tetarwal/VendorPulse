
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductListings from "./pages/ProductListings";
import UsersManagement from "./pages/UsersManagement";
import TransactionsMonitor from "./pages/TransactionsMonitor";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          <Route path="/admin/products" element={
            <AdminLayout>
              <ProductListings />
            </AdminLayout>
          } />
          <Route path="/admin/users" element={
            <AdminLayout>
              <UsersManagement />
            </AdminLayout>
          } />
          <Route path="/admin/transactions" element={
            <AdminLayout>
              <TransactionsMonitor />
            </AdminLayout>
          } />
          <Route path="/admin/settings" element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          } />
          <Route path="/" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
