import React from 'react';

const CarCard = ({ brand, model, year, onDelete }) => {
  return (
    <div className="car-card">
      <div>Марка: {brand}</div>
      <div>Модель: {model}</div>
      <div>Год: {year}</div>
      <i className="fas fa-trash-alt" onClick={onDelete}></i>
    </div>
  );
};

export default CarCard;