import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import Marketing from './pages/Marketing'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Design from './pages/Design'
import Login from './pages/Login'
import KDS from './pages/KDS'
import Customers from './pages/Customers'
import Staff from './pages/Staff'
import Inventory from './pages/Inventory'
import Profile from './pages/Profile'
import Reviews from './pages/Reviews'
import StoreFront from './customer/StoreFront'
import Cart from './customer/Cart'
import OrderConfirm from './customer/OrderConfirm'
import OrderTracking from './customer/OrderTracking'
import Explore from './customer/Explore'
import RestaurantPage from './customer/RestaurantPage'
import Loyalty from './customer/Loyalty'
import CustomerAuth from './customer/CustomerAuth'
import MyOrders from './customer/MyOrders'
import CustomerProfile from './customer/CustomerProfile'
import CustomerLanding from './customer/CustomerLanding'
import { CustomerThemeWrapper } from './lib/ThemeContext'

function ProtectedRoute({ children }) {
  if (!localStorage.getItem('auth_role')) return <Navigate to="/login" replace />
  return children
}

function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const onOnline = () => setOffline(false)
    const onOffline = () => setOffline(true)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  if (!offline) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: '#374151',
      color: 'white',
      textAlign: 'center',
      padding: '10px 16px',
      fontSize: 13,
      fontWeight: 700,
      fontFamily: 'Zain, sans-serif',
      direction: 'rtl',
      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}>
      <span>📵</span>
      <span>أنت غير متصل بالإنترنت حالياً</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <OfflineBanner />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/kds" element={<KDS />} />
      <Route path="/rivyo" element={<Landing />} />

      {/* Protected admin routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
      <Route path="/marketing" element={<ProtectedRoute><Marketing /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/design" element={<ProtectedRoute><Design /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />

      {/* Customer-facing routes wrapped in theme provider */}
      <Route element={<CustomerThemeWrapper />}>
        <Route path="/landing" element={<CustomerLanding />} />
        <Route path="/customer-login" element={<CustomerAuth />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-profile" element={<CustomerProfile />} />
        <Route path="/loyalty" element={<Loyalty />} />
        <Route path="/chef-ahmed" element={<StoreFront />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Navigate to="/cart" replace />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/track/:orderId" element={<OrderTracking />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/pizza-plaza" element={<RestaurantPage />} />
        <Route path="/metro-cafe" element={<RestaurantPage />} />
        <Route path="/shawarma-king" element={<RestaurantPage />} />
        <Route path="/sushi-house" element={<RestaurantPage />} />
        <Route path="/burger-factory" element={<RestaurantPage />} />
        <Route path="/r/:slug" element={<RestaurantPage />} />
      </Route>
    </Routes>
    </>
  )
}
