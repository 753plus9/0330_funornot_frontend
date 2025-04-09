// pages/login.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, password }),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        router.push('/menu')
      } else {
        alert('ログインに失敗しました')
      }
    } catch (err) {
      console.error('ログインエラー:', err)
      alert('ログイン処理でエラーが発生しました')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-3xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">ようこそ 👋</h1>

        <label className="block mb-4">
          <span className="text-gray-600 text-sm">ユーザーID</span>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
            placeholder="your_id"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-600 text-sm">パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
            placeholder="••••••••"
          />
        </label>

        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          ログイン
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          アカウントをお持ちでないですか？{' '}
          <span className="text-pink-500 font-medium cursor-pointer hover:underline">
            新規登録
          </span>
        </p>
      </div>
    </div>
  )
}
