"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Banner from "@/components/Banner";

export default function CarsList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/auth/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Banner className="my-10" />

      <h1 className="text-6xl text-center text-blue-700 font-bold mb-4">
        Drive Your Dreams Today
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Explore our exclusive collection of cars – from luxurious SUVs to
        high-performance sports cars
      </p>

      <p className="text-4xl font-semibold animate-pulse text-center mb-6">
        Featured Cars
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 px-6">
        {cars.slice(0, 6).map((car, index) => (
          <motion.div
            key={index}
            className="card bg-base-100 shadow-md cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              y: -5,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.3)",
            }}
          >
            <figure>
              <img src={car.imageUrl} alt={car.name} className="rounded-md" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{car.name}</h2>
              <p className="text-gray-600">{car.description}</p>
              <p className="font-bold text-lg">${car.priceUSD}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full flex justify-center my-10">
        <motion.button
          className="btn btn-outline w-[50%]"
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Show all Cars
        </motion.button>
      </div>
    </>
  );
}
