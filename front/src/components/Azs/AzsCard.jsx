import './Azs.css';

const AzsCard = ({ azs_id, azs_name, number, adress, fuel, closed }) => {
  return (
    <div className="azs-card azslist-animate" key={azs_id}>
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
          <path d="M0 0h48v48h-48z" fill="none" />
          <path fill={closed?'#ff5e2e':'#00eb00'} d="M39.54 14.46l.03-.03-7.45-7.43-2.12 2.12 4.22 4.22c-1.88.72-3.22 2.53-3.22 4.66 0 2.76 2.24 5 5 5 .71 0 1.39-.15 2-.42v14.42c0 1.1-.9 2-2 2s-2-.9-2-2v-9c0-2.21-1.79-4-4-4h-2v-14c0-2.21-1.79-4-4-4h-12c-2.21 0-4 1.79-4 4v32h20v-15h3v10c0 2.76 2.24 5 5 5s5-2.24 5-5v-19c0-1.38-.56-2.63-1.46-3.54zm-15.54 5.54h-12v-10h12v10zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        {azs_name} {number}
      </h3>
      <div style={{ fontStyle: 'italic', marginTop: '.8rem'}}>{adress}</div>
      <div>Статус: {closed?'закрыта':'открыта'}</div>
      <div className='azs-fuel'>Топливо: {fuel.split(',').map(fuel => (
        <span>{fuel}</span>
      ))}</div>
    </div>
  );
};

export default AzsCard;