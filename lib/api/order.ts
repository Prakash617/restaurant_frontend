import { apiFetch } from '@/lib/api';

export interface Order {
  id: number;
  table: number;
  items: {
    id: number;
    menu_item: number;
    quantity: number;
  }[];
  status: string; // e.g., "pending", "served"
  created_at: string;
}

export async function getOrders(): Promise<Order[]> {
  return apiFetch('/orders/');
}

export interface NewOrderPayload {
  table: number;
  items: { menu_item: number; quantity: number }[];
}

export async function createOrder(payload: NewOrderPayload): Promise<Order> {
  return apiFetch('/orders/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
