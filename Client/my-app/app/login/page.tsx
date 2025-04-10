'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { decodeToken } from '@/lib/jwt' // adjust path if needed
import { useUser } from "@/context/UserContext"

export default function LoginPage() {
  const { setUser } = useUser()

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message || 'Login failed')
      }

      const { token } = await res.json()

      sessionStorage.setItem('token', token)
      
      const decoded = decodeToken(token)
      if (decoded) {
        setUser(decoded)
        const role = decoded.role?.toLowerCase()
        if (role === 'admin') router.push('/admin')
        else if (role === 'student') router.push('/student')
        else router.push('/unauthorized')
      }
  }catch (err: any) {
    setError(err.message)
   }
 }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login to Apex Ed</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  )
}
