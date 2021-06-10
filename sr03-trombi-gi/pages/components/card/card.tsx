import React from 'react'
import styles from './card.module.css'
import stylesBoard from '../slider-board/slider-board.module.css'
import QRCode from 'qrcode.react'
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
    private isQrTelOpen: boolean
    private isQrMailOpen: boolean

    constructor(props: PropsCard) {
        super(props)
        this.isOpen = false
        this.isQrMailOpen = false
        this.isQrTelOpen = false

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
        this.isQrTelOpen = true
        this.refresh()
    }

    mailPhone = () => {
        this.isQrMailOpen = true
        this.refresh()
    }

    closeMailPhone = () => {
        this.isQrMailOpen = false
        this.refresh()
    }

    closePhone = () => {
        this.isQrTelOpen = false
        this.refresh()
    }

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
                                {
                                    (!this.isQrMailOpen &&
                                        <>
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
                                            <div className={styles.name}>
                                                {this.props.data.nomAz.toUpperCase() + " " + this.props.data.prenomAz}
                                            </div>
                                        </>) ||
                                    <>{/*qr code mail*/}
                                        <QRCode
                                            id="qrCodeMail"
                                            value={'mailto:'+ this.props.data.mail}
                                        />
                                    </>
                                }

                            </div>
                            <div>

                                {this.isQrTelOpen
                                    ? <div className={styles.closeBtn + " btn"} onClick={this.closePhone}><CloseIcon/>
                                    </div>
                                    :
                                    <div className={styles.phoneBtn + " btn"} onClick={this.openPhone}><PhoneIcon/> Tél.
                                    </div>
                                }
                                {this.isQrMailOpen
                                    ?
                                    <div className={styles.closeBtn + " btn"} onClick={this.closeMailPhone}><CloseIcon/>
                                    </div>
                                    : <div className={styles.mailBtn + " btn"} onClick={this.mailPhone}><MailIcon/> Mail
                                    </div>
                                }
                            </div>
                        </div>

                        <div className={styles.line}>
                        </div>

                        <div className={styles.bottomCard}>
                            {
                                (!this.isQrTelOpen
                                    &&
                                    <> {/*Info*/}

                                        <div>
                                            <div>{this.props.data.fonction}</div>

                                        </div>

                                    </>) ||
                                <>{/*qr code tel1*/}
                                    <QRCode
                                        id="qrCodeTel"
                                        value={'tel:034423' + this.props.data.telPoste1}
                                    />
                                </>
                            }


                            <div>
                                <div>{this.props.data.loca}</div>
                                <div>{this.props.data.mail}</div>
                                {this.props.data.telPoste1 !==null
                                    ? <div>034423{this.props.data.telPoste1}</div>
                                    :
                                    <div>
                                    </div>
                                }
                                {this.props.data.telPoste2 !==null
                                    ? <div>034423{this.props.data.telPoste2}</div>
                                    :
                                    <div>
                                    </div>
                                }
                            </div>
                        </div>


                    </>
                }
            </div>
        )
    }
}
