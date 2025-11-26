"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AllProductsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/auth/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 animate-pulse">
          Explore Our Car Collection
        </h1>
        <p className="text-gray-500 text-lg">
          Find your dream ride from our premium selection of cars.
        </p>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <motion.div
            key={index}
            className="card bg-base-100 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3 },
            }}
          >
            <figure>
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-bold text-blue-600">
                {car.name}
              </h2>
              <p className="text-gray-600">{car.description}</p>
              <p className="font-semibold text-green-600 mt-2">
                ${car.priceUSD.toLocaleString()}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {car.availableColors.map((color, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      color.toLowerCase() === "black"
                        ? "bg-black"
                        : color.toLowerCase() === "white"
                        ? "bg-gray-200 text-black"
                        : color.toLowerCase() === "red"
                        ? "bg-red-500"
                        : color.toLowerCase() === "blue"
                        ? "bg-blue-500"
                        : color.toLowerCase() === "green"
                        ? "bg-green-500"
                        : color.toLowerCase() === "silver"
                        ? "bg-gray-400"
                        : "bg-gray-300"
                    }`}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
