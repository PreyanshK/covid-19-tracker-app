import React, {useState, useEffect} from 'react'
import { MenuItem, FormControl, Select, Menu, Card, CardContent, Typography } from '@material-ui/core'
import InfoCard from "./components/InfoCard"
import Map from "./components/Map"
import Table from "./components/Table"
import LineGraph from "./components/LineGraph"
import "./App.css"
import { sortData , prettyPrintStat } from "./utilities"
import "leaflet/dist/leaflet.css"

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

    // Center Coordinates
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    //set default case type on map and chart to Confirmed cases
    const [casesType, setCasesType] = useState("cases");

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

                //use the sorting algorithm from utilities
                const sortedData = sortData(data);
                setTableData(sortedData);
                setMapCountries(data);
                setCountries(countries);
            });
        }

        getCountriesData();

    }, []);

    // we need to create an onChange method to update the selected country
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

            if (countryCode === "worldwide") {
                setMapCenter([34.80746, -40.4796]);
                setMapZoom(3);
            } else {
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            }
        });
    }

    console.log("COUNTRY INFO >>>", countryInfo);
    
    return(
        <div className="app">
            <div className="app_page-container">
                <div className="app__leftContainer">
                    <div className="app__header">
                        <h2 className="app__header-title">COVID-19 TRACKER</h2>
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
                            active={casesType === "cases"} 
                            isCases
                            onClick={(e) => setCasesType("cases")}
                            title="Confirmed Cases" 
                            cases={countryInfo.todayCases} 
                            total={countryInfo.cases}
                        />
                        <InfoCard
                            active={casesType === "recovered"}
                            isRecovered
                            onClick={(e) => setCasesType("recovered")}
                            title="Recovered Cases"
                            cases={countryInfo.todayRecovered}
                            total={countryInfo.recovered}
                        />
                        <InfoCard
                            active={casesType === "deaths"}
                            isDeaths 
                            onClick={(e) => setCasesType("deaths")}
                            title="Deaths"
                            cases={countryInfo.todayDeaths}
                            total={countryInfo.deaths}
                        />
                    </div>

                    <Map 
                        casesType={casesType}
                        countries={mapCountries}
                        center={mapCenter}
                        zoom={mapZoom}
                    />
                </div>  
                <Card className="app__rightContainer">
                    <CardContent>

                        {/* Cases Table */}
                        <h3>Total Cases By Country</h3>
                        <Table 
                            casesType={casesType}
                            countries={tableData}
                        />

                        {/* Graph */}
                        <h3 className="app__graphTitle"> Worldwide Daily {casesType}</h3>
                        <LineGraph className="app__graph" casesType={casesType}/>
                    </CardContent>

                </Card>  
            </div>
            
            <div className="app__footer">
                <Typography className="app__header-title">
                    &copy; Preyansh Kachhia {new Date().getFullYear()}
                </Typography>         
            </div> 
        </div>
    )
}

export default App