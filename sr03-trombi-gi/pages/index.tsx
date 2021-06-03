import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode.react'
import Header from './components/header/header'
import SearchBar from './components/search-bar/search-bar'
import SliderBoard from './components/slider-board/slider-board'
import {Card, DataSetPerson} from './components/card/card'

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

export default class Home extends React.Component {
  private dataSet: DataSetPerson
  private isLoading: boolean

  constructor(props) {
    super(props)
    this.dataSet = []
  }

  refresh = () => {
    this.setState({})
  }

  getDataSet = (dataSet) => {
    this.dataSet = dataSet
    this.refresh()
  }

  toggleSpin = () => {
    this.isLoading = !this.isLoading
    this.refresh()
  }

  render = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>Trombinoscope du Génie Informatique l'université de technologie de Compiègne</title>
          <meta name="description" content="Trombinoscope du Génie Informatique de l'université de technologie de Compiègne" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main+(this.isLoading ? " "+styles.loading : "")}>
          <Header title="Trombinoscope du Génie Informatique">
            <SearchBar getDataSet={this.getDataSet} toggleSpin={this.toggleSpin}/>
          </Header>
          <SliderBoard>
            {
              this.dataSet !== undefined &&
              Array.isArray(this.dataSet) &&
              this.dataSet.length > 0 &&
              this.dataSet.map( data => <Card data={data}/>)
            }
          </SliderBoard>
        </main>
      </div>
    )
  }
}
