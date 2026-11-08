import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'
import { validateStaticFormsEnv } from './utils/env'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento #root não encontrado.')
}

const env = validateStaticFormsEnv()

if (!env.ok && import.meta.env.DEV) {
  console.warn(
    `[env] Variável ausente: ${env.missing.join(', ')}. ` +
      'O formulário de contato ficará indisponível até configurar .env.local.',
  )
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
