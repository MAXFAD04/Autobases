import { useEffect, useState } from "react";

const AutobasesComp = ({setSelectedBaseID}) => {
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
    // setSelectedBaseID(autobases[index].base_id)
  }
  return (
    <>
      {error && (<h1 className='error'>Ошибка: {error}</h1>)}
      <header className="autobases">
      <h1>Автобазы:</h1> {
        !error.length && autobases &&
        autobases.map((base, index) =>
          <button key={ index } className = {
            index === autobase ? 'selected' : ''
          } onClick={ () => selectAutobase(index) }>Автобаза №{ base.number }</button>
        )
      }
      </header>
      {!error.length && autobases && autobases[autobase] && (<section key={ autobase } className="section-animate">
        <h2 style={{marginBottom: '10px'}}>Автобаза {autobases[autobase].number}</h2>
        <div style={{ fontStyle: 'italic' }}>Адрес: {autobases[autobase].adress}</div>
      </section>)}
    </>
  );
};

export default AutobasesComp;