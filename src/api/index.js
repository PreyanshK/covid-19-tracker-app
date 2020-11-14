import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export async function fetchData(country) {
    
    //initially componentDidMount url will be Original Url and country will be Undefined    
    let changeableUrl = url
    //once a country is selected the url will change

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {

       const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl)
       
       return{ confirmed, recovered, deaths, lastUpdate } 

    } catch(error) {

    }
}

//fetch the Daily Data for confirmed, recovered and deaths
export async function fetchDailyData() {
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData
        // console.log(data)
    } catch (error) {
        console.log(error)
    }
}

//fetch the list of Countries
export async function fetchCountries() {

    try {
        const { data: { countries }} = await axios.get(`${url}/countries`)

        //return a new array which contains a list of the country names
        return countries.map((country) => country.name)

         // console.log(response)
        
    } catch (error) {
      console.log(error)  
    }
}
