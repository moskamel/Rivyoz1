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

export default function App() {
  return (
    <Routes>
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
    </Routes>
  )
}
