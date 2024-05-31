import './Azs.css';
import { useEffect, useState } from 'react';
import AzsCard from './AzsCard.jsx';
const Automobiles = ({ baseid }) => {

  let [error, setError] = useState('');
  let [azslist, setAzsList] = useState();  

  useEffect(() => {
    const getAzs = async () => {
      try {
        setError('');
        const response = await fetch('http://localhost:3001/api/azs/list/' + (parseInt(baseid) > 0?baseid:''));
        const data = await response.json();
        if (data.error) setError(`<AzsList> ${data.error}`);
        else if (data.length) {
          setAzsList(data);
        } else {
          setAzsList([]);
          setError('Контракты с АЗС не найдены');
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getAzs()
  }, [baseid])

  return (
    <section>
      <h2>Список АЗС, с которыми заключены контракты</h2>
      {error && (<div className='error'>Ошибка: {error}</div>)}
      {azslist && <div className='azs-list'>
        {azslist.map((azs, index) => (
          <AzsCard            
            key={index}
            {...azs}
          />
        ))}
      </div>}
    </section>    
  )
}

export default Automobiles;