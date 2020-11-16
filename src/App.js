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
        
        //fetch data for the country chosen
        const fetchedData = await fetchData(country)

       //set state for the country chosen
       this.setState({data: fetchedData, country: country })
           
    }
    render() {

        const { data, country } = this.state

        return(
            <div className={styles.container}>           
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App