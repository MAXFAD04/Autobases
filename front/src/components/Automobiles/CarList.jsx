import { useEffect, useState } from 'react';
import './Car.css';
import CarCard from './CarCard.jsx';

const Automobiles = ({ baseid, setSelectedAZS }) => {

  let [error, setError] = useState('');
  let [cars, setCars] = useState();
  let [fuels, setFuels] = useState();
  let [types, setTypes] = useState();
  let [filter_fuel, setFilterFuel] = useState('');  
  let [filter_type, setFilterType] = useState('');  
  
  useEffect(() => {
    const getCars = async () => {
      try {
        setError('');
        const response = await fetch('http://localhost:3001/api/automobiles/list/' + (parseInt(baseid) > 0?baseid:''));
        const data = await response.json();
        if (data.error) setError(`<CarList> ${data.error}`);
        else if (data.length) {
          setCars(data);
          const f = [], t = [];
          for (const car of data) {
            if (f.indexOf(car.fuel) === -1) f.push(car.fuel);
            if (t.indexOf(car.auto_type) === -1) t.push(car.auto_type);
          }
          setFuels(f.sort());
          setTypes(t.sort());
          setFilterFuel('');
          setFilterType('');
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
    if (cars?.length) {
      let filteredcars = [...cars]
      if (filter_fuel) filteredcars = filteredcars.filter(car => car.fuel === filter_fuel)
      if (filter_type) filteredcars = filteredcars.filter(car => car.auto_type === filter_type)
      return filteredcars
    } return []
  }
  
  const [selAzsCarId, setSelAzsCarId] = useState(0);
  const setSelAZS = (car_id, azs_list) => {    
    if (selAzsCarId === car_id || !azs_list?.length) {
      setSelAzsCarId(0)
      setSelectedAZS([])
    } else {
      setSelAzsCarId(car_id)
      setSelectedAZS(azs_list)
    }
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
        <div className='filters'>
          Фильтр:
          <div>
            <label>топливо</label>
            <button onClick={() => setFilterFuel('')}>Все</button>
            {fuels && fuels.length && fuels.map((f,i) => (
              <button onClick={() => setFilterFuel(f)} key={i}>{f}</button>
            ))}
          </div>
          <div>
            <label>тип</label>
            <button onClick={() => setFilterType('')}>Все</button>
            {types && types.length && types.map((t,i) => (
              <button onClick={() => setFilterType(t)} key={i}>{t}</button>
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
            setSelectedAZS={(car_id, azs) => setSelAZS(car_id, azs)}
            selAzsCarID={selAzsCarId}
            onDelete={() => handleDeleteCar(index)}
          />
        ))}
      </div>}
    </section>    
  );
};

export default Automobiles;