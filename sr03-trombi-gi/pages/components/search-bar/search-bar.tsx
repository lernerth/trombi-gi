import React from 'react'
import styles from './search-bar.module.css'
import { Search as SearchIcon } from 'react-bootstrap-icons'

type PropsSearchBar = Readonly<{}>

export default class SearchBar extends React.Component {
    private properties: PropsSearchBar

    constructor(props: PropsSearchBar) {
        super(props)
        this.properties = props
    }

    refresh = () => {
        this.setState({})
    }

    render = () => {
        return (
            <form className={styles.searchBar}>
                <SearchIcon className={styles.searchIcon} />
                <input className={styles.input} type="text" name="search" placeholder="Rechercher"/>
            </form>
        )
    }
}