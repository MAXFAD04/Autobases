import React, { useState } from 'react';

const AddCarForm = ({ onSubmit }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ brand, model, year });

    setBrand('');
    setModel('');
    setYear('');
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Марка"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Модель"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Год"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <button type="submit">Добавить автомобиль</button>
    </form>
  );
};

export default AddCarForm;