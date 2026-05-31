import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './lib/auth'
import ErrorBoundary from './components/ErrorBoundary'
import { CustomerThemeWrapper } from './lib/ThemeContext'
import { BranchProvider } from './lib/BranchContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const Dashboard    = lazy(() => import('./pages/Dashboard'))
const Orders       = lazy(() => import('./pages/Orders'))
const Menu         = lazy(() => import('./pages/Menu'))
const Marketing    = lazy(() => import('./pages/Marketing'))
const Reports      = lazy(() => import('./pages/Reports'))
const Settings     = lazy(() => import('./pages/Settings'))
const Design       = lazy(() => import('./pages/Design'))
const Customers    = lazy(() => import('./pages/Customers'))
const Staff        = lazy(() => import('./pages/Staff'))
const Inventory    = lazy(() => import('./pages/Inventory'))
const Profile      = lazy(() => import('./pages/Profile'))
const Branches     = lazy(() => import('./pages/Branches'))
const Reviews      = lazy(() => import('./pages/Reviews'))
const KDS          = lazy(() => import('./pages/KDS'))
const About        = lazy(() => import('./pages/About'))
const Privacy      = lazy(() => import('./pages/Privacy'))
const Terms        = lazy(() => import('./pages/Terms'))

const StoreFront      = lazy(() => import('./customer/StoreFront'))
const Cart            = lazy(() => import('./customer/Cart'))
const OrderConfirm    = lazy(() => import('./customer/OrderConfirm'))
const OrderTracking   = lazy(() => import('./customer/OrderTracking'))
const Explore         = lazy(() => import('./customer/Explore'))
const RestaurantPage  = lazy(() => import('./customer/RestaurantPage'))
const Loyalty         = lazy(() => import('./customer/Loyalty'))
const CustomerAuth    = lazy(() => import('./customer/CustomerAuth'))
const MyOrders        = lazy(() => import('./customer/MyOrders'))
const CustomerProfile = lazy(() => import('./customer/CustomerProfile'))
const CustomerLanding = lazy(() => import('./customer/CustomerLanding'))

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine)
  useEffect(() => {
    const onOnline  = () => setOffline(false)
    const onOffline = () => setOffline(true)
    window.addEventListener('online',  onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online',  onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])
  if (!offline) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: '#374151', color: 'white', textAlign: 'center',
      padding: '10px 16px', fontSize: 13, fontWeight: 700,
      fontFamily: 'Zain, sans-serif', direction: 'rtl',
      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <span>📵</span><span>أنت غير متصل بالإنترنت حالياً</span>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BranchProvider>
        <OfflineBanner />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login"   element={<Login />} />
            <Route path="/rivyo"   element={<Landing />} />
            <Route path="/about"   element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms"   element={<Terms />} />

            <Route path="/"          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/orders"    element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/menu"      element={<ProtectedRoute><Menu /></ProtectedRoute>} />
            <Route path="/marketing" element={<ProtectedRoute><Marketing /></ProtectedRoute>} />
            <Route path="/reports"   element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/settings"  element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/design"    element={<ProtectedRoute><Design /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/staff"     element={<ProtectedRoute><Staff /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/branches"  element={<ProtectedRoute><Branches /></ProtectedRoute>} />
            <Route path="/reviews"   element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
            <Route path="/kds"       element={<KDS />} />

            <Route element={<CustomerThemeWrapper />}>
              <Route path="/landing"        element={<CustomerLanding />} />
              <Route path="/customer-login" element={<CustomerAuth />} />
              <Route path="/my-orders"      element={<MyOrders />} />
              <Route path="/my-profile"     element={<CustomerProfile />} />
              <Route path="/loyalty"        element={<Loyalty />} />
              <Route path="/chef-ahmed"     element={<StoreFront />} />
              <Route path="/cart"           element={<Cart />} />
              <Route path="/checkout"       element={<Navigate to="/cart" replace />} />
              <Route path="/order-confirm"  element={<OrderConfirm />} />
              <Route path="/track/:orderId" element={<OrderTracking />} />
              <Route path="/explore"        element={<Explore />} />
              <Route path="/pizza-plaza"    element={<RestaurantPage />} />
              <Route path="/metro-cafe"     element={<RestaurantPage />} />
              <Route path="/shawarma-king"  element={<RestaurantPage />} />
              <Route path="/sushi-house"    element={<RestaurantPage />} />
              <Route path="/burger-factory" element={<RestaurantPage />} />
              <Route path="/r/:slug"        element={<RestaurantPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BranchProvider>
    </ErrorBoundary>
  )
}
