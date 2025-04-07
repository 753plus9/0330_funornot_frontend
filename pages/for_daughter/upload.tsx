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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/generate`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/save`, {
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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4 text-center">お父さんの写真をアップしよう📷</h1>

      {!selectedImage && (
        <label className="w-full max-w-xs p-6 bg-white border border-dashed border-gray-300 rounded-2xl text-center shadow-sm cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          <p className="text-gray-500">タップして写真を選ぶ</p>
        </label>
      )}

      {previewUrl && (
        <div className="mb-4 w-full max-w-xs">
          <Image src={previewUrl} alt="Preview" width={300} height={400} className="rounded-xl object-cover" />
        </div>
      )}

      {previewUrl && !loading && !resultImage && (
        <button onClick={handleSubmit} className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-600 mb-4">
          BeDandy ✨
        </button>
      )}

      {loading && <p className="text-gray-600 mt-4">変身中... お待ちください 💫</p>}

      {resultImage && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">変身後のお父さん 💇‍♂️</h2>
          <div className="w-full max-w-xs mb-4">
            <Image src={resultImage} alt="Result" width={300} height={400} className="rounded-xl shadow-md" />
          </div>

          <div className="w-full max-w-xs space-y-4 mb-4">
            {fashionItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow text-sm">
                <p className="font-bold">{item.name}</p>
                <p>ブランド：{item.brand}</p>
                <p>価格：{item.price}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <button onClick={handleRetry} className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-xl">
              再度実行
            </button>
            <button onClick={handleConfirm} className="flex-1 bg-green-500 text-white px-4 py-2 rounded-xl">
              確定する
            </button>
          </div>
        </>
      )}
    </div>
  )
}
