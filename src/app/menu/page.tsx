import { QueryClient, dehydrate } from '@tanstack/react-query'
import { fetchMenuItems } from '@/lib/api/menu'
import MenuClient from './MenuClient'
import MenuProvider from './MenuProvider' // new wrapper component

export default async function MenuPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['menu-items'],
    queryFn: fetchMenuItems,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <MenuProvider dehydratedState={dehydratedState}>
      <MenuClient />
    </MenuProvider>
  )
}
