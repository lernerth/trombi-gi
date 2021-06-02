import React from 'react'
import styles from './card.module.css'
import stylesBoard from '../slider-board/slider-board.module.css'
import { 
    PersonCircle as DefaultIcon,
    XLg as CloseIcon,
    TelephoneFill as PhoneIcon,
    EnvelopeFill as MailIcon
} from 'react-bootstrap-icons'

export default interface DataPerson {
    mail: string;
    structLibelleFils: string;
    telPoste1: string;
    telPoste2?: string;
    trimbiDiffuserPhoto$f: string;
    loca: string;
    fonction: string;
    nomAz: string;
    prenomAz: string;
    photo: string;
}

type PropsCard = Readonly<{data: DataPerson;}>

export default class Card extends React.Component {
    private properties: PropsCard
    private isOpen: boolean
    private static mustBeBlocked: boolean = false

    constructor(props: PropsCard) {
        super(props)
        this.properties = props
        this.isOpen = false
    }

    refresh = () => {
        this.setState({})
    }

    open = () => {
        if(!Card.mustBeBlocked) {
            this.isOpen = true
            Card.mustBeBlocked = true
            this.refresh()
        }
    }

    close = () => {
        if(this.isOpen) {
            this.isOpen = false
            Card.mustBeBlocked = false
            this.refresh()
        }
    }

    openPhone = () => {
        this.refresh()
    }

    mailPhone = () => {
        this.refresh()
    }

    // TODO la partie "open card" n'est pas encore réalisée
    render = () => {
        return (
            <div className={this.isOpen ? styles.openCard+" "+stylesBoard.open : styles.card} onClick={this.isOpen ? null : this.open}>
                {
                    (!this.isOpen &&
                    <> {/* Card on the board */}
                    {
                    (this.properties.data.trimbiDiffuserPhoto$f == "N" &&
                    <DefaultIcon className={styles.picture}/>) ||
                    <img className={styles.picture} src={this.properties.data.photo}/>
                    }
                    <span className={styles.label}>{this.properties.data.prenomAz} {this.properties.data.nomAz.toUpperCase()}</span>
                    </>) ||
                    <> {/* Opened card on the board */}
                    <div className={styles.closeBtn+" "+styles.btn} onClick={this.close}><CloseIcon /></div>
                    <div className={styles.phoneBtn+" "+styles.btn} onClick={this.openPhone}><PhoneIcon /> Tél.</div>
                    <div className={styles.mailBtn+" "+styles.btn} onClick={this.mailPhone}><MailIcon /> Mail</div>
                    </>
                }
            </div>
        )
    }
}