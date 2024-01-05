import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ContactsTable from './components/ContactsTable';
import MainPage from './components/MainPage';
import FetchApi from './components/FetchApi';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/fetchApi' element={<FetchApi />} />
        {/* <Route path="/contacts" element={<ContactsTable />} /> */}
      </Routes>
    </Router>
  );
}

export default App;