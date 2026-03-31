import React from 'react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', maxWidth: '500px', width: '100%', padding: '40px', borderRadius: '20px', shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: '10px' }}>人生逆転シミュレーター</h1>
        <p style={{ color: '#4b5563', marginBottom: '30px' }}>4月1日プロジェクト開始：あなたの再生を支援します。</p>

        <div style={{ backgroundColor: '#eff6ff', padding: '24px', borderRadius: '16px', border: '2px solid #bfdbfe' }}>
          <p style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.1em' }}>SPONSORED</p>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', lineHeight: '1.4' }}>
            「他所では困難な悪質ヤミ金にも対応！！」
            <br />
            <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#6b7280' }}>匿名・無料で今すぐ相談できます</span>
          </div>

          <a 
            href="https://px.a8.net/svt/ejp?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" 
            rel="nofollow"
            target="_blank"
            style={{
              backgroundColor: '#f97316',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline-block',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            今すぐ解決策を診断する →
          </a>
          {/* 計測用タグ */}
          <img style={{ border: 'none' }} width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" alt="" />
        </div>

        <p style={{ marginTop: '30px', fontSize: '12px', color: '#9ca3af' }}>※本サービスはアフィリエイト広告を含みます。</p>
      </div>
    </div>
  );
}
