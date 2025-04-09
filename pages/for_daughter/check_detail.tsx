// pages/for_daughter/check_detail.tsx
import React from "react";
import { useRouter } from "next/router";

const CheckDetailPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white px-4 py-6 overflow-y-auto">
      <h1 className="text-center text-xl font-semibold mb-6">トータルコーディネートを確認する</h1>

      {/* 変身後の画像 */}
      <div className="flex justify-center mb-4">
        <img
          src="/dad_after.jpg" // ← 変身後の写真を入れてください
          alt="変身後の写真"
          className="w-64 h-auto rounded-md"
        />
      </div>

      {/* 解説テキスト */}
      <p className="text-sm text-center text-gray-700 mb-6">
        かっこいい顔立ちはそのままに、髭を剃って髪型はパーマを残しつつ清潔感が漂うイケおじに仕上げてみました。
      </p>

      {/* スタイリング剤 */}
      <div className="flex items-center mb-6">
        <img
          src="/styling_product.jpg" // ← スタイリング剤の画像を入れてください
          alt="スタイリング剤"
          className="w-24 h-auto mr-4"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium">ルシード ヘアフォーム</p>
          <p className="text-xs text-gray-600 mb-2">ボリュームパウダーフォーム ふんわりハード</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 px-3 rounded">
            今すぐ購入する
          </button>
        </div>
      </div>

      {/* 美容院のオーダーシート */}
      <div className="flex justify-center mb-8">
        <button
          className="bg-pink-300 hover:bg-pink-400 text-white py-2 px-4 rounded-lg"
          onClick={() => alert("美容院用オーダーシートへ移動")} // ← 遷移先があればrouter.push()に変更
        >
          美容院のオーダーシートを出力
        </button>
      </div>

      {/* インナー */}
      <div className="flex items-center mb-4">
        <img src="/inner.jpg" alt="インナー" className="w-20 h-auto mr-4" />
        <div className="flex flex-col">
          <p className="text-sm font-medium">United Arrows</p>
          <p className="text-xs text-gray-600">オックスフォード長袖シャツ</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-3 rounded mt-1">
            カートに入れる
          </button>
        </div>
      </div>

      {/* アウター */}
      <div className="flex items-center mb-4">
        <img src="/outer.jpg" alt="アウター" className="w-20 h-auto mr-4" />
        <div className="flex flex-col">
          <p className="text-sm font-medium">United Arrows</p>
          <p className="text-xs text-gray-600">2ボタンスリムジャケット</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-3 rounded mt-1">
            カートに入れる
          </button>
        </div>
      </div>

      {/* パンツ */}
      <div className="flex items-center mb-6">
        <img src="/pants.jpg" alt="パンツ" className="w-20 h-auto mr-4" />
        <div className="flex flex-col">
          <p className="text-sm font-medium">United Arrows</p>
          <p className="text-xs text-gray-600">テーパードパンツ</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-3 rounded mt-1">
            カートに入れる
          </button>
        </div>
      </div>

      {/* 戻るボタン */}
      <div className="flex justify-center mb-10">
        <button
          className="bg-pink-300 hover:bg-pink-400 text-white py-2 px-4 rounded-lg"
          onClick={() => router.back()}
        >
          戻る
        </button>
      </div>
    </main>
  );
};

export default CheckDetailPage;
