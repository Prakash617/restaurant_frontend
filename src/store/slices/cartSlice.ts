import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MenuItem {
  id: number
  name: string
  price: number
  image?: string
  quantity?: number
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
    addToCart(state, action: PayloadAction<MenuItem>) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) {
        item.quantity = (item.quantity || 1) + 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
