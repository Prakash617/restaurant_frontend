'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMenuItems } from '@/lib/api/menu'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/slices/cartSlice'

interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  category: number
}

export default function MenuClient() {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ['menu-items'],
    queryFn: fetchMenuItems,
  })

  if (isLoading) return <p className="p-4 text-gray-600">Loading menu...</p>
  if (error) return <p className="p-4 text-red-600">Error loading menu.</p>

  const availableItems = data?.filter((item) => item.available)

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {availableItems?.map((item) => (
        <div key={item.id} className="bg-white rounded shadow p-4">
          <div className="h-40 w-full bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-500">
            No Image
          </div>
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-gray-600 text-sm">{item.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">Rs. {item.price}</span>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price),
                  })
                )
              }
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
