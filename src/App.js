import React from 'react'

import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import { fetchData } from './api' //index file is imported from the parent folder

class App extends React.Component {

    state = {
        data: {},
        country: ''
    }

    async componentDidMount () {
        const fetchedData = await fetchData()
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country)
        console.log(fetchedData)
        console.log(country)
        //fetch data
        //set state
    }
    render() {

        const { data } = this.state

        return(
            <div className={styles.container}>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart />
            </div>
        )
    }
}

export default App