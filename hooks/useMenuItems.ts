import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
}

export function useMenuItems() {
  const queryClient = useQueryClient();

  const query = useQuery<MenuItem[]>({
    queryKey: ['menu-items'],
    queryFn: () => apiFetch('/menu-items/'),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const deleteMenuItem = useMutation({
    mutationFn: async (id: number) => {
      await apiFetch(`/menu-items/${id}/`, { method: 'DELETE' });
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['menu-items'] });
      const previousData = queryClient.getQueryData<MenuItem[]>(['menu-items']);
      if (previousData) {
        queryClient.setQueryData<MenuItem[]>(
          ['menu-items'],
          previousData.filter((item) => item.id !== id)
        );
      }
      return { previousData };
    },
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['menu-items'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
    },
  });

  return {
    ...query,
    deleteMenuItem,
  };
}
