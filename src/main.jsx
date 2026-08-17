import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter, Routes, Route, Router } from "react-router-dom";
import UiSelection from './UiSelection.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/UiSelection" element={<UiSelection />} />
      </Routes>
    </HashRouter>
    </Router>
  </StrictMode>,
)
