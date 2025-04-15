import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SendPage() {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [message, setMessage] = useState('')
    const [charCount, setCharCount] = useState(0)
    const [step, setStep] = useState<'input' | 'confirm' | 'done'>('input')
    const [shareUrl, setShareUrl] = useState<string | null>(null)
    const [familyId, setFamilyId] = useState<string>('')
    const [user, setUser] = useState<any>(null) // ← これがあれば user を参照できる


    const maxChars = 300

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
            setFamilyId(parsedUser.family_id)
        }

        if (router.isReady) {
            const img = router.query.image as string
            setImageUrl(img)
        }
    }, [router.isReady, router.query])

    const handleConfirm = () => {
        if (!message.trim()) {
            alert('メッセージを入力してください')
            return
        }
        setStep('confirm')
    }

    const handleSubmit = async () => {
        console.log("✅ 送信ボタンが押されました")
        console.log("ユーザー:", user)
        console.log("メッセージ:", message)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    family_id: familyId,
                    message: message,
                    after_url: imageUrl,
                })
            })

            const data = await res.json()
            console.log("受信データ:", data)

            const url = `${process.env.NEXT_PUBLIC_FRONTEND}/for_dad/check?family_id=${user.family_id}`
            console.log("遷移先URL:", url)
            setShareUrl(url)      // ← URLを保存
            setStep('done')       // ← 表示ステップに進む
        } catch (error) {
            console.error("❌ 送信エラー:", error);
            alert("送信中にエラーが発生しました。通信状況をご確認ください。");
            setStep('input');  // 入力画面に戻す            
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 px-4 py-8 text-center flex flex-col items-center font-sans">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Be Dandy ✨</h1>
    
          {step === 'input' && (
            <>
              {imageUrl && (
                <Image src={imageUrl} alt="生成画像" width={300} height={400} className="rounded-xl shadow-lg mb-4" />
              )}
    
              <textarea
                className="w-full max-w-xs p-4 border border-gray-300 rounded-2xl shadow bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                rows={5}
                placeholder="パパへのメッセージを300文字以内で入力..."
                value={message}
                onChange={(e) => {
                  const text = e.target.value
                  if (text.length <= maxChars) {
                    setMessage(text)
                    setCharCount(text.length)
                  }
                }}
              />
              <div className="text-sm text-gray-600 mt-1 mb-4">{charCount}/{maxChars} 文字</div>
    
              <button
                onClick={handleConfirm}
                className="bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow hover:bg-pink-500 transition w-full max-w-xs"
              >
                メッセージを確認
              </button>
            </>
          )}
    
          {step === 'confirm' && (
            <>
              {imageUrl && (
                <Image src={imageUrl} alt="確認画像" width={300} height={400} className="rounded-xl shadow-lg mb-4" />
              )}
    
              <p className="bg-white p-4 rounded-2xl shadow max-w-xs text-left whitespace-pre-wrap mb-6 text-gray-800 text-sm">
                {message}
              </p>
    
              <button
                onClick={handleSubmit}
                className="bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow hover:bg-pink-500 transition w-full max-w-xs"
              >
                提案を送信する
              </button>
            </>
          )}
    
          {step === 'done' && (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-4">送信完了 🎉</h2>
              <p className="mb-2 text-sm text-gray-700">以下のURLをお父さんに送ってください👇</p>
              <div className="bg-white p-3 rounded-xl shadow text-blue-600 break-all max-w-xs mb-4 text-sm">
                {shareUrl}
              </div>
    
              <button
                onClick={() => router.push("/menu")}
                className="bg-gray-500 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition w-full max-w-xs"
              >
                メニューに戻る
              </button>
            </>
          )}
        </main>
    )
}