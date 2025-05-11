import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
            <div className="flex h-full items-center px-8">
              <div className="max-w-lg text-white">
                <h1 className="mb-4 text-5xl font-bold">Summer Collection</h1>
                <p className="mb-6 text-lg">
                  Discover our latest arrivals and trending products
                </p>
                <button className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-black transition-colors hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              className={`relative overflow-hidden rounded-lg ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xl font-bold text-white">{category.name}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:text-blue-500"
            >
              View All Products
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};