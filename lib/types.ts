export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt?: string;
}

export interface Order {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: string;
  createdAt?: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  createdAt?: string;
}
