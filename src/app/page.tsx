'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Meguro Restaurant 🍽️
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our menu and order your favorite dishes!
        </p>

        <Link
          href="/menu"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View Menu
        </Link>
      </div>
    </div>
  )
}
