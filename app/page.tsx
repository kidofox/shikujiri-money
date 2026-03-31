import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: '40px', textAlign: 'center' }}>
      <h1>人生逆転シミュレーター</h1>
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
            display: 'inline-block'
          }}
        >
          今すぐ解決策を診断する →
        </a>
        {/* border="0" を削除し、styleで対応してエラーを回避 */}
        <img 
          style={{ border: 'none' }} 
          width="1" 
          height="1" 
          src="https://www10.a8.net/0.gif?a8mat=4B1ATG+CBJYGI+4FR4+BXQOI" 
          alt="" 
        />
      </div>
    </main>
  );
}
