import { useEffect, useState } from 'react'
import { ACCU_WEATHER_API_KEY, OPEN_WEATHER_API_KEY, WEATHER_API_KEY } from '../utils/keys'
import { ACCU_WEATHER_API_URL, OPEN_WEATHER_API_URL, WEATHER_API_URL } from "../utils/urls"
import "./Weather.scss"

interface Metric {
    Value: number
}

interface Temperature {
    Metric: Metric
}

interface AccuWeatherResponse {
    Temperature: Temperature
}

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

interface main {
    temp: number
}

interface OpenApiResponse {
    main: main
}

const defaultAccuApiInfo: AccuWeatherResponse = {
    Temperature: {
        Metric: {
            Value: 0
        }
    }
}

const defaultWeatherApiInfo: WeatherApiInfo = {
    current: {
        temp_c: 0
    },
    location: {}
}

const defaultOpenWeatherApiInfo: OpenApiResponse = {
    main: {
        temp: 0
    }
}

const Weather: React.FC = () => {
    const [weatherAPIInfo, setWeatherAPIInfo] = useState(defaultWeatherApiInfo)
    const [openWeatherApiInfo, setOpenWeatherApiInfo] = useState(defaultOpenWeatherApiInfo)
    const [accuWeatherInfo, setAccuWeatherInfo] = useState(defaultAccuApiInfo)

    const fetchOpenWeatherApi = () => {
        fetch(`${OPEN_WEATHER_API_URL}?lat=43.5&lon=27.8&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
            .then(resp => resp.json())
            .then(setOpenWeatherApiInfo)
    }

    const fetchWeatherAPI = () => {
        fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=Dobrich`)
            .then(resp => resp.json())
            .then(setWeatherAPIInfo)
    }

    const fetchAccuWeatherApi = () => {
        fetch(`${ACCU_WEATHER_API_URL}?apikey=${ACCU_WEATHER_API_KEY}`)
            .then(resp => resp.json())
            .then(json => setAccuWeatherInfo(json[0]))
    }

    useEffect(() => {
        fetchOpenWeatherApi()
        fetchAccuWeatherApi()
    }, [])

    useEffect(() => {
        fetchWeatherAPI()
    }, [])

    return (
        <main>
            <h1>Comparing information of few weather APIs</h1>
            <div>
                <article>
                    <h2>Weather API</h2>
                    <p>Temperature: {weatherAPIInfo.current.temp_c}</p>
                </article>
                <article>
                    <h2>OpenWeather Api</h2>
                    <p>Temperature: {openWeatherApiInfo.main.temp}</p>
                </article>
                <article>
                    <h2>AccuWeather API</h2>
                    <p>Temperature: {accuWeatherInfo.Temperature.Metric.Value}</p>
                </article>
            </div>
        </main>
    )
} 

export default Weather;