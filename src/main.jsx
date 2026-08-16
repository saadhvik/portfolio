import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/components.css'

// Signals to CSS that JS is alive, so reveal animations may start hidden.
// Without JS the content is visible by default — never hidden behind motion.
document.documentElement.classList.add('js-motion')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
