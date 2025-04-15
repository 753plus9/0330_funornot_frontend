// pages/menu.tsx
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function MenuPage() {
  const router = useRouter()

  const goToUpload = () => router.push('/for_daughter/upload')
  const goToCheck = () => router.push('/for_dad/check')


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white shadow-2xl rounded-3xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">メニュー 📱</h1>

        <div className="space-y-4">
          <button
            onClick={goToUpload}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-full transition"
          >
            for 娘 💁‍♀️
          </button>

          <button
            // onClick={goToCheck}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-full transition"
          >
            for 父 👨（将来開発）
          </button>
        </div>
      </div>
    </div>
  )
}
