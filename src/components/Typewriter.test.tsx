import { act, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Typewriter } from './Typewriter'

const PHRASES = [
  'Desenvolvedor Back-end',
  'Estudante de Engenharia de Software',
  'Arquitetando o futuro em código',
]

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  )
}

afterEach(() => {
  vi.useRealTimers()
})

describe('Typewriter', () => {
  it('digita a frase caractere por caractere', () => {
    vi.useFakeTimers()
    mockReducedMotion(false)

    const { container } = render(<Typewriter phrases={PHRASES} />)
    const text = container.querySelector('.typewriter__text')

    expect(text).toHaveTextContent('')

    act(() => {
      vi.advanceTimersByTime(70)
    })

    expect(text).toHaveTextContent('D')

    act(() => {
      vi.advanceTimersByTime(80)
    })

    expect(text).toHaveTextContent('De')
    expect(container.querySelector('.typewriter__caret')).toBeInTheDocument()
  })

  it('exibe a primeira frase estática com prefers-reduced-motion', () => {
    mockReducedMotion(true)

    const { container } = render(<Typewriter phrases={PHRASES} />)

    expect(container.querySelector('.typewriter__text')).toHaveTextContent(
      'Desenvolvedor Back-end',
    )
    expect(container.querySelector('.typewriter__caret')).toBeNull()
  })

  it('mantém todas as frases disponíveis para leitores de tela', () => {
    const { container } = render(<Typewriter phrases={PHRASES} />)

    expect(container.querySelector('.sr-only')).toHaveTextContent(
      PHRASES.join('. '),
    )
    expect(container.querySelector('.typewriter__text')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })
})
