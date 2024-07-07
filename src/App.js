import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import balloon from './images/balloon.png';
import { fetchWeatherData, getCurrentLocation } from './weatherService';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    getCurrentLocation()
      .then(({ latitude, longitude }) => {
        fetchWeatherData({ latitude, longitude }).then(data => setWeatherData(data));
      })
      .catch(() => {
        document.getElementById('body').style.filter = 'blur(0rem)';
      });

    const currentDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    const day = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} - ${day}, ${currentDate.getDate()} ${month} ${currentDate.getFullYear()}`;
    setDate(formattedDate);
  }, []);

  const handleSearch = () => {
    fetchWeatherData({ location }).then(data => setWeatherData(data));
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="container-fluid px-1 px-sm-3 py-5 mx-auto" id="body">
      <div className="row d-flex justify-content-center">
        <div className="row card0">
          <div className="card1 col-lg-8 col-md-7">
            <div className="d-flex flex-row" style={{ justifyContent: 'space-between' }}>
              <small>the.weather</small>
              <small id="date">{date}</small>
            </div>
            <div className="text-center">
              <img className="image mt-5" src={balloon} alt="Balloon" />
            </div>
            <div className="row px-3" style={{ marginTop: '5.5rem' }}>
              <div className="d-flex flex-column mr-3">
                <h1 className="large-font mr-1 mb-0 reset" id="temp_c">
                  {weatherData ? `${weatherData.current.temp_c}°C` : ''}
                </h1>
                <p className="small-font mr-1 mb-0 reset" id="feelslike_c">
                  {weatherData ? `Feels like: ${weatherData.current.feelslike_c}°C` : ''}
                </p>
              </div>
              <div className="d-flex flex-column mr-3">
                <div className="d-flex flex-row mr-2 mt-2">
                  <h2 className="mt-3 mb-1 reset" id="name">
                    {weatherData ? weatherData.location.name : ''}
                  </h2>
                  <small id="region" className="reset pt-4 mt-1">
                    {weatherData ? `${weatherData.location.region}, ${weatherData.location.country}` : ''}
                  </small>
                </div>
                <div className="pt-0">
                  <p className="d-flex flex-column reset" id="condition">
                    {weatherData ? weatherData.current.condition.text : ''}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column text-center"></div>
            </div>
          </div>
          <div className="card2 col-lg-4 col-md-5">
            <div className="row px-3">
              <input
                id="search"
                value={location}
                onChange={handleInputChange}
                type="text"
                name="location"
                placeholder="Search location"
                className="mb-5"
                required
              />
              <div className="fa fa-search mb-5 mr-0 text-center" onClick={handleSearch}></div>
            </div>
            <div className="mr-5">
              <p>Weather Details</p>
              <div className="row px-3">
                <p className="light-text">Cloudy</p>
                <p className="ml-auto" id="cloud">
                  {weatherData ? `${weatherData.current.cloud}%` : '0%'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">Humidity</p>
                <p className="ml-auto" id="humidity">
                  {weatherData ? `${weatherData.current.humidity}%` : '0%'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">Wind</p>
                <p className="ml-auto" id="wind_kph">
                  {weatherData ? `${weatherData.current.wind_kph} km/h ${weatherData.current.wind_dir}` : '0 km/h'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">Wind Gusts</p>
                <p className="ml-auto" id="gust_kph">
                  {weatherData ? `${weatherData.current.gust_kph} Km/h` : '0 Km/h'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">Precipitation</p>
                <p className="ml-auto" id="precip_mm">
                  {weatherData ? `${weatherData.current.precip_mm} mm` : '0 mm'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">Pressure</p>
                <p className="ml-auto" id="pressure_mb">
                  {weatherData ? `${weatherData.current.pressure_mb} mb` : '0 mb'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">Visibility</p>
                <p className="ml-auto" id="vis_km">
                  {weatherData ? `${weatherData.current.vis_km} Km` : '0 Km'}
                </p>
              </div>
              <div className="row px-3">
                <p className="light-text">UV Radiation</p>
                <p className="ml-auto" id="uv">
                  {weatherData ? weatherData.current.uv : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
