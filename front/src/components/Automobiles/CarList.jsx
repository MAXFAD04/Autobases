import { useEffect, useState } from 'react';
import './Car.css';
import CarCard from './CarCard.jsx';

const Automobiles = ({ baseid }) => {

  let [error, setError] = useState('');
  let [cars, setCars] = useState();
  let [fuels, setFuels] = useState();
  let [filter_fuel, setFilterFuel] = useState('');
  
  useEffect(() => {
    const getCars = async () => {
      try {
        setError('');
        const response = await fetch('http://localhost:3001/api/automobiles/list/' + (parseInt(baseid) > 0?baseid:''));
        const data = await response.json();
        if (data.error) setError(`<CarList> ${data.error}`);
        else if (data.length) {
          setCars(data);
          const f = [];
          for (const car of data) {
            if (f.indexOf(car.fuel) === -1) f.push(car.fuel);
          }
          setFuels(f.sort());
          setFilterFuel('');
        } else {
          setCars([]);
          setError('Автомобили не найдены');
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getCars()
  }, [ baseid ])

  const filtered_cars = () => {
    if (filter_fuel) return cars.filter(car=>car.fuel===filter_fuel)
    return cars
  }
  
  const handleDeleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
  }
  
  return (
      
    <section style={{borderBottom: 'none'}}>
      <h2 className='cars-header'>
        <div>Список автомобилей</div>
        <div className='fuel-filter'>
          Фильтр:
          <div>
            <button onClick={() => setFilterFuel('')}>Все</button>
            {fuels && fuels.length && fuels.map((f) => (
              <button onClick={() => setFilterFuel(f)}>{f}</button>
            ))}
          </div>
        </div>
      </h2>
      {error && (<div className='error'>Ошибка: {error}</div>)}
      {filtered_cars() &&  <div className='cars-list'>
        {filtered_cars().map((car, index) => (
          <CarCard            
            key={index}
            {...car}
            onDelete={() => handleDeleteCar(index)}
          />
        ))}
      </div>}
    </section>    
  );
};

export default Automobiles;