// pages/for_dad/check_detail.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image"; // ← これが必須！

type FashionItem = {
  name: string;
  brand: string;
  price: string;
  description: string;
};

const CheckDetailPage = () => {
  const router = useRouter();
  const { family_id } = router.query;

  const [afterImage, setAfterImage] = useState("");
  const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!family_id) return;

  fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/check_by_family/${family_id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("✅ afterImage:", data.after_url);
        // ✅ ここを仮画像で上書きしてテスト
        // setAfterImage("https://picsum.photos/300"); // ←これ！
        setAfterImage(data.after_url);
        setFashionItems(data.fashion_items || []);
      } else {
        alert("データ取得失敗");
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      alert("通信エラー");
      setLoading(false);
    });
}, [family_id]);


    if (loading) return <p className="text-center py-10">読み込み中...</p>;

    return (
        <main className="min-h-screen bg-white px-4 py-6 overflow-y-auto font-sans">
        <h1 className="text-center text-xl font-semibold mb-6">
            トータルコーディネートを確認する
        </h1>

        {/* 🔷 After Image 表示 */}
        <div className="flex justify-center mb-6">
            {afterImage && (
            <Image
                src={afterImage}
                alt="変身後"
                width={300}
                height={400}
                className="rounded-xl shadow-md"
            />
            )}
        </div>

        {/* 🔷 アイテム一覧 */}
        <div className="w-full max-w-xs mx-auto space-y-4">
            {fashionItems.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-md p-4">
                <p className="text-sm font-bold text-gray-800 mb-1">{item.name}</p>
                <p className="text-xs text-gray-600">ブランド：{item.brand}</p>
                <p className="text-xs text-gray-600">価格：{item.price}</p>
                <p className="text-xs text-gray-500 mt-2">{item.description}</p>
            </div>
            ))}
        </div>

        {/* 🔷 戻るボタン */}
        <div className="flex justify-center mt-10">
            <button
            className="bg-pink-300 hover:bg-pink-400 text-white py-2 px-6 rounded-full shadow transition-all"
            onClick={() => router.back()}
            >
            戻る
            </button>
        </div>
        </main>
    );
};

export default CheckDetailPage;

      {/* 写真
<div className="flex justify-center mb-4">
  {afterImage && (
    <img
      src={afterImage}
      alt="変身後"
      className="rounded-xl shadow-md w-64 h-auto"
    />
  )}
</div> */}

      {/* 解説 */}
      {/* <p className="text-sm text-center text-gray-700 mb-6">
        髭を剃ってパーマを整えたことで、清潔感がUP！服も一新してイケおじに✨
      </p> */}

      {/* スタイリング剤（1つ目）
      {Array.isArray(fashionItems) && fashionItems.length > 0 && (
        <div className="flex items-center mb-6 bg-rose-50 p-4 rounded-xl shadow-md">
          <img
            src="/styling_product.jpg"
            alt={fashionItems[0].name}
            className="w-24 h-auto mr-4 rounded"
          />
          <div className="space-y-1">
            <p className="text-sm font-medium">{fashionItems[0].name}</p>
            <p className="text-xs text-gray-600">{fashionItems[0].brand}</p>
            <p className="text-xs text-gray-600">{fashionItems[0].price}</p>
            <p className="text-xs text-gray-500 mb-2">{fashionItems[0].description}</p>
            <button className="bg-pink-400 hover:bg-pink-500 text-white text-sm py-1 px-3 rounded-full transition-all">
              今すぐ購入する
            </button>
          </div>
        </div>
      )} */}

      {/* 美容院用ボタン */}
      {/* <div className="flex justify-center mb-6">
        <button
          className="bg-pink-300 hover:bg-pink-400 text-white py-2 px-6 rounded-full shadow transition-all"
          onClick={() => alert("美容院用オーダーシートを出力します")}
        >
          美容院のオーダーシートを出力
        </button>
      </div> */}

      {/* その他アイテム
      {Array.isArray(fashionItems) && fashionItems.slice(1).map((item, idx) => (
        <div key={idx} className="flex items-center mb-4 bg-rose-50 p-4 rounded-xl shadow-md">
          <img
            src={
              item.name.includes("シャツ") ? "/inner.jpg"
              : item.name.includes("ジャケット") ? "/outer.jpg"
              : item.name.includes("パンツ") ? "/pants.jpg"
              : "/noimage.jpg"
            }
            alt={item.name}
            className="w-20 h-auto mr-4 rounded"
          />
          <div className="space-y-1">
            <p className="text-sm font-medium">{item.brand}</p>
            <p className="text-xs text-gray-600">{item.name}</p>
            <p className="text-xs text-gray-600">{item.price}</p>
            <p className="text-xs text-gray-500">{item.description}</p>
            <button className="bg-pink-400 hover:bg-pink-500 text-white text-xs py-1 px-3 rounded-full mt-2 transition-all">
              カートに入れる
            </button>
          </div>
        </div>
      ))} */}

      {/* 戻る */}
      {/* <div className="flex justify-center mt-10">
        <button
          className="bg-pink-300 hover:bg-pink-400 text-white py-2 px-6 rounded-full shadow transition-all"
          onClick={() => router.back()}
        >
          戻る
        </button>
      </div>
    </main>
  );
};

export default CheckDetailPage; */}