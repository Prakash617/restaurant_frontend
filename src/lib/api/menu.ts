// lib/api/menu.ts
import { API_BASE_URL } from './config'

export async function fetchMenuItems() {
  const res = await fetch(`${API_BASE_URL}/api/menu-items/`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to fetch menu items')
  return res.json()
}
