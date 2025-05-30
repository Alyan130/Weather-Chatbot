import React from 'react';
import { 
  FaLocationDot, 
  FaEye, 
  FaWind,
  FaDroplet,
  FaSun,
  FaMoon
} from "react-icons/fa6";
import { WiBarometer, WiCloud } from "react-icons/wi";

type WeatherProps = {
  location?: string;
  region?: string;
  country?: string;
  temperature?: number;
  temperatureF?: number;
  condition?: string;
  humidity?: number;
  windSpeed?: number;
  windDirection?: string;
  feelsLike?: number;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  isDay?: boolean;
  icon?: string;
  lastUpdated?: string;
  error?: string;
};

export default function Weather(props: WeatherProps) {
  if (props.error) {
    return (
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Weather Error</h3>
          <p className="text-sm opacity-90">{props.error}</p>
        </div>
      </div>
    );
  }

  const {
    location,
    region,
    country,
    temperature,
    temperatureF,
    condition,
    humidity,
    windSpeed,
    windDirection,
    feelsLike,
    pressure,
    visibility,
    uvIndex,
    isDay,
    icon
  } = props;

  const gradientClass = isDay 
    ? "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600" 
    : "bg-gradient-to-br from-indigo-800 via-purple-800 to-indigo-900";

  return (
    <div className={`${gradientClass} text-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto backdrop-blur-sm`}>
     
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FaLocationDot className="text-white/80" size={18} />
          <h2 className="text-xl font-bold">{location}</h2>
        </div>
        <p className="text-white/70 text-sm">
          {region && `${region}, `}{country}
        </p>
      </div>

    
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-2">
          {icon && (
            <img 
              src={`https:${icon}`} 
              alt={condition} 
              className="w-16 h-16"
            />
          )}
          <div>
            <div className="text-5xl font-bold">{temperature}°</div>
            <div className="text-white/70 text-sm">({temperatureF}°F)</div>
          </div>
        </div>
        <p className="text-lg font-medium text-white/90 capitalize">
          {condition}
        </p>
        <p className="text-white/70 text-sm">
          Feels like {feelsLike}°C
        </p>
      </div>

    
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaDroplet className="text-blue-200" size={16} />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <div className="text-lg font-bold">{humidity}%</div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaWind className="text-green-200" size={16} />
            <span className="text-sm font-medium">Wind</span>
          </div>
          <div className="text-lg font-bold">{windSpeed} km/h</div>
          <div className="text-xs text-white/70">{windDirection}</div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <WiBarometer className="text-yellow-200" size={20} />
            <span className="text-sm font-medium">Pressure</span>
          </div>
          <div className="text-lg font-bold">{pressure} mb</div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaEye className="text-purple-200" size={16} />
            <span className="text-sm font-medium">Visibility</span>
          </div>
          <div className="text-lg font-bold">{visibility} km</div>
        </div>
      </div>

    
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <WiCloud className="text-orange-200" size={18} />
            <span>UV Index: {uvIndex}</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            {isDay ? <FaSun size={14} /> : <FaMoon size={14} />}
            <span>{isDay ? 'Day' : 'Night'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
