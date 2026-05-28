import { Routes, Route, Navigate } from 'react-router-dom'
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
import StoreFront from './customer/StoreFront'
import Cart from './customer/Cart'
import Checkout from './customer/Checkout'
import OrderConfirm from './customer/OrderConfirm'
import OrderTracking from './customer/OrderTracking'
import Explore from './customer/Explore'
import RestaurantPage from './customer/RestaurantPage'

function ProtectedRoute({ children }) {
  if (!localStorage.getItem('auth_role')) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/kds" element={<KDS />} />

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

      {/* Customer-facing routes */}
      <Route path="/chef-ahmed" element={<StoreFront />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirm" element={<OrderConfirm />} />
      <Route path="/track/:orderId" element={<OrderTracking />} />
      <Route path="/explore" element={<Explore />} />

      {/* Restaurant listing pages */}
      <Route path="/pizza-plaza" element={<RestaurantPage />} />
      <Route path="/metro-cafe" element={<RestaurantPage />} />
      <Route path="/shawarma-king" element={<RestaurantPage />} />
      <Route path="/sushi-house" element={<RestaurantPage />} />
      <Route path="/burger-factory" element={<RestaurantPage />} />
      <Route path="/r/:slug" element={<RestaurantPage />} />
    </Routes>
  )
}
