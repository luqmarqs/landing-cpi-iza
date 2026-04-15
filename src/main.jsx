import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import landingConfig from './config/landingConfig'
import { initTracking } from './utils/tracking'

initTracking(landingConfig.analytics)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
