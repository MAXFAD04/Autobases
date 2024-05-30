import { useEffect, useState } from "react";
// import './azs.css';

const AzsList = ({ autobaseId }) => {
  const [azsList, setAzsList] = useState([]);

  useEffect(() => {
    const fetchAzsList = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/azs/autobase/${autobaseId}`);
          if (response.ok) {
            const data = await response.json();
            setAzsList(data);
          } else {
            throw new Error('Failed to fetch gas stations for the specified autobase');
          }
        } catch (error) {
          console.error(error);
        }
      };

    fetchAzsList();
  }, [autobaseId]);

  return (
    <section>
      <h2>Список АЗС по выбранной автобазе:</h2>
      <ul>
        {azsList.map((azs) => (
          <li key={azs.id} className="azs-item">
            <div className="azs-number">Номер: {azs.number}</div>
            <div className="azs-address">Адрес: {azs.address}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AzsList;