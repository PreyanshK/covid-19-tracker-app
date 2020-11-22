import React, {useState, useEffect} from 'react'

// import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import { fetchData } from './api' //index file is imported from the parent folder
import { MenuItem, FormControl, Select, Menu, Card, CardContent } from '@material-ui/core'
import InfoCard from "./components/InfoCard"
import Map from "./components/Map"
import Table from "./components/Table"
import "./App.css"


// class App extends React.Component {

//     state = {
//         data: {},
//         country: ''
//     }

//     async componentDidMount () {
//         const fetchedData = await fetchData()
//         this.setState({data: fetchedData})
//     }

//     handleCountryChange = async (country) => {
        
//         //fetch data for the country chosen
//         const fetchedData = await fetchData(country)

//        //set state for the country chosen
//        this.setState({data: fetchedData, country: country })
           
//     }
//     render() {

//         const { data, country } = this.state

//         return(
//             <div className={styles.container}>
//                 <Cards data={data}/>
//                 <CountryPicker handleCountryChange={this.handleCountryChange}/>
//                 <Chart data={data} country={country}/>
//             </div>
//         )
//     }
// }

function App() {

    // STATE =  How to write a variable in REACT

    // API: "https://disease.sh/v3/covid-19/countries"
    
    // USEFFECT = Runs a piece of code 
    // based on a given condition

    //if we leave empty square brackets []
    //it will run once when component loads, not again - similar to ComponentDidMount()
    
    //e.g. if I have [countries], then it will once when component loads
    //and then every time 'countries' variable is changed

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    //When this component first loads, pull worldwide info (default country)
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        });

    }, []);

    useEffect(() => {

        //async -> send request to a server, so we have to wait for it to reply back

        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                //return an array which contains the country names
                const countries = data.map((country) => ({
                    name: country.country, // Full Name : United States
                    value: country.countryInfo.iso2, // Short Name: USA, UK
                }));

                setTableData(data);
                setCountries(countries);
            });
        }

        getCountriesData();

    }, []);

    // we need to create an onChange method to update the selected country
    // async - 
    const handleCountryChange = async (event) => {

        //get selected value in the dropdown (country)
        const countryCode = event.target.value;

        //Call API to pull data for the chosen country
        //If world wide is selected call worlwide API,
        //Else pull the info for the chosen country

        const url = countryCode === "worldwide" 
        ? "https://disease.sh/v3/covid-19/all" 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountry(countryCode);
            //All of the dat from the country response
            setCountryInfo(data);
        });
    }
    console.log("COUNTRY INFO >>>", countryInfo)
    return(
        <div className="app">
            <div className="app__leftContainer">
                <div className="app__header">
                    <h1>COVID-19 TRACKER</h1>
                        <FormControl className="app__dropdown">
                            <Select variant="outlined" onChange={handleCountryChange} value={country}>
                                <MenuItem value="worldwide">Worldwide</MenuItem>

                                {/* Loop through all the countries 
                                and populate them in the country dropdown*/}

                                {countries.map((country) => (
                                    <MenuItem value={country.value}>{country.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                </div>

                <div className="app__info">
                    <InfoCard 
                        title="Confirmed Cases" 
                        cases={countryInfo.todayCases} 
                        total={countryInfo.cases}
                    />
                    <InfoCard 
                        title="Recovered Cases"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />
                    <InfoCard 
                        title="Deaths"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>

                <Map />
            </div>  
            <Card className="app__rightContainer">
                <CardContent>

                    {/* Cases Table */}
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData}/>
                    {/* Graph */}
                    <h3>Worldwide new cases</h3>
                    
                </CardContent>

            </Card>     
        </div>
    )
}

export default App