// frontend/pages/for_daughter/upload.tsx
import { useState } from 'react'
import Image from 'next/image'

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [fashionInfo, setFashionInfo] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage) return
  
    setLoading(true)
    setResultImage(null)
    setFashionInfo(null)
  
    const formData = new FormData()
    formData.append('image', selectedImage)
  
    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        body: formData,
      })
  
      const data = await response.json()
      // 仮にテスト用なら response をこのように作る
    // const data = {
    //     generated_image_url: '/sample_result.png',
    //     fashion_info: 'ジャケット：UNIQLO ¥5,990<br/>パンツ：ZARA ¥6,800'
    // }
  
      setResultImage(data.generated_image_url)　 // ← ReplicateのURL（例: https://replicate.delivery/pb/xxxxxx.png）
      setFashionInfo(data.fashion_info) // ブランドや金額もAPIで取得できるならここで
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

  const handleConfirm = () => {
    // 確定 → API or DB登録＆Submit画面に遷移
    alert('確定しました！（ここでデータ保存＆画面遷移）')
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

          <div className="bg-white p-4 rounded-xl shadow w-full max-w-xs mb-4 text-sm" dangerouslySetInnerHTML={{ __html: fashionInfo || '' }} />

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
