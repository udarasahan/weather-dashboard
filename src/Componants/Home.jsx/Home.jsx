import { useState } from 'react';
import { assets } from '../../assets/assets';
import './Home.css';
import axios from 'axios';

export const Home = () => {

  const [data, setData] = useState({
    celcius: 29,
    name:'Colombo',
    humidity: 10,
    speed: 2,
    image: "src/assets/clear.png",
  })
  const [name, setName] = useState('');
  const [error, setError] =useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=961bd391c4edfd216b0fc82238eadede&units=metric`;
    axios.get(apiUrl)
    .then(res => {
      let imagePath = '';
      if (res.data.weather[0].main == "Clouds") {
        imagePath = "/src/assets/cloud.png"
      } else if (res.data.weather[0].main == "Clear") {
        imagePath = "/src/assets/clear.png"
      } else if (res.data.weather[0].main == "Rain") {
        imagePath = "/src/assets/rain.png"
      } else if (res.data.weather[0].main == "Drizzle") {
        imagePath = "/src/assets/drizzle.png"
      } else if (res.data.weather[0].main == "Mist") {
        imagePath = "/src/assets/mist.png"
      } else {
        imagePath = "/src/assets/cloud.png"
      }
      
      console.log(res.data);
      setData({...data, celcius: res.data.main.temp, name: res.data.name, 
        humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath})
      setError('')
    })
    .catch(err => {
      if (err.response.status == 404) {
        setError("Invalid City Name")
      } else {
        setError('')
      }
    })
    }
  }

  return (
    <div className="video-container">
      <video autoPlay muted loop className="background-video">
        <source src={assets.backgroundVideo} type="video/mp4" />
      </video>

      <div className='container'>
              <div className="weather">
                  <div className="search">
                      <input type="text" placeholder='Enter a City Name' onChange={e => setName(e.target.value)} />
                      <button><img src={assets.search_icon} onClick={handleClick} alt="" /></button>
                  </div>
                  <div className="error">
                    <p>{error}</p>
                  </div>
                  <div className="winfo">
                    <img src={data.image} alt="" />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                      <div className="col">
                        <img src={assets.humidity} alt="" />
                        <div className='humidty'>
                          <p>{Math.round(data.humidity)}%</p>
                          <p>Humidity</p>
                        </div>
                      </div>
                      <div className="col">
                      <img src={assets.wind} alt="" />
                        <div className='wind'>
                          <p>{Math.round(data.speed)} km/h</p>
                          <p>Wind</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

          </div>
          </div>
    
  )
}