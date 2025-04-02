// frontend/pages/login.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [isNewUser, setIsNewUser] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    yourId: '',
    dadId: '', // for 娘 only
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = isNewUser ? '/api/register' : '/api/login'
    const payload = isNewUser
      ? { email: form.email, password: form.password, your_id: form.yourId, dad_id: form.dadId }
      : { email: form.email, password: form.password }

    try {
      const res = await axios.post(url, payload)
      localStorage.setItem('token', res.data.token)
      router.push('/menu')
    } catch (err) {
      alert('ログインまたは登録に失敗しました')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isNewUser ? '新規登録' : 'ログイン'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="メールアドレス" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="パスワード" onChange={handleChange} required className="w-full p-2 border rounded" />
        {isNewUser && (
          <>
            <input name="yourId" placeholder="あなたのID" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="dadId" placeholder="お父さんのID" onChange={handleChange} className="w-full p-2 border rounded" />
          </>
        )}
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {isNewUser ? '登録する' : 'ログイン'}
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        <button onClick={() => setIsNewUser(!isNewUser)} className="text-blue-500 underline">
          {isNewUser ? '既に登録済み？ログインはこちら' : '新規登録はこちら'}
        </button>
      </div>
    </div>
  )
}
