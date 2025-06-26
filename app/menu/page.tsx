'use client';

import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useMenuItems } from '@/hooks/useMenuItems';

export default function MenuPage() {
  useAuthRedirect();
  const router = useRouter();
  const {
    data: menuItems,
    isLoading,
    isError,
    error,
    deleteMenuItem,
  } = useMenuItems();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem.mutate(id);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/menu/edit/${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>

      {isLoading ? (
        <p>Loading menu...</p>
      ) : isError ? (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-6">Name</th>
              <th className="text-left py-3 px-6">Category</th>
              <th className="text-left py-3 px-6">Price ($)</th>
              <th className="text-left py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems?.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.category}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    {deleteMenuItem.isPending && deleteMenuItem.variables === item.id
                      ? 'Deleting...'
                      : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
