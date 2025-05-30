import React from "react";

type CityTemperature = {
  city: string;
  temperature: number;
};


export const City = ({data}:{data:CityTemperature[]}) => {

  return (
    <div className="max-w-md p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">City Temperatures</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-600">City</th>
              <th className="px-4 py-2 font-medium text-gray-600">Temperature (°C)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 capitalize">{item.city}</td>
                <td className="px-4 py-2">{item.temperature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default City;
