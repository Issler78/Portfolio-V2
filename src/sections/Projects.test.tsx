import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renderiza os três projetos na ordem', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Projects />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'AzuraAPI' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Mini Blog' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Weather Automation' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/em desenvolvimento/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /ver github/i })).toHaveLength(3)
  })

  it('renderiza imagens e vídeo conforme a mídia do projeto', () => {
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Projects />
      </MemoryRouter>,
    )

    expect(
      screen.getByAltText(
        'Diagrama do fluxo de matrícula e pagamento da AzuraAPI',
      ),
    ).toHaveAttribute('src', '/images/projects/project1.png')
    expect(
      screen.getByAltText(
        'E-mail com o relatório diário de clima gerado pela automação',
      ),
    ).toHaveAttribute('src', '/images/projects/project3.png')

    const video = container.querySelector('video')
    expect(video).not.toBeNull()
    expect(video).toHaveAttribute('src', '/videos/projects/project2.mp4')
    expect(video?.autoplay).toBe(true)
    expect(video?.muted).toBe(true)
    expect(video?.loop).toBe(true)
  })

  it('mantém o link do perfil no GitHub', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Projects />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: /ver perfil no github/i }),
    ).toHaveAttribute('href', 'https://github.com/Issler78')
  })
})
