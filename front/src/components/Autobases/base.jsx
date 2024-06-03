import { useEffect, useState } from "react";
import './base.css';
import trophy from '../assets/trophy.svg';

const AutobasesComp = ({setSelectedBaseID, savedCar}) => {
  let [error, setError] = useState('');
  let [autobases, setAutobases] = useState();
  let [autobase, setAutobase] = useState(0);
  let [maxCars, setMaxCars] = useState(0);

  const getAutobases = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bases');
      const data = await response.json();
      if (data.error) setError(data.error);
      else if (data.length) {
        setAutobases(data);
        let mc = 0
        for (const base of data) if (mc < base.automobiles_cnt) mc = base.automobiles_cnt;        
        setMaxCars(mc)
      } else { setError('Не удалось получить список автобаз'); }
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    getAutobases();              
  }, [savedCar])

  const selectAutobase = (index) => {
    if (index === autobase) index = -1
    setAutobase(index)
    setSelectedBaseID(index>=0 ? autobases[index].base_id : 0)
  }

  return (
    <>
      {error && (<h1 className='error'>Ошибка: {error}</h1>)}
      <div className="autobases">
      <h1>Автобазы:</h1> {
          !error.length && autobases && <div>{
            autobases.map((base, index) =>
              <button key={index} className={
                index === autobase ? 'selected' : ''
              } onClick={() => selectAutobase(index)}>{
                  base.automobiles_cnt === maxCars ? (<img src={trophy} alt="Приз" title="Победитель по кол-ву авто" />) : null
                } База №{base.number} ({base.automobiles_cnt} авт.)</button>
            )}</div>
      }
      </div>
      {!error.length && autobases && autobases[autobase] && (<section key={ autobase } className="section-animate">
        <h2 style={{marginBottom: '10px'}}>Автобаза №{autobases[autobase].number}</h2>
        <div style={{ fontStyle: 'italic' }}>Адрес: {autobases[autobase].adress}</div>
        <div style={{ marginTop: '10px' }}>Всего автомобилей: {autobases[autobase].automobiles_cnt}</div>
      </section>)}
    </>
  );
};

export default AutobasesComp;