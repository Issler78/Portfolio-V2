import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true }

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]} future={routerFuture}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renderiza a home com a apresentação principal', () => {
    renderAt('/')

    expect(
      screen.getByRole('heading', { level: 1, name: /Matheus Issler/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Curiosidade que virou/i }),
    ).toBeInTheDocument()
  })

  it('renderiza a página de um projeto', () => {
    renderAt('/projects/projeto-01')

    expect(
      screen.getByRole('heading', { level: 1, name: 'AzuraAPI' }),
    ).toBeInTheDocument()
  })

  it('renderiza a página 404 para rotas desconhecidas', () => {
    renderAt('/rota-inexistente')

    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
