import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Main from './pages/main.jsx'
import Docs from './pages/docs.jsx'
import Contacts from './pages/contacts.jsx'


export default function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" activeClassName='active'>Автобазы</NavLink>
        <NavLink to="/docs" activeClassName='active'>Документы</NavLink>
        <NavLink to="/contacts" activeClassName='active'>Контакты</NavLink>
      </nav>
      <Routes>
        <Route exact path="/" element={<Main />} />        
        <Route exact path="/docs" element={<Docs />} />
        <Route exact path="/contacts" element={<Contacts />} />  
      </Routes>      
    </Router>
  );
}