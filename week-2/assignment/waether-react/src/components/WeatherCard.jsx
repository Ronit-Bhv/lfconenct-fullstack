import "../styles/WeatherCard.css";

const getBackgroundImage = (main) => {
  const images = {
    Clear: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=600&q=80",
    Clouds: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80",
    Rain: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&q=80",
    Drizzle: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&q=80",
    Thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=600&q=80",
    Snow: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=80",
    Mist: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=600&q=80",
    Fog: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=600&q=80",
    Haze: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=600&q=80",
  };
  return images[main] || images["Clouds"];
};

const getWindDirection = (deg) => {
  const directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

const calculateDewPoint = (temp, humidity) => {
  const b = 17.625;
  const c = 243.04;
  const gamma = Math.log(humidity / 100) + (b * temp) / (c + temp);
  const dewPoint = (c * gamma) / (b - gamma);
  return Math.round(dewPoint);
};

const WindIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
);

const HumidityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);

const VisibilityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const PressureIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M16.2 7.8l-2 6.3l-6.4 2.1"/>
  </svg>
);

const UvIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const DewPointIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    <path d="M12 10v4"/>
    <path d="M10 12h4"/>
  </svg>
);

function WeatherCard({ weather }) {
  const { name, sys, main, weather: details, wind, visibility, dt, timezone } = weather;
  const condition = details[0];

  const bgImage = getBackgroundImage(condition.main);

  const localDate = new Date((dt + (timezone || 0)) * 1000);
  const dateString = localDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const windDir = getWindDirection(wind.deg || 0);
  const windSpeed = Math.round(wind.speed || 0);
  const visKm = visibility ? Math.round(visibility / 1000) : "--";
  const dewPoint = calculateDewPoint(main.temp, main.humidity);
  const uvi = weather.uvi ?? 0;

  const detailItems = [
    { label: "Wind", value: `${windSpeed} m/s ${windDir}`, icon: <WindIcon /> },
    { label: "Humidity", value: `${main.humidity}%`, icon: <HumidityIcon /> },
    { label: "Visibility", value: `${visKm}km`, icon: <VisibilityIcon /> },
    { label: "Pressure", value: `${main.pressure} hPa`, icon: <PressureIcon /> },
    { label: "UV Index", value: `${uvi} UV`, icon: <UvIcon /> },
    { label: "Dew Point", value: `${dewPoint}°C`, icon: <DewPointIcon /> },
  ];

  return (
    <div className="weather-card">
      <div className="weather-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="weather-hero-overlay">
          <div className="weather-hero-top">
            <span className="weather-city">{name}{sys?.country ? `, ${sys.country}` : ''}</span>
            <span className="weather-date">{dateString}</span>
          </div>
          <div className="weather-hero-body">
            <div className="weather-hero-temp">{Math.round(main.temp)}°</div>
            <div className="weather-hero-info">
              <p className="weather-hero-condition">{condition.main}</p>
              <p className="weather-hero-feels">Feels like {Math.round(main.feels_like)}°</p>
            </div>
          </div>
        </div>
      </div>
      <div className="weather-details-grid">
        {detailItems.map((item) => (
          <div className="weather-detail-card" key={item.label}>
            <div className="detail-card-icon">{item.icon}</div>
            <div className="detail-card-label">{item.label}</div>
            <div className="detail-card-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;