import React, { useState } from 'react';
import './App.css';
import Autobases from './components/Autobases';
import AutobaseCard from './components/AutobaseCard';
import AddCarForm from './components/AddCarForm';
import CarCard from './components/CarCard';
import MatrixLayout from './components/MatrixLayout';

const App = () => {

  const [selectedBaseID, setSelectedBaseID] = useState(0)

  const [cars, setCars] = useState([
    { brand: 'BMW', model: 'X5', year: 2022, autobaseNumber: 1 },
    { brand: 'Tesla', model: 'Model 3', year: 2023, autobaseNumber: 2 },
  ]);

  const [autobaseInfoVisible, setAutobaseInfoVisible] = useState(false);
  const [selectedAutobase, setSelectedAutobase] = useState(null);

  const toggleAutobaseInfo = (autobaseNumber) => {
    const newSelectedAutobase = cars.find(car => car.autobaseNumber === autobaseNumber);
    if(newSelectedAutobase) {
      if(selectedAutobase && selectedAutobase.autobaseNumber === autobaseNumber) {
        setSelectedAutobase(null);
        setAutobaseInfoVisible(false);
      } else {
        setSelectedAutobase(newSelectedAutobase);
        setAutobaseInfoVisible(true);
      }
    }
  };

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar]);
  };
  
  const handleDeleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
  };
  
  /*{cars.map((car, index) => (
    <div key={index}>
      <p>{car.name}</p>
      <button onClick={() => handleDeleteCar(index)}>Delete Car</button>
    </div>
  ))}*/


  return (
    <div className="container">
      <Autobases setSelectedBaseID={setSelectedBaseID} />
      <section>
        <h2>Список автомобилей</h2>
        <MatrixLayout>
          {cars.map((car, index) => (
            <CarCard
              key={index}
              {...car}
              onDelete={() => handleDeleteCar(index)}
              onToggleAutobaseInfo={toggleAutobaseInfo}
            />
          ))}
        </MatrixLayout>
      
        {autobaseInfoVisible && selectedAutobase && (
          <AutobaseCard autobase={selectedAutobase} />
        )}
      
        <AddCarForm onSubmit={handleAddCar} />
      </section>
    </div>
  );
};

export default App;