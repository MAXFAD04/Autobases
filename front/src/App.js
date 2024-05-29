import React, { useState } from 'react';
import Autobases from './components/Autobases/base.jsx';
import Automibiles from './components/Automobiles/CarList.jsx';

const App = () => {

  const [selectedBaseID, setSelectedBaseID] = useState(1)
  
  return (
    <div className="container">
      <Autobases setSelectedBaseID={setSelectedBaseID} />
      <Automibiles baseid={selectedBaseID} />
    </div>
  );
};

export default App;