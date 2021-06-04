import React from 'react'
import { GetStaticPropsContext } from 'next'
import styles from './search-bar.module.css'
import {
    Search as SearchIcon,
    SortUp as SortUpIcon,
    SortDown as SortDownIcon
} from 'react-bootstrap-icons'
import { DataPerson, DataSetPerson } from '../card/card'

const http_user = 'wsuser'
const http_password = 'v3Kenobi!'
const token = Buffer.from(`${http_user}:${http_password}`).toString('base64')
const root_url = "https://webservices.utc.fr/api/v1/trombi/"

type propsSearchBar = Readonly<{
    getDataSet(dataSet: DataSetPerson): void;
    toggleSpin(): void;
}>

type filterValue = "nomAz" | "fonction" | "structLibelleFils" | "loca"

export default class SearchBar extends React.Component<propsSearchBar> {
    private temp_dataSet: DataSetPerson
    private last_dataSet: DataSetPerson
    private filter: filterValue
    private order: 1 | -1

    constructor(props) {
        super(props)
        this.filter = "nomAz"
        this.order = 1
        this.temp_dataSet = []
        this.request(root_url+"gi",{}).then(dataSet => {
            /* Traitement de la promesse de requête */

            // On prend un tampon pour ne plus avoir à effectuer la requête pour le jeu de données par défaut
            this.temp_dataSet = dataSet
            this.last_dataSet = dataSet
            // On transmet les données via la methode de rappel 'getDataSet'
            this.props.getDataSet(dataSet)
            // On quitte le mode CHARGEMENT
            this.props.toggleSpin()
        })
    }

    refresh = () => {
        this.setState({})
    }

    request = async (url: string, context: GetStaticPropsContext<NodeJS.Dict<string>>) : Promise<DataSetPerson> => {
        /* Methode de requête générique */

        // On fait passer la page en mode CHARGEMENT
        this.props.toggleSpin()

        // On vérifie si des paramètres sont passés
        const params = context.params !== undefined ? context.params : {}
        // On génère la route avec l'URL et les paramètres s'il y en a
        let params_str = ""
        for(let key in params) {
            params_str += `${params_str.length > 0 ? '&' : ''}${key}=${params[key]}`
        }
        const route = url + (params_str.length > 0 ? "?"+params_str : "")
        // On effectue la requête en indiquant le type de contenu et le jeton Basic
        const res = await fetch(route, {method: 'GET', headers: {'Authorization': `Basic ${token}`, 'Content-Type': 'application/json'}})
        // Une fois la requête complétée, on attend une réponse que l'on parse et que l'on retourne ensuite
        return await res.json()
    } 

    search = (e: React.FormEvent<HTMLElement>) => {
        /* Lit la valeur retourner par la barre de recherche et effectue le traitement adéquat */
        
        e.preventDefault() // Empêche le form d'effectuer son action

        const searchElement = document.getElementById("search") as HTMLInputElement
        if (searchElement.value === undefined || searchElement.value === null || searchElement.value.length === 0) {
            /* si la barre est vidée alors on affiche les données par défaut */
            this.props.getDataSet(this.temp_dataSet)
        } else {
            /* si une recherche est effectue par l'utilisateur, on émet la requête correspondante */
        console.log(searchElement.value)
        this.request(root_url+"gi",{params: {name: searchElement.value}})
            .then(dataSet => {
                dataSet = this.applyFilter(dataSet)
                this.last_dataSet = dataSet
                this.props.getDataSet(dataSet)
                this.props.toggleSpin() // on oublie pas de sortir du mode CHARGEMENT
            })
        }
    }

    setFilter = (newFilter: filterValue) => {
        this.props.toggleSpin() // on active le mode CHARGEMENT
        if(this.filter !== newFilter) {
            this.filter = newFilter
            this.order = 1
        } else {
            this.order *= -1
        }
        this.refresh()
        this.last_dataSet = this.applyFilter(this.last_dataSet)
        this.props.getDataSet(this.last_dataSet)
        this.props.toggleSpin() // on oublie pas de sortir du mode CHARGEMENT
    }

    applyFilter = (dataSet: DataSetPerson) => {
        dataSet = dataSet.sort((data1: DataPerson, data2: DataPerson) : number => 
            data2[this.filter] > data1[this.filter] ? -this.order : this.order
        )
        return dataSet
    }

    render = () => {
        return (
            <>
            <form className={styles.searchBar} onSubmit={this.search}>
                <SearchIcon className={styles.searchIcon} />
                <input className={styles.input} type="text" id="search" name="search" placeholder="Rechercher"/>
            </form>
            <div className={styles.filterBar}>
                <div className={"btn"+(this.filter === "nomAz" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setFilter("nomAz")}>{
                     this.filter === "nomAz" && ((this.order === 1 && <SortUpIcon/>) || (this.order === -1 && <SortDownIcon/>))
                     }Nom</div>
                <div className={"btn"+(this.filter === "fonction" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setFilter("fonction")}>{
                    this.filter === "fonction" && ((this.order === 1 && <SortUpIcon/>) || (this.order === -1 && <SortDownIcon/>))
                    }Fonction</div>
                <div className={"btn"+(this.filter === "structLibelleFils" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setFilter("structLibelleFils")}>{
                    this.filter === "structLibelleFils" && ((this.order === 1 && <SortUpIcon/>) || (this.order === -1 && <SortDownIcon/>))
                    }Structure</div>
                <div className={"btn"+(this.filter === "loca" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setFilter("loca")}>{
                    this.filter === "loca" && ((this.order === 1 && <SortUpIcon/>) || (this.order === -1 && <SortDownIcon/>))
                    }Bureau</div>
            </div>
            </>
        )
    }
}