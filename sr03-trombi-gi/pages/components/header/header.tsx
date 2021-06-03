import React from 'react'
import styles from './header.module.css'

type PropsHeader = Readonly<{ children?: React.ReactNode; title?: string;}>

export default class Header extends React.Component<PropsHeader> {
    constructor(props: PropsHeader) {
        super(props)
        this.props = props
    }

    refresh = () => {
        this.setState({})
    }

    render = () => {
        return (
            <header className={styles.header}>
                <h1>{(this.props.title && this.props.title) || 'Trombinoscope'}</h1>
                <div>
                {
                    this.props.children
                }
                </div>
                <img src="logo_utc.jpg"/>
            </header>
        )
    }
}