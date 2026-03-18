import Link from "next/link";
import { Package, Users, ShoppingCart, BarChart3, LogOut, SlidersHorizontal } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-bold text-lg tracking-tight">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100/50 text-gray-700">
            <BarChart3 className="h-4 w-4" />
            Dashboard (Revenue)
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100/50 text-gray-700">
            <Package className="h-4 w-4" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100/50 text-gray-700">
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link href="/admin/filters" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100/50 text-gray-700">
            <SlidersHorizontal className="h-4 w-4" />
            Category Filters
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100/50 text-gray-700">
            <Users className="h-4 w-4" />
            Users
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header logic could go here, omitting for brevity */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
