import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl} from '@material-ui/core'
import styles from "./CountryPicker.module.css"
import { fetchCountries } from '../../api'

function CountryPicker({ handleCountryChange }) {

    //initialize as an array since all countries will be stored in 1 array
    const [ fetchedCountries, setFetchedCountries ] = useState([])
    
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }

        fetchAPI()
        
        // changes only when setFetchCountries changes
        //this will allow us to pick and set different countries
    }, [setFetchedCountries]) 

    // console.log(fetchedCountries)

    return(
        //Ensure that global is an empty string value
        //So in ./api/Index.js, the country will be null - "", which will ensure a line graph is generated
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={ (event) => handleCountryChange(event.target.value)}>
                
                <option value="">Global</option>
                
                {fetchedCountries.map((country, i) =><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker