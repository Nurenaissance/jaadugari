import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Bakehouse from './pages/Bakehouse'
import Palampur from './pages/Palampur'
import { usePath } from './lib/router'
import './index.css'

function Site() {
  const path = usePath()

  if (path === '/bakehouse') return <Bakehouse />
  if (path === '/palampur') return <Palampur />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Site />
  </React.StrictMode>,
)
