
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [background, setBackground] = useState()

  useEffect(() => {
    
    const success = (pos) => {
      // console.log(pos)
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      loader()
      setCoords(obj)
    }
    const error = err => {
      if(err.code === err.PERMISSION_DENIED) {
        console.log('Permiso denegado por el usuario')
      }
    }
    function loader () {
      const loader = document.querySelector('.loader')
      if (loader) {
        loader.classList.add('loader--hidden')
      }
    }
  
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])
  
  useEffect(() => {
    if (coords) {
      const apiKey = '044a04791d64f183440c523305c02361'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(url)
      .then(res => {
        setWeather(res.data)
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          farenheit: ((res.data.main.temp - 273.15) * 9/5 +32).toFixed(1)
        }
        setTemp(obj)
      })
      .catch(err => console.log(err))
    }
  }, [coords])

  useEffect(() => {
    const ApiKey = '39164419-4b25eb72fac1a5e62be2c78d3'
    if (weather) {
      const url = `https://pixabay.com/api/?key=${ApiKey}&q=${weather.weather[0].description.replace(' ', '+')}`

      axios.get(url)
      .then(res => setBackground(res.data))
      .catch(err => console.log(err))
    }
    
    
  }, [weather])
  
  const myStyle = {
    backgroundImage: `url('${background?.hits[0]?.webformatURL}')`
  }

  return (
  <div className='principal'  style={myStyle}>
    <Loader/>
    <WeatherCard 
      weather = {weather}
      temp = {temp}
    />
  </div>
  )
}

export default App
