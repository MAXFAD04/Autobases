import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Main from './pages/main.jsx'
import Docs from './pages/docs.jsx'
import Contacts from './pages/contacts.jsx'


export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Автобазы</Link>
        <Link to="/docs">Документы</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Main />} />        
        <Route exact path="/docs" element={<Docs />} />
        <Route exact path="/contacts" element={<Contacts />} />  
      </Routes>
    </Router>
  );
}