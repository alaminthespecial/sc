// pages/profile.js

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
export default function Profile() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    // If no token is found, redirect to login
    if (!token) {
      router.push('/login')
      return
    }

    // Fetch user data using the token
    async function fetchUserData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
        router.push('/login') // Redirect if error occurs (e.g., token expired)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token') // Remove the token
    router.push('/login') // Redirect to login page
  }

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
