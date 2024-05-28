import React from 'react';

const CarCard = ({ brand, model, year, autobaseNumber, onDelete, onToggleAutobaseInfo }) => {
  return (
    <div className="card">
      <h3>{brand} {model}</h3>
      <p>Year: {year}</p>
      <p>Autobase: {autobaseNumber}</p>
      <button onClick={() => onToggleAutobaseInfo(autobaseNumber)}>Toggle Autobase Info</button>

    </div>
  );
};

export default CarCard;