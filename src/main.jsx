import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Enable mocking in development
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  worker.start()
}
// Enable mocking in development
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})

