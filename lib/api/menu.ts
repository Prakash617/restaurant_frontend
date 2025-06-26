import { MenuItem } from '@/types';
import { apiFetch } from '@/lib/api';

/**
 * Fetch all menu items
 */
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  return apiFetch<MenuItem[]>('/menu-items/');
};

/**
 * Delete a menu item by ID
 */
export const deleteMenuItem = async (id: number): Promise<void> => {
  return apiFetch<void>(`/menu-items/${id}/`, {
    method: 'DELETE',
  });
};

/**
 * Create a new menu item
 */
export const createMenuItem = async (item: {
  name: string;
  category: string;
  price: number;
}): Promise<MenuItem> => {
  return apiFetch<MenuItem>('/menu-items/', {
    method: 'POST',
    body: JSON.stringify(item),
  });
};

/**
 * Update a menu item by ID
 */
export const updateMenuItem = async (
  id: number,
  item: {
    name: string;
    category: string;
    price: number;
  }
): Promise<MenuItem> => {
  return apiFetch<MenuItem>(`/menu-items/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
};
