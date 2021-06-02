import React from 'react'
import styles from './slider-board.module.css'

export default class SliderBoard extends React.Component {
    constructor(props) {
        super(props)
    }

    refresh = () => {
        this.setState({})
    }

    render = () => {
        return (
            <div className={styles.board}>
                {
                    this.props.children
                }
            </div>
        )
    }
}