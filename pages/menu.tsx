// frontend/pages/menu.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MenuPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">ようこそ！</h1>
      <p className="mb-6 text-lg">どちらの機能を使いますか？</p>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/for_daughter/upload')}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-600"
        >
          for 娘
        </button>
        <button
          onClick={() => router.push('/for_dad/check')}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600"
        >
          for 父
        </button>
      </div>
    </div>
  )
}
