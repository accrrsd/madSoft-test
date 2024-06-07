import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import { QuestionsLayout } from './questions'
import Confirm from './questions/confirm'
import TimeIsOver from './questions/timerIsOver'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<QuestionsLayout />} />
        <Route path="/timeIsOver" element={<TimeIsOver />} />
        <Route path="/confirm" element={<Confirm pathToPrev="/special" />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
