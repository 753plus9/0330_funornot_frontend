// pages/for_daughter/check.tsx
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const CheckPage = () => {
  const router = useRouter();

  const handleConfirmClick = () => {
    router.push("/for_daughter/check_detail");
  };

  const handleBackClick = () => {
    router.push("/menu");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-8 text-black">
      {/* タイトル */}
      <h1 className="text-2xl font-semibold text-center mb-6">for 父</h1>

      {/* 写真エリア */}
      <div className="w-60 h-auto mb-6">
        <Image
          src="/sample_result.png" // 画像パスはpublic以下に設置してね
          alt="変身前の写真"
          width={240}
          height={320}
          className="rounded-lg mx-auto"
        />
      </div>

      {/* メッセージエリア */}
      <div className="text-sm leading-relaxed text-left whitespace-pre-wrap mb-6 max-w-[240px]">
        パパへ
        {"\n"}いつもお仕事お疲れ様です。
        {"\n"}私の学校の悩みとか聞いてくれてありがとう。
        {"\n\n"}来月の文化祭に来てくれるとのことですが、
        {"\n"}これからもカッコいいパパでいてほしいので、
        {"\n"}私からの提案を送るね！
        {"\n"}ちょっと見てみてください。
        {"\n\n"}さくら
      </div>

      {/* 「娘からの提案を確認する」ボタン */}
      <button
        onClick={handleConfirmClick}
        className="bg-rose-300 hover:bg-rose-400 text-white font-medium py-3 px-6 rounded-xl w-full max-w-xs mb-4"
      >
        娘からの提案を確認する
      </button>

      {/* 「戻る」ボタン */}
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
