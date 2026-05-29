import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_items')
      if (raw) return JSON.parse(raw)
    } catch (e) { /* ignore */ }
    return []
  })

  const [cartRestaurant, setCartRestaurant] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_restaurant')
      if (raw) return JSON.parse(raw)
    } catch (e) { /* ignore */ }
    return null // { id, name }
  })

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('cart_restaurant', JSON.stringify(cartRestaurant))
  }, [cartRestaurant])

  const addItem = ({ itemId, name, price, qty, note = '', modifiers = [], restaurantId, restaurantName }) => {
    const extraCost = modifiers.reduce((s, m) => s + (m.price || 0), 0)
    const totalPrice = price + extraCost
    const modifierKey = JSON.stringify(modifiers)
    setCartItems(prev => {
      const existing = prev.find(i => i.itemId === itemId && i.note === note && JSON.stringify(i.modifiers) === modifierKey)
      if (existing) {
        return prev.map(i =>
          i.itemId === itemId && i.note === note && JSON.stringify(i.modifiers) === modifierKey
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }
      return [...prev, { itemId, name, price: totalPrice, basePrice: price, qty, note, modifiers, modifierLabel: modifiers.map(m => m.name).filter(Boolean).join('، '), cartId: Date.now() + Math.random() }]
    })
    if (restaurantId) setCartRestaurant({ id: restaurantId, name: restaurantName || restaurantId })
  }

  const removeItem = (cartId) => {
    setCartItems(prev => {
      const next = prev.filter(i => i.cartId !== cartId)
      if (next.length === 0) setCartRestaurant(null)
      return next
    })
  }

  const updateQty = (cartId, qty) => {
    if (qty <= 0) { removeItem(cartId); return }
    setCartItems(prev => prev.map(i => i.cartId === cartId ? { ...i, qty } : i))
  }

  const clearCart = () => {
    setCartItems([])
    setCartRestaurant(null)
  }

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQty, clearCart, total, itemCount, cartRestaurant }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
