import React, { useState } from 'react';
import AutobaseCard from './AutobaseCard';
import AddCarForm from './AddCarForm';
import CarCard from './CarCard';
import MatrixLayout from './MatrixLayout';

const App = () => {
  const [cars, setCars] = useState([
    { brand: 'BMW', model: 'X5', year: 2022 },
    { brand: 'Tesla', model: 'Model 3', year: 2023 },
  ]);

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  const handleDeleteCar = (index) => {
    const updatedCars = cars.filter((car, i) => i !== index);
    setCars(updatedCars);
  };

  return (
    <div className="container">
      <h1>Добро пожаловать на мою страницу!</h1>
      
      <h2>Список автомобилей</h2>
      <MatrixLayout>
        {cars.map((car, index) => (
          <CarCard key={index} {...car} onDelete={() => handleDeleteCar(index)} />
        ))}
      </MatrixLayout>
      
      <AddCarForm onSubmit={handleAddCar} />
    </div>
  );
};

export default App;