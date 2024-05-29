import { useEffect, useState } from 'react';
import './Car.css';
import CarCard from './CarCard.jsx';
// import AddCarForm from './AddCarForm.jsx';

const Automobiles = ({ baseid }) => {

  let [error, setError] = useState('');
  let [cars, setCars] = useState();
  let [car, setCar] = useState(0);

  const getCars = async () => {
    try {
      setError('');
      const response = await fetch('http://localhost:3001/api/automobiles/list/' + (parseInt(baseid) > 0?baseid:''));
      const data = await response.json();
      if (data.error) setError(`<CarList> ${data.error}`);
      else if (data.length) {
        setCars(data);
      } else {
        setCars([]);
        setError('Автомобили не найдены');
      }
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    console.log('LOAD AUTO');
    getCars();              
  }, [baseid])


  const handleAddCar = (newCar) => {
    setCars([...cars, newCar]);
  }
  
  const handleDeleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
  }
  
  return (
      
    <section>
      <h2>Список автомобилей</h2>
      {error && (<div className='error'>Ошибка: {error}</div>)}
      {cars && <div className='cars-list'>
        {cars.map((car, index) => (
          <CarCard
            key={index}
            {...car}
            onDelete={() => handleDeleteCar(index)}
          />
        ))}
      </div>}
      {/*<AddCarForm onSubmit={handleAddCar} />*/}
    </section>    
  );
};

export default Automobiles;