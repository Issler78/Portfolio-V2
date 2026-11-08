import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface TypewriterProps {
  phrases: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  holdDuration?: number
  gapDuration?: number
}

/**
 * Efeito de digitação em loop.
 *
 * - O texto animado fica `aria-hidden`; a lista completa é exposta em
 *   `sr-only` para leitores de tela.
 * - Com `prefers-reduced-motion`, exibe a primeira frase estática.
 */
export function Typewriter({
  phrases,
  className = '',
  typingSpeed = 70,
  deletingSpeed = 35,
  holdDuration = 1800,
  gapDuration = 350,
}: TypewriterProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const phrasesRef = useRef(phrases)
  phrasesRef.current = phrases

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const list = phrasesRef.current
    const current = list[phraseIndex] ?? ''

    if (!isDeleting && text === current) {
      const timeout = window.setTimeout(
        () => setIsDeleting(true),
        holdDuration,
      )
      return () => window.clearTimeout(timeout)
    }

    if (isDeleting && text === '') {
      const timeout = window.setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((index) => (index + 1) % list.length)
      }, gapDuration)
      return () => window.clearTimeout(timeout)
    }

    const nextText = isDeleting
      ? current.slice(0, Math.max(0, text.length - 1))
      : current.slice(0, text.length + 1)

    const timeout = window.setTimeout(
      () => setText(nextText),
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => window.clearTimeout(timeout)
  }, [
    deletingSpeed,
    gapDuration,
    holdDuration,
    isDeleting,
    phraseIndex,
    prefersReducedMotion,
    text,
    typingSpeed,
  ])

  const visibleText = prefersReducedMotion
    ? phrases[0] ?? ''
    : text

  return (
    <p className={`typewriter ${className}`.trim()}>
      <span className="sr-only">
        {phrases.length > 0 ? phrases.join('. ') : ''}
      </span>
      <span className="typewriter__text" aria-hidden="true">
        {visibleText}
      </span>
      {!prefersReducedMotion ? (
        <span className="typewriter__caret" aria-hidden="true" />
      ) : null}
    </p>
  )
}
