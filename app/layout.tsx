import React from 'react';

export const metadata = {
  title: '人生逆転シミュレーター',
  description: '仕組みでお金を稼ぐ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
