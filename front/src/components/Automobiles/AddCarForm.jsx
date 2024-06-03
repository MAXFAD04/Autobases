import React, { useEffect, useState } from 'react';

const AddCarForm = ({ car, baseid, onSave, onCloseForm }) => {
  const [carform, setCarform] = useState({
    auto_id     : 0,
    auto_firma  : '',
    auto_model  : '',
    auto_type   : '',
    state_number: '',
    fuel        : 'АИ95',
    base_id     : baseid || 1
  });
  const [error, setError] = useState('');
  const [autoBrends, setAutoBrends] = useState([]);
  const [autoModels, setAutoModels] = useState([]);
  const [autoTypes, setAutoTypes] = useState([]);

  const setField = (field, value) => {
    carform[field] = value;    
    setCarform({ ...carform })
  }

  const getAutoModels = async () => {
    if (carform.auto_firma) {
      try {
        const r = await fetch('http://localhost:3001/api/automobiles/automodels?brend=' + carform.auto_firma);
        const result = await r.json();
        setAutoModels([...result.models]);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setAutoModels([])
    }
  }

  const getAutoTypes = async () => {
    try {
      const r = await fetch('http://localhost:3001/api/automobiles/autotypes');
      const result = await r.json();
      setAutoTypes([...result.types]);
      setAutoBrends([...result.brends]);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    setError('')
    if (car && Object.keys(car).length) {
      setCarform({ ...car })
    }
    getAutoTypes()
    getAutoModels()
  }, [car])

  const saveCar = async () => {
    setError('');
    try {
      const r = await fetch('http://localhost:3001/api/automobiles', {
        method: carform.auto_id?'PUT':'POST',
        headers:  { 'Content-Type':  'application/json'},
        body: JSON.stringify(carform)
      });
      const newcar = await r.json();

      if (newcar) {
        onSave(newcar)
        onCloseForm();
      } else {
        setError('Ошибка');
      }
    } catch (error) {
      setError(error.message);
    }    
  }

  let timer=null
  const changeBrend = async e => {
    setField('auto_firma', e.target.value)
    if (timer) clearTimeout(timer) 
    timer = setTimeout(getAutoModels, 500) 
  }

  return (
    <div className="add-car-form">
      {error.length > 0 && (<div className='Error'>{ error }</div>)}
      <h3>{car ? 'Правка' : 'Добавление'} авто</h3>
      <div className="form-row">
        <label>Марка</label>
        <input
          type="text"
          list="auto_brends"
          value={carform.auto_firma}
          onChange={e => changeBrend(e) }
          required
        />
        <datalist id="auto_brends">
          { autoBrends.map((item, i) =>
            <option key={i} value={item} />
          )}
        </datalist>     
      </div>
      <div className="form-row">
        <label>Модель</label>
        <input
          type="text"
          list = "auto_models"
          value={carform.auto_model}
          onChange={(e) => setField('auto_model', e.target.value)}
          required
        />
        <datalist id="auto_models">
          { autoModels.map((item, i) =>
            <option key={i} value={item} />
          )}
        </datalist>     
      </div>
      <div className="form-row">
        <label>Тип</label>
        <input
          type="text"
          list="auto_types"
          value={carform.auto_type}
          onChange={(e) => setField('auto_type', e.target.value)}
          required
        />
        <datalist id="auto_types">
          { autoTypes.map((item, i) =>
          <option key={i} value={item} />
        )}
        </datalist>        
      </div>
      <div className="form-row">
        <label>Гос.номер</label>
        <input
          type="text"
          value={carform.state_number}
          onChange={(e) => setField('state_number', e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label>Топливо</label>
        <select onChange={(e) => setField('fuel', e.target.value)} value={carform.fuel}>
          <option value="А76">А76</option>
          <option value="АИ92">АИ92</option>
          <option default value="АИ95">АИ95</option>
          <option value="АИ98">АИ98</option>
          <option value="Дт">Дт</option>
        </select>        
      </div>
      <div className="form-row" style={{ justifyContent: "space-between" }}>
        <button type="button" onClick={()=>saveCar()}>Сохранить</button>
        <button type="button" onClick={()=>onCloseForm()}>Закрыть</button>
      </div>
    </div>
  );
};

export default AddCarForm;