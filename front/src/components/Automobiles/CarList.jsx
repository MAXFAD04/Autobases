import { useEffect, useState } from 'react';
import './Car.css';
import CarCard from './CarCard.jsx';
import AddCarForm from './AddCarForm.jsx';

const Automobiles = ({ baseid, setSelectedAZS, onSave, savedCar }) => {

  let [error, setError] = useState('');
  let [cars, setCars] = useState();
  let [fuels, setFuels] = useState();
  let [types, setTypes] = useState();
  let [filter_fuel, setFilterFuel] = useState('');  
  let [filter_type, setFilterType] = useState('');  
  let [showcarform, setShowcarform] = useState(false);
  let [selcar, setSelcar] = useState({});
  
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
  }, [ baseid, savedCar ])

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

  const handleOnEditCar = (auto_id) => {
    const fcar = cars.find(car => car.auto_id === auto_id)
    if(fcar) setSelcar(fcar)
    setShowcarform(true)
  }

  const handleOnDelCar = async (auto_id) => {
    const fcar = cars.find(car => car.auto_id === auto_id)    
    if (fcar) {
      setError('');
      try {
        const r = await fetch('http://localhost:3001/api/automobiles/' + auto_id, { method: 'DELETE' });
        if (r.status !== 200) {
          setError(r.statusText);
          return
        }
        onSave(fcar)
      } catch (error) {
        console.error('%c⧭', 'color: #d90000', 'error');
        setError(error.message);
      }    
    }
  }

  return (
      
    <section style={{borderBottom: 'none'}}>
      <h2 className='cars-header'>
        <div className="cars-header">
          Список автомобилей
          { baseid > 0 && (<button onClick={() => { setSelcar(undefined); setShowcarform(!showcarform) }}>+</button>) }
        </div>
        <div className='filters'>
          Фильтр:
          <div>
            <label>топливо</label>
            <button onClick={() => setFilterFuel('')}>Все</button>
            {fuels && fuels.length && fuels.map((f,i) => (
              <button onClick={() => setFilterFuel(f)} key={i} style={{color: filter_fuel===f?'yellow':''}}>{f}</button>
            ))}
          </div>
          <div>
            <label>тип</label>
            <button onClick={() => setFilterType('')}>Все</button>
            {types && types.length && types.map((t,i) => (
              <button onClick={() => setFilterType(t)} key={i} style={{color: filter_type===t?'yellow':''}}>{t}</button>
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
            onEditCar={car_id => handleOnEditCar(car_id)}
            onDelCar={car_id => handleOnDelCar(car_id)}
            savedCar = {savedCar}
          />
        ))}
      </div>}
      {showcarform && <AddCarForm car={ selcar } baseid={ baseid } onCloseForm={() => setShowcarform(false)} onSave={ car => onSave(car) } />}      
    </section>    
  );
};

export default Automobiles;