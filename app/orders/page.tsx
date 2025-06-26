'use client';

import React, { useEffect, useState } from 'react';
import { getOrders, createOrder, Order } from '@/lib/api/order';
import { apiFetch } from '@/lib/api';

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface Table {
  id: number;
  name: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<{ menu_item: number; quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders, menu items and tables
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [ordersData, menuData, tablesData] = await Promise.all([
          getOrders(),
          apiFetch('/menu-items/'),
          apiFetch('/tables/'),
        ]);
        setOrders(ordersData);
        setMenuItems(menuData);
        setTables(tablesData);
      } catch (e: any) {
        setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add item to orderItems or update quantity
  const addItem = (menuItemId: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menu_item === menuItemId);
      if (existing) {
        return prev.map((i) =>
          i.menu_item === menuItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { menu_item: menuItemId, quantity: 1 }];
    });
  };

  // Remove item or decrease quantity
  const removeItem = (menuItemId: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menu_item === menuItemId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((i) => i.menu_item !== menuItemId);
      }
      return prev.map((i) =>
        i.menu_item === menuItemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  // Handle submit new order
  const handleSubmit = async () => {
    if (!selectedTable) {
      setError('Please select a table');
      return;
    }
    if (orderItems.length === 0) {
      setError('Please add at least one menu item');
      return;
    }
    try {
      setLoading(true);
      const newOrder = await createOrder({
        table: selectedTable,
        items: orderItems,
      });
      setOrders((prev) => [...prev, newOrder]);
      setOrderItems([]);
      setSelectedTable(null);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-6 border p-4 rounded shadow bg-white">
            <h2 className="font-semibold mb-2">Create New Order</h2>

            <label className="block mb-2">
              Select Table:
              <select
                className="border ml-2 p-1"
                value={selectedTable ?? ''}
                onChange={(e) => setSelectedTable(Number(e.target.value))}
              >
                <option value="">--Select Table--</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <h3 className="mt-4 mb-2 font-semibold">Menu Items</h3>
              {menuItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-1">
                  <span>{item.name} (${item.price})</span>
                  <button
                    className="bg-green-500 text-white px-2 rounded"
                    onClick={() => addItem(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 rounded ml-2"
                    onClick={() => removeItem(item.id)}
                    disabled={!orderItems.find((i) => i.menu_item === item.id)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Order Summary</h3>
              {orderItems.length === 0 && <p>No items added</p>}
              {orderItems.map(({ menu_item, quantity }) => {
                const item = menuItems.find((m) => m.id === menu_item);
                if (!item) return null;
                return (
                  <div key={menu_item} className="flex justify-between">
                    <span>
                      {item.name} x {quantity}
                    </span>
                    <span>${(item.price * quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Order
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Existing Orders</h2>
            {orders.length === 0 && <p>No orders yet</p>}
            <ul className="space-y-3">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="border p-3 rounded bg-white shadow flex justify-between"
                >
                  <div>
                    <div>
                      <strong>Table:</strong> {order.table}
                    </div>
                    <div>
                      <strong>Status:</strong> {order.status}
                    </div>
                    <div>
                      <strong>Items:</strong>
                      <ul className="list-disc ml-5">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {menuItems.find((m) => m.id === item.menu_item)?.name || 'Unknown'} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <small>{new Date(order.created_at).toLocaleString()}</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
