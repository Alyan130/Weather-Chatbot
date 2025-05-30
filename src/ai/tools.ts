// import { tool as createTool, RetryError } from 'ai';
// import { z } from 'zod';


// interface Product {
//   title: string;
//   price: number;
//   category: string;
//   description: string;
// }


// export const weatherTool = createTool({
//   description: 'Display the weather for a location',
//   parameters: z.object({
//     location: z.string().describe('The location to get the weather for'),
//   }),
//   execute: async function ({ location }) {
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     return { weather: 'Sunny', temperature: 75, location };
//   },
// });

// export const citiesWeather = createTool({
//   description:"Display all current cities with temperature",
//   parameters:z.object({}),
//   execute: async function(){
//     await new Promise(resolve => setTimeout(resolve,3000));
//     const weatherdata = [
//       {city:"karachi",temperature:35.7},
//       {city:"Lahore",temperature:38.7},
//       {city:"Newyork",temperature:21.9},
//       {city:"Texas",temperature:18.2}
//     ]
//     return weatherdata
//   },
// })
 
//   export const products = createTool({
//    description:"Displays all available products",
//    parameters:z.object({}),
//    execute:async function(){
//     const res = await fetch("https://6782dda2c51d092c3dd10b28.mockapi.io/categories")
//     const products:Product[] = await res.json()
//     return products
//    },
//   })

//   export const oneProduct = createTool({
//     description:"Displays only one product based on user query",
//     parameters:z.object({
//       name:z.string().describe("name of the product to return")
//     }),
//     execute:async function({name}){
//      const res = await fetch("https://6782dda2c51d092c3dd10b28.mockapi.io/categories")
//      const products:Product[] = await res.json()
//     const product = products.find(p => p.title.toLowerCase() == name.toLowerCase())
//      return product
//     },
//    })

// export const tools = {
//   displayWeather: weatherTool,
//   allWeather:citiesWeather
// };


import { tool as createTool } from 'ai';
import { z } from 'zod';


export const weatherTool = createTool({
  description: 'Get current weather information for any location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for (city, country, etc.)'),
  }),
  execute: async function ({ location }) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        temperature: Math.round(data.current.temp_c),
        temperatureF: Math.round(data.current.temp_f),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        windDirection: data.current.wind_dir,
        feelsLike: Math.round(data.current.feelslike_c),
        pressure: data.current.pressure_mb,
        visibility: data.current.vis_km,
        uvIndex: data.current.uv,
        isDay: data.current.is_day === 1,
        icon: data.current.condition.icon,
        lastUpdated: data.current.last_updated
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      return {
        error: `Unable to fetch weather data for "${location}". Please check the location name and try again.`
      };
    }
  },
});

export const tools = {
  getWeather: weatherTool,
};