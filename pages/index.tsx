import { KioskListPage } from 'features/kiosk/KioskListPage'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>คนละครึ่ง</title>
        <link rel="shortcut icon" href="/logo-KLK.png" />
      </Head>
      <KioskListPage />
    </>
  )
}
