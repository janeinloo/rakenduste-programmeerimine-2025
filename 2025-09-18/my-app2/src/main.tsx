
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router'
import ReactDOM from 'react-dom/client'
import React from 'react'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  )