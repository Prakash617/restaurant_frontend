// app/page.tsx
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Today's Sales</h2>
        <p className="text-4xl font-bold">$1,250</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Active Orders</h2>
        <p className="text-4xl font-bold">12</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Reservations</h2>
        <p className="text-4xl font-bold">8</p>
      </div>
    </div>
  );
}
