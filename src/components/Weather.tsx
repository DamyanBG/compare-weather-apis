import { useEffect, useState } from 'react'
import { ACCU_WEATHER_API_KEY, OPEN_WEATHER_API_KEY, WEATHERSTACK_API_KEY, WEATHER_API_KEY } from '../utils/keys'
import { ACCU_WEATHER_API_URL, OPEN_WEATHER_API_URL, WEATHERSTACK_API_URL, WEATHER_API_URL } from "../utils/urls"
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

interface WeatherstackResponse {
    current: {
        temperature: number
    }
}

const defaultWeatherstackInfo: WeatherstackResponse = {
    current: {
        temperature: 0
    }
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
    const [weatherStackInfo, setWeatherStackInfo] = useState(defaultWeatherstackInfo)

    const fetchOpenWeatherApi = async () => {
        await fetch(`${OPEN_WEATHER_API_URL}?lat=43.5&lon=27.8&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
            .then(resp => resp.json())
            .then(setOpenWeatherApiInfo)
    }

    const fetchWeatherAPI = async () => {
        await fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=Dobrich`)
            .then(resp => resp.json())
            .then(setWeatherAPIInfo)
    }

    const fetchAccuWeatherApi = async () => {
        await fetch(`${ACCU_WEATHER_API_URL}?apikey=${ACCU_WEATHER_API_KEY}`)
            .then(resp => resp.json())
            .then(json => setAccuWeatherInfo(json[0]))
    }

    const fetchWeatherstackApi = async () => {
        await fetch(`${WEATHERSTACK_API_URL}?access_key=${WEATHERSTACK_API_KEY}&query=Dobrich&units=m`)
            .then(resp => resp.json())
            .then(setWeatherStackInfo)
    }

    useEffect(() => {
        fetchWeatherAPI()
        fetchOpenWeatherApi()
        fetchAccuWeatherApi()
        fetchWeatherstackApi()
    }, [])

    return (
        <main>
            <h1>Comparing information of few weather APIs</h1>
            <div id='container'>
                <article>
                    <h3>Weather API</h3>
                    <p>Temperature: {weatherAPIInfo.current.temp_c}</p>
                </article>
                <article>
                    <h3>OpenWeather Api</h3>
                    <p>Temperature: {openWeatherApiInfo.main.temp}</p>
                </article>
                <article>
                    <h3>AccuWeather API</h3>
                    <p>Temperature: {accuWeatherInfo.Temperature.Metric.Value}</p>
                </article>
                <article>
                    <h3>Weatherstack API</h3>
                    <p>Temperature: {weatherStackInfo.current.temperature}</p>
                </article>
            </div>
        </main>
    )
} 

export default Weather;