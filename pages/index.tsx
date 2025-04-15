'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'  // ✅ こちらを使うとCSR前提になる

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/menu')
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-600">
      リダイレクト中...
    </div>
  )
}