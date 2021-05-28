import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode.react';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trombinoscope du Génie Informatique de l'université de technologie de Compiègne</title>
        <meta name="description" content="Trombinoscope du Génie Informatique de l'université de technologie de Compiègne" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
         <QRCode
            id="qrCodeTel"
            size={150}
            value={'tel:0778464320'}
          />
          <img alt="logotype université de technologie de Compiègne" src="logo_utc.png"/>
          <QRCode
            id="qrCodeMail"
            size={150}
            value={'mailto:jeremy.godde@etu.utc.fr'}
          />
        </main>
    </div>
  )
}
