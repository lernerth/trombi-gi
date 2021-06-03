import React from 'react'
import { GetStaticPropsContext } from 'next'
import styles from './search-bar.module.css'
import { Search, Search as SearchIcon } from 'react-bootstrap-icons'
import { DataSetPerson } from '../card/card'

const http_user = 'wsuser'
const http_password = 'v3Kenobi!'
const token = Buffer.from(`${http_user}:${http_password}`).toString('base64')
const root_url = "https://webservices.utc.fr/api/v1/trombi/"

type propsSearchBar = Readonly<{
    getDataSet(dataSet: DataSetPerson): void;
    toggleSpin(): void;
}>

export default class SearchBar extends React.Component<propsSearchBar> {
    private temp_dataSet: DataSetPerson

    constructor(props) {
        super(props)
        this.temp_dataSet = []
        this.request(root_url+"gi",{}).then(dataSet => {
            /* Traitement de la promesse de requête */

            // On prend un tampon pour ne plus avoir à effectuer la requête pour le jeu de données par défaut
            this.temp_dataSet = dataSet
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
                this.props.getDataSet(dataSet)
                this.props.toggleSpin() // on oublie pas de sortir du mode CHARGEMENT
            })
        }
    }

    render = () => {
        return (
            <form className={styles.searchBar} onSubmit={this.search}>
                <SearchIcon className={styles.searchIcon} />
                <input className={styles.input} type="text" id="search" name="search" placeholder="Rechercher"/>
            </form>
        )
    }
}