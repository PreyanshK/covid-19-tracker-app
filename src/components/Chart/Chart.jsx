import React, { useState, useEffect } from 'react'
import  { fetchDailyData } from '../../api'
import  { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'
import zIndex from '@material-ui/core/styles/zIndex'

function Chart() {
    
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {

        //setDailyData will store the fetchDailyData form the api
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData())
        }

        // console.log(dailyData)
        fetchAPI()
    })

    const lineChart = (
        
        //if dailyData array is not empty -> generate the line Graph
        dailyData.length != 0
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
                        fill: true,
                        zIndex:10
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(211,47,47 ,1)',
                        backgroundColor: 'rgba(229,115,115 ,0.75)',
                        fill: true,
                        zIndex: 100
                    }]
                }}
            /> ) : null
    )

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart