// pages/_app.tsx
import '../styles/globals.css' // Tailwind CSS を読み込む（あとで作成）
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
