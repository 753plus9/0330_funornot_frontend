// pages/register.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'  // ← 必要なら `npm install uuid` を実行

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [familyId, setFamilyId] = useState('')

  const handleRegister = async () => {
    const generatedFamilyId = uuidv4().slice(0, 8)  // "e3f1a2c4" のような値

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          family_id: generatedFamilyId,  // 👈 追加！
        }),
      })

      if (res.ok) {
        alert('登録が完了しました！')
        router.push('/login')
      } else {
        alert('登録に失敗しました')
      }
    } catch (err) {
      console.error('登録エラー:', err)
      alert('登録処理でエラーが発生しました')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-3xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">新規登録 ✨</h1>

        <label className="block mb-4">
          <span className="text-gray-600 text-sm">名前</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="お名前"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-600 text-sm">メールアドレス</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="email@example.com"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-600 text-sm">パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="••••••••"
          />
        </label>

        {/* <label className="block mb-6">
          <span className="text-gray-600 text-sm">Family ID</span>
          <input
            type="text"
            value={familyId}
            onChange={(e) => setFamilyId(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="001"
          />
        </label> */}

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          登録する
        </button>
      </div>
    </div>
  )
}
