import React, { useState } from 'react';

const AutobaseCard = ({ name, address, number, carCount }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="autobase" onClick={toggleInfo}>
      {name}
      {showInfo && (
        <div>
          Адрес: {address}<br />
          Номер автобазы: {number}<br />
          Количество автомобилей: {carCount}
        </div>
      )}
    </div>
  );
};

export default AutobaseCard;