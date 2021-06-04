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


type sortValue = "nomAz" | "fonction" | "structLibelleFils" | "loca"

type propsSearchBar = Readonly<{
    getDataSet(dataSet: DataSetPerson, sort?: sortValue): void;
    toggleSpin(): void;
}>

export default class SearchBar extends React.Component<propsSearchBar> {
    private temp_dataSet: DataSetPerson
    private last_dataSet: DataSetPerson
    private sort: sortValue
    private order: 1 | -1

    constructor(props) {
        super(props)
        this.sort = "nomAz"
        this.order = 1
        this.temp_dataSet = []
        this.request(root_url+"gi",{}).then(dataSet => {
            /* Traitement de la promesse de requête */

            // On prend un tampon pour ne plus avoir à effectuer la requête pour le jeu de données par défaut
            this.temp_dataSet = dataSet
            // On filtre puis on transmet les données via la methode de rappel 'getDataSet'
            this.applySort(dataSet)
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
        this.request(root_url+"gi",{params: {name: searchElement.value}})
            .then(dataSet => {
                this.applySort(dataSet)
                this.props.toggleSpin() // on oublie pas de sortir du mode CHARGEMENT
            })
        }
    }

    setSort = (newSort: sortValue) => {
        this.props.toggleSpin() // on active le mode CHARGEMENT
        if(this.sort !== newSort) {
            this.sort = newSort
            this.order = 1
        } else {
            this.order *= -1
        }
        this.refresh()
        this.applySort(this.last_dataSet)
        this.props.toggleSpin() // on oublie pas de sortir du mode CHARGEMENT
    }

    applySort = (dataSet: DataSetPerson) => {
        this.last_dataSet = dataSet.sort((data1: DataPerson, data2: DataPerson) : number => 
            data2[this.sort] > data1[this.sort] ? -this.order : this.order
        )
        this.props.getDataSet(this.last_dataSet,this.sort)
    }

    render = () => {
        return (
            <>
            <form className={styles.searchBar} onSubmit={this.search}>
                <SearchIcon className={styles.searchIcon} />
                <input className={styles.input} type="text" id="search" name="search" placeholder="Rechercher"/>
            </form>
            <div className={styles.sortBar}>
                <div className={"btn"+(this.sort === "nomAz" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setSort("nomAz")}>
                    {
                    (this.sort === "nomAz" &&
                        ((this.order === 1 && <><SortDownIcon/>{'A-Z'}</>)
                        || (this.order === -1 && <><SortUpIcon/>{'Z-A'}</>))
                    ) || 'Nom'
                    }
                </div>

                <div className={"btn"+(this.sort === "fonction" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setSort("fonction")}>
                    {
                    (this.sort === "fonction" &&
                        ((this.order === 1 && <><SortDownIcon/>{'A-Z'}</>)
                        || (this.order === -1 && <><SortUpIcon/>{'Z-A'}</>))
                    ) || 'Fonction'
                    }
                </div>

                <div className={"btn"+(this.sort === "structLibelleFils" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setSort("structLibelleFils")}>
                    {
                    (this.sort === "structLibelleFils" &&
                        ((this.order === 1 && <><SortDownIcon/>{'A-Z'}</>)
                        || (this.order === -1 && <><SortUpIcon/>{'Z-A'}</>))
                    ) || 'Structure'
                    }
                </div>

                <div className={"btn"+(this.sort === "loca" ? " "+styles.selectBtn : "")}
                     onClick={() => this.setSort("loca")}>
                    {
                    (this.sort === "loca" &&
                        ((this.order === 1 && <><SortDownIcon/>{'A-Z'}</>)
                        || (this.order === -1 && <><SortUpIcon/>{'Z-A'}</>))
                    ) || 'Bureau'
                    }
                </div>
            </div>
            </>
        )
    }
}