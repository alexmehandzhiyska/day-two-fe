import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home/Home';
import { entriesService } from './services/entriesService';

function App() {
  const [firstEntryId, setActiveEntryId] = useState(null);

  useEffect(() => {
    entriesService.getAll()
      .then(res => {
        setActiveEntryId(res[0].id);
      })
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {firstEntryId && (
          <>
            <Route path='/' element={<Navigate to={`/entries/${firstEntryId}`} replace={true} />}></Route>
            <Route path='/entries/:activeEntryId' element={<Home />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
