import React from 'react'
import styles from './card.module.css'
import stylesBoard from '../slider-board/slider-board.module.css'
import { 
    PersonCircle as DefaultIcon,
    XLg as CloseIcon,
    TelephoneFill as PhoneIcon,
    EnvelopeFill as MailIcon
} from 'react-bootstrap-icons'

export interface DataPerson {
    mail: string;
    structLibelleFils: string;
    telPoste1: string;
    telPoste2?: string;
    trimbiDiffuserPhoto$f: string;
    loca: string;
    fonction: string;
    nomAz: string;
    prenomAz: string;
    photo?: string;
}

export type DataSetPerson = Array<DataPerson>

type PropsCard = Readonly<{
    data: DataPerson;
    sort?: string;
}>

export class Card extends React.Component<PropsCard> {
    private isOpen: boolean
    private static mustBeBlocked: boolean = false

    constructor(props: PropsCard) {
        super(props)
        this.isOpen = false
    }

    refresh = () => {
        this.setState({})
    }

    open = () => {
        if (!Card.mustBeBlocked) {
            this.isOpen = true
            Card.mustBeBlocked = true
            this.refresh()
        }
    }

    close = () => {
        if (this.isOpen) {
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
            <div className={this.isOpen ? styles.openCard + " " + stylesBoard.open : styles.card}
                 onClick={this.isOpen ? null : this.open}>
                {
                    (!this.isOpen &&
                        <> {/* Card on the board */}
                            {
                                (
                                    (
                                        this.props.data.trimbiDiffuserPhoto$f == "N" ||
                                        this.props.data.photo === undefined ||
                                        this.props.data.photo === null
                                    ) &&
                                    <DefaultIcon className={styles.picture}/>
                                ) ||
                                <img className={styles.picture} src={`data:image/jpg;base64,${this.props.data.photo}`}/>
                            }
                            <span className={styles.label}>
                        {(this.props.data.prenomAz.length > 11 ? this.props.data.prenomAz.substring(0, 8) + "..." : this.props.data.prenomAz) +
                        " " +
                        (this.props.data.nomAz.length > 11 ? this.props.data.nomAz.substring(0, 8).toUpperCase() + "..." : this.props.data.nomAz.toUpperCase())}
                                {
                                    (this.props.sort == "fonction" || this.props.sort == "structLibelleFils" || this.props.sort == "loca") &&
                                    this.props.data[this.props.sort] !== undefined &&
                                    this.props.data[this.props.sort] !== null &&
                                    <span className={styles.sort}>
                            {
                                this.props.data[this.props.sort].length > 28 ? this.props.data[this.props.sort].substring(0, 25) + "..." : this.props.data[this.props.sort]
                            }
                            </span>
                                }
                        </span>
                        </>) ||
                    <> {/* Opened card on the board */}
                        <div className={styles.closeBtn + " btn"} onClick={this.close}><CloseIcon/></div>

                        <div className={styles.topCard}>
                            <div>
                                <div>
                                    {
                                        (
                                            (
                                                this.props.data.trimbiDiffuserPhoto$f == "N" ||
                                                this.props.data.photo === undefined ||
                                                this.props.data.photo === null
                                            ) &&
                                            <DefaultIcon className={styles.picture}/>
                                        ) ||
                                        <img className={styles.picture}
                                             src={`data:image/jpg;base64,${this.props.data.photo}`}/>
                                    }
                                </div>
                                <div>
                                    {this.props.data.nomAz.toUpperCase() + " " + this.props.data.prenomAz}
                                </div>
                            </div>
                            <div>
                                <div className={styles.phoneBtn + " btn"} onClick={this.openPhone}><PhoneIcon/> Tél.
                                </div>
                                <div className={styles.mailBtn + " btn"} onClick={this.mailPhone}><MailIcon/> Mail</div>
                            </div>
                        </div>

                        <div className={styles.line}>
                        </div>

                        <div className={styles.bottomCard}>
                            <div>
                                <div>{this.props.data.fonction}</div>

                            </div>
                            <div>
                                <div>{this.props.data.loca}</div>
                                <div>{this.props.data.mail}</div>
                                <div>{this.props.data.telPoste1}</div>
                            </div>
                        </div>


                    </>
                }
            </div>
        )
    }
}