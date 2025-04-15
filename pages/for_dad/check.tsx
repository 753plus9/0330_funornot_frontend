// pages/for_dad/check.tsx

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const CheckPage = () => {
  const router = useRouter();
  const { family_id } = router.query; // ← クエリ取得

  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!family_id) return; // family_idが取得できてないときは実行しない

    // fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/check_by_family/${family_id}`)
    fetch(`https://app-002-step3-2-py-oshima6.azurewebsites.net/check_by_family/${family_id}`)

      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setImageUrl(data.before_url);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        console.error("通信エラー:", err);
      });
  }, [family_id]);
// 変更↓
  const handleConfirmClick = () => {
    router.push(`/for_dad/check_detail?family_id=${family_id}`);
  };
  

  const handleBackClick = () => {
    router.push("/menu");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-8 text-black">
      <h1 className="text-2xl font-semibold text-center mb-6">for 父</h1>

      <div className="w-60 h-auto mb-6">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="変身前の写真"
            width={240}
            height={320}
            className="rounded-lg mx-auto"
          />
        )}
      </div>

      <div className="text-sm leading-relaxed text-left whitespace-pre-wrap mb-6 max-w-[240px]">
        {message}
      </div>

      <button
        onClick={handleConfirmClick}
        className="bg-rose-300 hover:bg-rose-400 text-white font-medium py-3 px-6 rounded-xl w-full max-w-xs mb-4"
      >
        娘からの提案を確認する
      </button>

      <button
        onClick={handleBackClick}
        className="bg-rose-300 hover:bg-rose-400 text-white font-medium py-3 px-6 rounded-xl w-full max-w-xs"
      >
        戻る
      </button>
    </main>
  );
};

export default CheckPage;




// // pages/for_dad/check.tsx
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

// export default function CheckPage() {
//   const router = useRouter()
//   const { family_id } = router.query
//   const [bedandyData, setBedandyData] = useState(null)

//   useEffect(() => {
//     if (family_id) {
//       // APIからデータ取得処理
//     }
//   }, [family_id])

//   return (
//     <div>
//       <h1>お父さんへのメッセージ</h1>
//       <p>あなたの家族IDは：{family_id}</p> {/* family_id を表示 */}
//     </div>
//   )
// }
