import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import Marketing from './pages/Marketing'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import KDS from './pages/KDS'
import Customers from './pages/Customers'
import Staff from './pages/Staff'
import Inventory from './pages/Inventory'
import StoreFront from './customer/StoreFront'
import Cart from './customer/Cart'
import OrderConfirm from './customer/OrderConfirm'
import OrderTracking from './customer/OrderTracking'
import Explore from './customer/Explore'

export default function App() {
  return (
    <Routes>
      {/* Dashboard routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/kds" element={<KDS />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/inventory" element={<Inventory />} />

      {/* Customer-facing routes */}
      <Route path="/chef-ahmed" element={<StoreFront />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-confirm" element={<OrderConfirm />} />
      <Route path="/track/:orderId" element={<OrderTracking />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  )
}
