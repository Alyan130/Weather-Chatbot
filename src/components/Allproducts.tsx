import React from 'react';

interface Product {
  title: string;
  price: number;
  category: string;
  description: string;
}

interface ProductProps{
    products:Product[]
}


export default function Products({ products}: ProductProps) {
    return (
      <div className="p-4 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <div key={i} className="border text-black rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">{product.category}</span>
              </div>
              <p className="text-xl font-bold text-blue-600 mb-2">${product.price}</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }