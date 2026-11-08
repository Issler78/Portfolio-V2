import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Navbar } from './Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter
      initialEntries={['/']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('abre o menu mobile com os links de navegação', async () => {
    const user = userEvent.setup()
    renderNavbar()

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

    const menu = screen.getByRole('dialog', { name: 'Menu de navegação' })
    expect(menu).toBeInTheDocument()
    expect(within(menu).getByRole('link', { name: /Sobre/i })).toBeInTheDocument()
    expect(
      within(menu).getByRole('link', { name: /Projetos/i }),
    ).toBeInTheDocument()
  })

  it('fecha o menu ao pressionar Escape', async () => {
    const user = userEvent.setup()
    renderNavbar()

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))
    await user.keyboard('{Escape}')

    expect(
      screen.queryByRole('dialog', { name: 'Menu de navegação' }),
    ).not.toBeInTheDocument()
  })

  it('fecha o menu após clicar em um link', async () => {
    const user = userEvent.setup()
    renderNavbar()

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))
    const menu = screen.getByRole('dialog', { name: 'Menu de navegação' })
    await user.click(within(menu).getByRole('link', { name: /Contato/i }))

    expect(
      screen.queryByRole('dialog', { name: 'Menu de navegação' }),
    ).not.toBeInTheDocument()
  })
})
