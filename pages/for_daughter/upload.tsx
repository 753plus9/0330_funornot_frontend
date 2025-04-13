import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

console.log("✅ 現在のAPIエンドポイント1:", process.env.NEXT_PUBLIC_API_ENDPOINT)

type FashionItem = {
  name: string
  brand: string
  price: string
  description: string
}

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [fashionItems, setFashionItems] = useState<FashionItem[]>([])
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null) // Blob URLを保持

  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  console.log("✅ 現在のAPIエンドポイント2:", process.env.NEXT_PUBLIC_API_ENDPOINT)

  const handleSubmit = async () => {
    if (!selectedImage) return

    console.log("✅ 現在のAPIエンドポイント3:", process.env.NEXT_PUBLIC_API_ENDPOINT)

    setLoading(true)
    setResultImage(null)
    setFashionItems([])

    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      console.log("✅ 現在のAPIエンドポイント4:", process.env.NEXT_PUBLIC_API_ENDPOINT)
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/generate`, {
      const response = await fetch(`https://app-002-step3-2-py-oshima6.azurewebsites.net/api/generate`, {
        method: 'POST',
        body: formData,
      })

      // const data = await response.json()
      // setResultImage(data.generated_image_url)
      // setFashionItems(data.fashion_items)
      // setBeforeImageUrl(data.before_image_url) // 新たに受け取るBlob URL

      // 👇 ここでレスポンスのステータスを確認！
      if (!res.ok) {
        console.error("画像変換リクエスト失敗:", res.status);
        alert("画像の変換に失敗しました。");
        return;
      }

      const text = await res.text()
      try {
        const data = JSON.parse(text)
        setResultImage(data.generated_image_url)
        setFashionItems(data.fashion_items)
        setBeforeImageUrl(data.before_image_url)
      } catch (err) {
        console.error('レスポンスJSONパース失敗:', text)
        alert('画像の変換に失敗しました。')
      }

    } catch (err) {
      console.error('変換失敗:', err)
      alert('画像の変換に失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    handleSubmit()
  }

  const handleConfirm = async () => {
    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/save`, {
      const res = await fetch(`https://app-002-step3-2-py-oshima6.azurewebsites.net/api/save`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          family_id: '001', // ← ログインユーザー情報から取得（TODO）
          before_url: beforeImageUrl,            // ← アップロード前のURL
          after_url: resultImage,            // ← Replicate生成URL
          fashion_items: fashionItems,
        }),
      })
  
      if (res.ok) {
        alert('保存しました！')
        // 画面遷移など
        router.push('/send')  // ✅ 成功したら send.tsx に遷移

      } else {
        alert('保存に失敗しました')
      }
    } catch (err) {
      console.error('保存エラー:', err)
      alert('保存処理でエラーが発生しました')
    }
  }
  

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-6 flex flex-col items-center font-sans">
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 px-4 py-6 flex flex-col items-center font-sans">

      
      {/* 🔧 上部タイトル */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          BeDandy <span className="text-pink-500">📷</span>
        </h1>
        {/* <p className="text-sm text-gray-500">お父さんをスタイリッシュに変身！</p> */}
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center leading-snug">
          お父さんをスタイリッシュに変身！ <span className="text-pink-500">✨</span>
        </h1>
      </div>

      {/* 🔧 写真選択エリア */}
      {!selectedImage && (
        <label className="w-full max-w-xs p-8 bg-white border-2 border-dashed border-gray-300 rounded-3xl text-center shadow-md cursor-pointer hover:bg-gray-50 transition">
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          <p className="text-gray-500 text-sm">📸 タップして写真を選ぶ</p>
        </label>
      )}

      {previewUrl && (
        <div className="mb-6 w-full max-w-xs">
          <Image src={previewUrl} alt="Preview" width={300} height={400} className="rounded-xl shadow-lg object-cover" />
        </div>
      )}
  
    {/* 🔧 ボタン表示 */}
    {previewUrl && !loading && !resultImage && (
        <button
          onClick={handleSubmit}
          className="w-full max-w-xs bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:from-pink-600 transition mb-6"
        >
          BeDandy ✨
        </button>
      )}
  
      {loading && (
        <p className="text-gray-600 mt-4 animate-pulse">変身中... お待ちください 💫</p>
      )}
  
      {/* 🔧 結果表示 */}
      {resultImage && (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4 text-center">
            変身後のお父さん 💇‍♂️
          </h2>
          <div className="w-full max-w-xs mb-4">
            <Image src={resultImage} alt="Result" width={300} height={400} className="rounded-xl shadow-xl" />
          </div>

          {/* 🔧 アイテムカード */}
          <div className="w-full max-w-xs space-y-4 mb-6">
            {fashionItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm text-sm border border-gray-200">
                <p className="font-bold text-gray-800">{item.name}</p>
                <p className="text-gray-600">ブランド：{item.brand}</p>
                <p className="text-gray-600">価格：{item.price}</p>
                <p className="text-gray-500 text-xs mt-1">{item.description}</p>
              </div>
            ))}
          </div>

          {/* 🔧 ボタン群 */}
          <div className="flex space-x-4 w-full max-w-xs">
            <button
              onClick={handleRetry}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-200 transition"
            >
              再度実行
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-full hover:bg-green-600 transition"
            >
              確定する
            </button>
          </div>
        </>
      )}
    </div>
  )
}
