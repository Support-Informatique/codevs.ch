import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import Router from './pages/Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
