import React, { useState } from 'react';
import Autobases from '../components/Autobases/base.jsx';
import Automibiles from '../components/Automobiles/CarList.jsx';
import AzsList from '../components/Azs/AzsList.jsx';

const App = () => {

  const [selectedBaseID, setSelectedBaseID] = useState(1)
  const [selectedAZS, setSelectedAZS] = useState()
  
  return (
    <div className="container page-animate-first">
      <Autobases setSelectedBaseID={setSelectedBaseID} />
      <AzsList baseid={selectedBaseID} selectedAZS={selectedAZS} />
      <Automibiles baseid={selectedBaseID} setSelectedAZS={azs => setSelectedAZS(azs)} />
      <div className="copyright">&copy; Максим Фадеев, гр.ЭФБО-02-22, МИРЭА</div>
    </div>
  );
};

export default App;