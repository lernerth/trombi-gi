import Head from 'next/head'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode.react'
import Header from './components/header/header'
import SearchBar from './components/search-bar/search-bar'
import SliderBoard from './components/slider-board/slider-board'
import Card from './components/card/card'

/*
          <QRCode
            id="qrCodeTel"
            value={'tel:0778464320'}
          />
          <QRCode
            id="qrCodeMail"
            value={'mailto:jeremy.godde@etu.utc.fr'}
          />
*/

export default function Home() {
  const dataPersonTest = {
    mail: "jeremy.godde@etu.utc.fr", 
    structLibelleFils: "Cursus Ingénieur Continu",
    telPoste1: "0778464320",
    trimbiDiffuserPhoto$f: "Y",
    loca: "SI G 000",
    fonction: "étudiant",
    nomAz: "Godde",
    prenomAz: "Jérémy",
    photo: "https://s1.qwant.com/thumbr/0x380/8/d/137f4ed9f5acd5f2ceefed85d7ad68a0f7399b53a3f22bc938bf4dad86906c/1200px-Portrait_of_jan_de_leeuw.jpg?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc2%2FPortrait_of_jan_de_leeuw.jpg%2F1200px-Portrait_of_jan_de_leeuw.jpg&q=0&b=1&p=0&a=0",
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Trombinoscope du Génie Informatique l'université de technologie de Compiègne</title>
        <meta name="description" content="Trombinoscope du Génie Informatique de l'université de technologie de Compiègne" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header title="Trombinoscope du Génie Informatique">
          <SearchBar/>
        </Header>
        <SliderBoard>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
          <Card data={dataPersonTest}/>
        </SliderBoard>
      </main>
    </div>
  )
}
