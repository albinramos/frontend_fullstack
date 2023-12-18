import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie';


// Enable mocking in development

  ReactDOM.createRoot(document.getElementById('root')).render(
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CookiesProvider>

  )


