import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // ✅ ブラウザでのみ実行されるようにガード
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if (user) {
        router.push('/menu')
      } else {
        router.push('/login')
      }
    }
  }, [])

  return null
}