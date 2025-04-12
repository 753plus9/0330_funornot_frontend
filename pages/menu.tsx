import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function MenuPage() {
  const router = useRouter()

  // useEffect(() => {
  //   const user = localStorage.getItem('user')
  //   if (!user) {
  //     router.push('/login')
  //   }
  // }, [])

  const goToUpload = () => router.push('/for_daughter/upload')

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-2xl font-bold mb-8">メニュー</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className="btn-primary" onClick={goToUpload}>for 娘 💁‍♀️</button>
        <button className="btn-secondary">for 父 👨</button>
      </div>
    </div>
  )
}
