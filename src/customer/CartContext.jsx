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

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems))
  }, [cartItems])

  const addItem = ({ itemId, name, price, qty, note = '', modifiers = [] }) => {
    const extraCost = modifiers.reduce((s, m) => s + (m.price || 0), 0)
    const totalPrice = price + extraCost
    const modifierKey = JSON.stringify(modifiers)
    const modifierLabel = modifiers.map(m => m.name).filter(Boolean).join('، ')
    setCartItems(prev => {
      const existing = prev.find(i => i.itemId === itemId && i.note === note && JSON.stringify(i.modifiers) === modifierKey)
      if (existing) {
        return prev.map(i =>
          i.itemId === itemId && i.note === note && JSON.stringify(i.modifiers) === modifierKey
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }
      return [...prev, { itemId, name, price: totalPrice, basePrice: price, qty, note, modifiers, modifierLabel, cartId: Date.now() + Math.random() }]
    })
  }

  const removeItem = (cartId) => {
    setCartItems(prev => prev.filter(i => i.cartId !== cartId))
  }

  const updateQty = (cartId, qty) => {
    if (qty <= 0) {
      removeItem(cartId)
      return
    }
    setCartItems(prev => prev.map(i => i.cartId === cartId ? { ...i, qty } : i))
  }

  const clearCart = () => setCartItems([])

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
