import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skills } from './Skills'

describe('Skills', () => {
  it('renderiza as três categorias em pt-BR', () => {
    render(<Skills />)

    expect(
      screen.getByRole('heading', { level: 3, name: 'Linguagens' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Frameworks & Bibliotecas',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Ferramentas e plataformas',
      }),
    ).toBeInTheDocument()
  })

  it('lista todas as tecnologias na ordem definida', () => {
    render(<Skills />)

    const languages = screen
      .getByRole('heading', { level: 3, name: 'Linguagens' })
      .closest('.skills__group')
    const frameworks = screen
      .getByRole('heading', { level: 3, name: 'Frameworks & Bibliotecas' })
      .closest('.skills__group')
    const tools = screen
      .getByRole('heading', { level: 3, name: 'Ferramentas e plataformas' })
      .closest('.skills__group')

    expect(languages).not.toBeNull()
    expect(frameworks).not.toBeNull()
    expect(tools).not.toBeNull()

    expect(
      within(languages as HTMLElement)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([
      'Java',
      'PHP',
      'Python',
      'SQL',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'JavaScript',
    ])

    expect(
      within(frameworks as HTMLElement)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([
      'Spring Boot',
      'Hibernate / Spring Data JPA',
      'Spring Security',
      'JUnit',
      'Laravel',
      'Eloquent ORM',
      'Livewire',
      'PHPUnit',
    ])

    expect(
      within(tools as HTMLElement)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([
      'Git e GitHub',
      'Docker',
      'PostgreSQL',
      'MySQL',
      'DataGrip',
      'Postman',
      'IntelliJ e VS Code',
    ])
  })

  it('destaca apenas as tecnologias principais', () => {
    const { container } = render(<Skills />)

    const highlighted = Array.from(
      container.querySelectorAll('.skill-card.is-highlight'),
    ).map((card) => card.textContent)

    expect(highlighted).toEqual([
      'Java',
      'PHP',
      'Spring Boot',
      'Laravel',
      'Git e GitHub',
      'Docker',
    ])
  })

  it('não usa barras de progresso nem porcentagens', () => {
    const { container } = render(<Skills />)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(container.textContent).not.toMatch(/%/)
  })
})
