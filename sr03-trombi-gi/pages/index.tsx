import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './components/header/header'
import SearchBar from './components/search-bar/search-bar'
import SliderBoard from './components/slider-board/slider-board'
import {Card, DataSetPerson} from './components/card/card'

export default class Home extends React.Component {
  private dataSet: DataSetPerson
  private sort: string
  private isLoading: boolean
  private isDark: boolean

  constructor(props) {
    super(props)
    this.dataSet = []
    this.isDark = false
  }

  refresh = () => {
    this.setState({})
  }

  getDataSet = (dataSet: DataSetPerson, sort: string) => {
    this.dataSet = dataSet
    this.sort = sort
    this.refresh()
  }

  toggleSpin = () => {
    this.isLoading = !this.isLoading
    this.refresh()
  }

  setDarkness = (active:boolean): void => {
    this.isDark = active
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
            <SearchBar getDataSet={this.getDataSet} toggleSpin={this.toggleSpin} disabled={this.isDark}/>
          </Header>
          <SliderBoard isDark={this.isDark}>
            {
              this.dataSet !== undefined &&
              Array.isArray(this.dataSet) &&
              this.dataSet.length > 0 &&
              this.dataSet.map( data => <Card data={data} sort={this.sort} setDarkness={this.setDarkness} isDark={this.isDark}/>)
            }
          </SliderBoard>
        </main>
      </div>
    )
  }
}
