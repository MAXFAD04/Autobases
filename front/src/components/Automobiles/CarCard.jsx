import './Car.css';

const CarCard = ({ auto_firma, auto_model, auto_type, state_number, onDelete, onToggleAutobaseInfo }) => {
  return (
    <div className="car-card">
      <h3>{auto_firma} {auto_model}</h3>
      <p>Тип: {auto_type}</p>
      <p>Номер: {state_number}</p>
    </div>
  );
};

export default CarCard;