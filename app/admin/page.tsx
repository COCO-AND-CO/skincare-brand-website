"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  IndianRupee, ShoppingCart, Users, Package,
  TrendingUp, Activity, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

// Types
interface Stats {
  revenue: number;
  orders: number;
  users: number;
  products: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ revenue: 0, orders: 0, users: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<any[]>([]);
  const [topProductsData, setTopProductsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [ordersSnap, usersSnap, productsSnap] = await Promise.all([
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "users")),
          getDocs(collection(db, "products")),
        ]);

        let totalRev = 0;
        let activeOrds = 0;
        const allOrders = ordersSnap.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });

        allOrders.forEach((data: any) => {
          if (data.status !== "Cancelled") {
            totalRev += data.totalAmount || 0;
          }
          if (data.status === "Pending" || data.status === "Shipped") {
            activeOrds++;
          }
        });

        setStats({
          revenue: totalRev,
          orders: activeOrds,
          users: usersSnap.size,
          products: productsSnap.size
        });

        // Generate real chart data safely handling empty DBs
        const today = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let last7Days: any = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          last7Days.push({
            name: days[d.getDay()],
            dateStr: d.toDateString(),
            revenue: 0,
            orders: 0,
            users: 0,
            aov: 0
          });
        }

        allOrders.forEach((order: any) => {
          if (!order.createdAt) return;
          const orderDate = order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
          const orderDateStr = orderDate.toDateString();

          const targetDay = last7Days.find((d: any) => d.dateStr === orderDateStr);
          if (targetDay) {
            targetDay.orders += 1;
            if (order.status !== "Cancelled") {
              targetDay.revenue += (order.totalAmount || 0);
            }
          }
        });

        // Calc AOV and users
        last7Days.forEach((day: any) => {
          day.aov = day.orders > 0 ? Math.round(day.revenue / day.orders) : 0;
        });

        usersSnap.docs.forEach((doc) => {
          const data = doc.data();
          if (data.createdAt) {
            const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
            const dateStr = date.toDateString();
            const targetDay = last7Days.find((d: any) => d.dateStr === dateStr);
            if (targetDay) {
              targetDay.users += 1;
            }
          }
        });

        setChartData(last7Days);

        // Order Status
        let statusMap: Record<string, number> = {
          "Pending": 0,
          "Shipped": 0,
          "Delivered": 0,
          "Cancelled": 0
        };
        allOrders.forEach((order: any) => {
          const status = order.status || "Pending";
          if (statusMap[status] !== undefined) {
            statusMap[status] += 1;
          } else {
            statusMap[status] = 1;
          }
        });
        const statusColors: any = {
          "Pending": "#f59e0b",
          "Shipped": "#3b82f6",
          "Delivered": "#10b981",
          "Cancelled": "#ef4444"
        };
        const statusData = Object.keys(statusMap).filter(k => statusMap[k] > 0).map((key) => {
          return { name: key, value: statusMap[key], color: statusColors[key] || "#94a3b8" };
        });
        setOrderStatusData(statusData.length > 0 ? statusData : [{ name: "No Orders", value: 1, color: "#e2e8f0" }]);

        // Top Products
        let productSales: Record<string, number> = {};
        allOrders.forEach((order: any) => {
          const items = order.items || order.cartItems || [];
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              const name = item.name || item.productName || item.title || "Unknown";
              const qty = item.quantity || item.qty || 1;
              productSales[name] = (productSales[name] || 0) + qty;
            });
          }
        });
        const topProducts = Object.keys(productSales)
          .map(name => ({ name: name.length > 15 ? name.substring(0, 15) + '...' : name, fullName: name, sales: productSales[name] }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
        setTopProductsData(topProducts.length > 0 ? topProducts : [{ name: "No Data", sales: 0 }]);


        // Fetch Recent 5 Orders
        const sortedOrders = allOrders.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA; // Descending
        }).slice(0, 5);
        setRecentOrders(sortedOrders);

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
      setLoading(false);
    }
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse text-muted-foreground font-medium flex gap-2"><Activity className="animate-spin" /> Loading analytics...</div>;

  const StatCard = ({ title, value, icon: Icon, subtext, trend, href }: any) => (
    <Link href={href || "#"} className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 block cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight text-gray-900">{value}</h3>
        </div>
        <div className="p-3 bg-slate-900 rounded-xl shadow-inner transition-transform group-hover:scale-110">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {trend && (
          <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold mr-2 border border-emerald-100">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend}
          </span>
        )}
        <span className="text-gray-500">{subtext}</span>
      </div>
    </Link>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Store Overview</h1>
          <p className="text-gray-500 mt-2 font-medium">Your business performance and recent activities.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border shadow-sm font-medium">
          <span className="relative flex h-3 w-3 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Live synced data
        </div>
      </div>

      {/* 4 Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          href="#revenue"
          title="Total Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          icon={IndianRupee}
          subtext="From active/completed orders"
          trend="+12.5%"
        />
        <StatCard
          href="/admin/orders"
          title="Active Orders"
          value={stats.orders}
          icon={ShoppingCart}
          subtext="Pending or shipped"
          trend="+4.2%"
        />
        <StatCard
          href="/admin/users"
          title="Total Users"
          value={stats.users}
          icon={Users}
          subtext="Registered accounts"
        />
        <StatCard
          href="/admin/products"
          title="Total Products"
          value={stats.products}
          icon={Package}
          subtext="Live in catalog"
        />
      </div>

      {/* ── CHARTS SECTION ── */}
      <div id="revenue" className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* 1. Main Bar Chart (Revenue) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue (Last 7 Days)</h2>
            <p className="text-sm text-gray-500">Daily sales performance breakdown</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                />
                <Bar dataKey="revenue" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Secondary Line Chart (Order Volume) */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Order Volume</h2>
            <p className="text-sm text-gray-500">Orders placed over time</p>
          </div>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Average Order Value (AreaChart) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Average Order Value (AOV)</h2>
              <p className="text-sm text-gray-500">Cart size trends over the last 7 days</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorAov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="aov" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAov)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Order Status Distribution (PieChart) */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
            <p className="text-sm text-gray-500">Current state of all orders</p>
          </div>
          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Top Selling Products (Horizontal Bar Chart) */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
            <p className="text-sm text-gray-500">Best selling items by quantity</p>
          </div>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topProductsData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} width={90} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                />
                <Bar dataKey="sales" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={20}>
                  {topProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6"][index % 5]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. User Signups (AreaChart) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">User Growth</h2>
              <p className="text-sm text-gray-500">New registered customers over 7 days</p>
            </div>
            <Users className="text-emerald-500 opacity-20 h-10 w-10" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <p className="text-sm text-gray-500 mt-1">Latest orders systematically tracked from checkout</p>
          </div>
          <Link href="/admin/orders" className="text-sm text-slate-900 bg-white border shadow-sm px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center">
            View all <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="p-0">
          {recentOrders.length === 0 ? (
            <div className="p-16 text-center text-gray-500 bg-white font-medium">No recent orders found. The table will populate as soon as customers checkout!</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-gray-400 font-bold border-b tracking-wider uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-700">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-5 text-gray-600 font-medium">{order.userName || order.userEmail || "Guest Checkout"}</td>
                    <td className="px-6 py-5 font-extrabold text-slate-900">₹{(order.totalAmount || 0).toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
                              'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}
