import React from 'react'
import styles from './header.module.css'

type PropsHeader = Readonly<{ children?: React.ReactNode; title?: string;}>

export default class Header extends React.Component {
    private properties: PropsHeader

    constructor(props: PropsHeader) {
        super(props)
        this.properties = props
    }

    refresh = () => {
        this.setState({})
    }

    render = () => {
        return (
            <header className={styles.header}>
                <h1>{(this.properties.title && this.properties.title) || 'Trombinoscope'}</h1>
                <div>
                {
                    this.properties.children
                }
                </div>
                <img src="logo_utc.jpg"/>
            </header>
        )
    }
}