import React from 'react'
import styles from './slider-board.module.css'

type SliderBoardProps = Readonly<{
    isDark: boolean;
}>

export default class SliderBoard extends React.Component<SliderBoardProps> {
    constructor(props) {
        super(props)
    }

    refresh = () => {
        this.setState({})
    }

    render = () => {
        return (
            <div className={styles.board+(this.props.isDark ? ' '+styles.dark : '')}>
                {
                    this.props.children
                }
            </div>
        )
    }
}