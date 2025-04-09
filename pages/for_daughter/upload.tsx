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
      const response = await fetch(`https://app-002-step3-2-py-oshima6.azurewebsites.net/api/generate`, {
        method: 'POST',
        body: formData,
      })

      // const data = await response.json()
      // setResultImage(data.generated_image_url)
      // setFashionItems(data.fashion_items)
      // setBeforeImageUrl(data.before_image_url) // 新たに受け取るBlob URL

      // 👇 ここでレスポンスのステータスを確認！
      if (!response.ok) {
        console.error("画像変換リクエスト失敗:", response.status);
        alert("画像の変換に失敗しました。");
        return;
      }

      const text = await response.text()
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
      } else {
        alert('保存に失敗しました')
      }
    } catch (err) {
      console.error('保存エラー:', err)
      alert('保存処理でエラーが発生しました')
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-6 flex flex-col items-center font-sans">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        お父さんの写真をアップしよう <span className="text-pink-500">📷</span>
      </h1>
  
      {!selectedImage && (
        <label className="w-full max-w-xs p-6 bg-white border-2 border-dashed border-gray-300 rounded-2xl text-center shadow-md cursor-pointer hover:bg-gray-50 transition">
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          <p className="text-gray-500 text-sm">📸 タップして写真を選ぶ</p>
        </label>
      )}
  
      {previewUrl && (
        <div className="mb-6 w-full max-w-xs">
          <Image src={previewUrl} alt="Preview" width={300} height={400} className="rounded-xl shadow-lg object-cover" />
        </div>
      )}
  
      {previewUrl && !loading && !resultImage && (
        <button
          onClick={handleSubmit}
          className="w-full max-w-xs bg-pink-500 text-white font-bold text-lg py-3 rounded-full shadow-md hover:bg-pink-600 transition mb-6"
        >
          BeDandy ✨
        </button>
      )}
  
      {loading && (
        <p className="text-gray-600 mt-4 animate-pulse">変身中... お待ちください 💫</p>
      )}
  
      {resultImage && (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4 text-center">
            変身後のお父さん 💇‍♂️
          </h2>
          <div className="w-full max-w-xs mb-4">
            <Image src={resultImage} alt="Result" width={300} height={400} className="rounded-xl shadow-xl" />
          </div>
  
          <div className="w-full max-w-xs space-y-4 mb-6">
            {fashionItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-md text-sm border border-gray-100">
                <p className="font-bold text-gray-800">{item.name}</p>
                <p className="text-gray-600">ブランド：{item.brand}</p>
                <p className="text-gray-600">価格：{item.price}</p>
                <p className="text-gray-500 text-xs mt-1">{item.description}</p>
              </div>
            ))}
          </div>
  
          <div className="flex space-x-4 w-full max-w-xs">
            <button
              onClick={handleRetry}
              className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 rounded-full hover:bg-gray-300 transition"
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
