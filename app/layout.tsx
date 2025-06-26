import Nav from '@/components/nav';
import './globals.css';
import QueryProvider from './providers/query-provider';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Restaurant Management System',
  description: 'Manage restaurant operations efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen font-sans">
        <AuthProvider> {/* ✅ Add this wrapper */}
          <QueryProvider>
            <header className="bg-white shadow p-4">
              <h1 className="text-2xl font-bold">Restaurant Management System</h1>
            </header>
            <Nav />
            <main className="p-6">{children}</main>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
