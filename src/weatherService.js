export const fetchWeatherData = async ({ latitude, longitude, location }) => {
    const apiKey = '23ed90af192d711931f142877527a2be'; // Corrected missing closing quote
    let url;
  
    if (location) {
      url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
    } else {
      url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;
    }
  
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }
  };
  
  export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          error => {
            reject(new Error('Geolocation failed: ' + error.message));
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };
  