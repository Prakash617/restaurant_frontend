import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MenuItem = {
  id: number
  name: string
  price: number
  quantity?: number // optional in case you want to track it
}

interface CartState {
  items: MenuItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem>) => {
      const item = action.payload
      const existingItem = state.items.find(i => i.id === item.id)

      if (existingItem) {
        // If item exists, increment quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        // Add new item with quantity = 1
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    decreaseItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.quantity && item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addItem, removeItem, decreaseItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
