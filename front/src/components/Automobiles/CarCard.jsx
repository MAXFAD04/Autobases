import { useState } from 'react';
import './Car.css';

const CarCard = ({ auto_id, auto_firma, auto_model, auto_type, state_number, fuel, azs, selAzsCarID, setSelectedAZS }) => {

  return (
    <div className="car-card carlist-animate" key={auto_id}>
      <h3>{auto_firma} {auto_model}</h3>
      <p>Тип: {auto_type}</p>
      <p>Номер: <span className="car-number">{state_number}</span></p>
      <p>Топливо: {fuel}</p>
      <svg className={`car-card-fuel ${!azs.length?'car-card-fuel-error':''} ${selAzsCarID===auto_id ? 'car-card-fuel-sel' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" onClick={ () => setSelectedAZS(auto_id, azs) } disabled={!azs.length}>
        <title>Показать АЗС</title>
        <path d="M0 0h48v48h-48z" fill="none" />
        <path d="M39.54 14.46l.03-.03-7.45-7.43-2.12 2.12 4.22 4.22c-1.88.72-3.22 2.53-3.22 4.66 0 2.76 2.24 5 5 5 .71 0 1.39-.15 2-.42v14.42c0 1.1-.9 2-2 2s-2-.9-2-2v-9c0-2.21-1.79-4-4-4h-2v-14c0-2.21-1.79-4-4-4h-12c-2.21 0-4 1.79-4 4v32h20v-15h3v10c0 2.76 2.24 5 5 5s5-2.24 5-5v-19c0-1.38-.56-2.63-1.46-3.54zm-15.54 5.54h-12v-10h12v10zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
    </div>
  );
};

export default CarCard;