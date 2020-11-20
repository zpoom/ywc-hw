import { KioskListPage } from 'features/kiosk/KioskListPage'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>คนละครึ่ง</title>
      </Head>
      <KioskListPage />
    </>
  )
}
