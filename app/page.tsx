import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          人生逆転シミュレーター（準備中）
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          4月1日プロジェクト開始：ここからあなたの再生を支援します。
        </p>

        {/* --- 案件3：アフィリエイト広告エリア --- */}
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
          <p className="text-sm font-semibold text-blue-500 mb-3 uppercase tracking-widest">
            SPONSORED
          </p>
          <div className="mb-4 text-xl font-bold text-gray-800 leading-snug">
            「他所では困難な悪質ヤミ金にも対応！！」
            <br />
            <span className="text-sm font-normal text-gray-500">匿名・無料で今すぐ相談できます</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <a 
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" 
              rel="nofollow"
              target="_blank"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-transform active:scale-95"
            >
              今すぐ解決策を診断する →
            </a>
            {/* インプレッション計測用タグ */}
            <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" alt="" />
          </div>
        </div>
        {/* ------------------------------------ */}

        <p className="mt-8 text-xs text-gray-400">
          ※本サービスはアフィリエイト広告を含みます。
        </p>
      </div>
    </main>
  );
}
