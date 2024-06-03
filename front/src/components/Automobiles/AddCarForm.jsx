import React, { useEffect, useState } from 'react';

const AddCarForm = ({ car, onCloseForm }) => {
  const [carform, setCarform] = useState({
    auto_id     : 0,
    auto_firma  : '',
    auto_model  : '',
    auto_type   : '',
    state_number: '',
    fuel        : '',
    base_id     : 0
  });
  
  const setField = (field, value) => {
    carform[field] = value
    setCarform({ ...carform })
  }

  useEffect(() => {
    if (car && Object.keys(car).length) {
      setCarform({ ...car })
    }
  }, [car])

  return (
    <form className="add-car-form">
      <h3>{ (car && Object.keys(car).length)?'Правка':'Добавление' } авто</h3>
      <div className="form-row">
        <label>Марка</label>
        <input
          type="text"
          value={carform.auto_firma}
          onChange={(e) => setField('brand', e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label>Модель</label>
        <input
          type="text"
          value={carform.auto_model}
          onChange={(e) => setField('model', e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label>Тип</label>
        <input
          type="text"
          value={carform.auto_type}
          onChange={(e) => setField('type', e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label>Гос.номер</label>
        <input
          type="text"
          value={carform.state_number}
          onChange={(e) => setField('fuel', e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label>Топливо</label>
        <input
          type="text"
          value={carform.fuel}
          onChange={(e) => setField('fuel', e.target.value)}
          required
        />
      </div>
      <div className="form-row" style={{ justifyContent: "space-between" }}>
        <button type="submit">Добавить автомобиль</button>
        <button type="submit" onClick={ () => onCloseForm() }>Закрыть</button>
      </div>
    </form>
  );
};

export default AddCarForm;