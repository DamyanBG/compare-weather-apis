import { useEffect, useState } from 'react'
import { OPEN_WEATHER_API_KEY, WEATHER_API_KEY } from '../utils/keys'
import { OPEN_WEATHER_API_URL, WEATHER_API_URL } from "../utils/urls"
import "./Weather.scss"

interface Condition {
    icon: string
}

interface Current {
    temp_c: number,
    condition?: Condition
}

interface WeatherApiInfo {
    current: Current,
    location: object
}

const defaultWeatherApiInfo: WeatherApiInfo = {
    current: {
        temp_c: 0
    },
    location: {}
}

const Weather: React.FC = () => {
    const [weatherAPIInfo, setWeatherAPIInfo] = useState(defaultWeatherApiInfo)
    const [openWeatherApiInfo, setOpenWeatherApiInfo] = useState()

    const fetchOpenWeatherApi = () => {
        fetch(`${OPEN_WEATHER_API_URL}?lat=43.5&lon=27.8&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
            })
    }

    const fetchWeatherAPI = () => {
        fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=Dobrich`)
            .then(resp => resp.json())
            .then(setWeatherAPIInfo)
    }

    useEffect(() => {
        fetchOpenWeatherApi()
    }, [])

    // useEffect(() => {
    //     fetchWeatherAPI()
    // }, [])

    return (
        <main>
            <h1>Comparing information of few weather APIs</h1>
            <div>
                <article>
                    <h2>Weather API</h2>
                    <img src={weatherAPIInfo.current.condition?.icon} alt="No API image available" />
                    <p>Temperature: {weatherAPIInfo.current.temp_c}</p>
                </article>
                <article>
                    <h2>OpenWeather Api</h2>
                    
                </article>
            </div>
        </main>
    )
} 

export default Weather;