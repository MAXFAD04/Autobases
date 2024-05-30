import './Car.css';

const CarCard = ({ auto_id, auto_firma, auto_model, auto_type, state_number, fuel, onDelete, onToggleAutobaseInfo }) => {
  return (
    <div className="car-card carlist-animate" key={auto_id}>
      <h3>{auto_firma} {auto_model}</h3>
      <p>Тип: {auto_type}</p>
      <p>Номер: {state_number}</p>
      <p>Топливо: {fuel}</p>
    </div>
  );
};

export default CarCard;