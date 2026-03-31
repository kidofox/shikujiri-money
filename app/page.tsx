import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <h1 style={{ color: '#1d4ed8' }}>人生逆転シミュレーター</h1>
        <p>4月1日プロジェクト開始：あなたの再生を支援します。</p>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '10px' }}>
          <p style={{ fontWeight: 'bold' }}>「他所では困難な悪質ヤミ金にも対応！！」</p>
          
          <div style={{ marginTop: '20px' }}>
            <a 
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" 
              rel="nofollow"
              target="_blank"
              style={{
                backgroundColor: '#f97316',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                display: 'inline-block'
              }}
            >
              今すぐ解決策を診断する →
            </a>
            {/* エラー回避のためimgタグを修正 */}
            <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" alt="promotion" />
          </div>
        </div>
      </div>
    </main>
  );
}
