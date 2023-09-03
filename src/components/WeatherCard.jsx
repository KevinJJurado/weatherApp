import { useState } from "react"

const WeatherCard = ({ weather, temp}) => {

  const [isCelsius, setIsCelsius] = useState(true)

  const handleChangeTemp = () => setIsCelsius(!isCelsius)

  // console.log(weather)
  return (
    <div className="card">
      <div className="card__title">
        <h1>Weather App</h1>
        <h2>{weather?.name}, {weather?.sys.country}</h2>
        <div className="card__title--image">
          <img 
            src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt="" 
          />
          <h3>"{weather?.weather[0].description}"</h3>
        </div>
        
      </div>
      
      <div className="card__body">
        
        <section className="card__body--descrption">
          
          <ul>
            <li><span>Wind Speed: </span><span>{weather?.wind.speed} m/s</span></li>
            <li><span>Clouds: </span><span>{weather?.clouds.all} %</span></li>
            <li><span>Pressure: </span><span>{weather?.main.pressure} hPa</span></li>
          </ul>
        </section>
        <div className="card__body--temp">
          <h2>{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</h2>
          <button onClick={handleChangeTemp}>{isCelsius ? `Change to °F` : `Change to °C`}</button>
        </div>
      </div>
      
      
    </div>
  )
}

export default WeatherCard
