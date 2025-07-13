"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { CartProvider } from "@/contexts/CartContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased">
      <AnalyticsProvider>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </AnalyticsProvider>
    </div>
  );
}
