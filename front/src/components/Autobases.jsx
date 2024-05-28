import { useEffect, useState } from "react";

const Autobases = () => {
  let [error, setError] = useState('');
  let [autobases, setAutobases] = useState();
  let [autobase, setAutobase] = useState(0);

  const getAutobases = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bases');
      const data = await response.json();
      if (data.error) setError(data.error);
      else if (data.length) {
        setAutobases(data);
      } else { setError('Не удалось получить список автобаз'); }
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    getAutobases();              
  }, [])

  const selectAutobase = (index) => {
    if (index === autobase) index = -1
    setAutobase(index)
  }
  return (            
    <header class="autobases">
      {error && (<h1 className='error'>Ошибка: {error}</h1>)}
      <h1>Автобазы:</h1> {
        !error.length && autobases &&
        autobases.map((base, index) =>
          <button key={ index } className = {
            index === autobase ? 'selected' : ''
          } onClick={ () => selectAutobase(index) }>Автобаза №{ base.number }</button>
        )
      }
    </header>    
  );
};

export default Autobases;