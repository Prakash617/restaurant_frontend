'use client';

import Link from 'next/link';
import React from 'react';

export default function Nav(): JSX.Element {
  return (
    <nav className="bg-white shadow p-4 flex space-x-6 mb-6">
      <Link href="/" className="hover:text-blue-600">
        Dashboard
      </Link>
      <Link href="/menu" className="hover:text-blue-600">
        Menu
      </Link>
      <Link href="/orders" className="hover:text-blue-600">
        Orders
      </Link>
      <Link href="/reservations" className="hover:text-blue-600">
        Reservations
      </Link>
      <Link href="/login" className="hover:text-blue-600">
        Login
      </Link>
      {/* Add other links as needed */}
    </nav>
  );
}
