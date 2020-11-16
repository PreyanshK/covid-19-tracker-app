import React, { useState, useEffect } from 'react'
import  { fetchDailyData } from '../../api'
import  { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

function Chart( {data, country}) {
    
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {

        //setDailyData will store the fetchDailyData form the api
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData())
        }

        // console.log(dailyData)
        fetchAPI()
    }, [])

    const lineChart = (
        
        //if dailyData array is not empty -> generate the line Graph
        dailyData.length
        ?  (
            <Line 
                data={{
                    
                    //Map which returns an array of all dates
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: 'rgba(255,179,0,1)',
                        backgroundColor: 'rgba(255,204,128,0.5)',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(211,47,47 ,1)',
                        backgroundColor: 'rgba(229,115,115 ,0.75)',
                        fill: true
                    }]
                }}
            /> ) : null
    )

    console.log(data.confirmed, data.recovered, data.deaths)

    const barChart = (
        //if confirmed data exists display bar graph
        data.confirmed
        ? (
            <Bar 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [ 
                        'rgba(255, 202, 40, 0.6)', 
                        'rgba(156, 204, 101, 0.6)', 
                        'rgba(244, 67, 54, 0.6)'
                    ],
                    data:[data.confirmed.value, data.recovered.value, data.deaths.value]
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text:`Cases Overview for ${country}`}
            }}
            />
        ) : null
    )

    return (
        //if there is country, then display bar chart, 
        //else if global then line graph
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart