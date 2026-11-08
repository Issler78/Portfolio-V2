import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { SocialLinks } from '../components/SocialLinks'
import { Typewriter } from '../components/Typewriter'
import { profile } from '../data/profile'

const HERO_PHRASES = [
  'Desenvolvedor Back-end',
  'Estudante de Engenharia de Software',
  'Arquitetando o futuro em código',
]

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <Reveal>
          <p className="hero__eyebrow">{"<"}Hello World!{"/>"} </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="hero__title">
            Matheus <span className="text-accent">Issler</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <Typewriter phrases={HERO_PHRASES} className="hero__role" />
        </Reveal>

        <Reveal delay={200}>
          <p className="hero__tagline">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={260}>
          <div className="hero__actions">
            <Link className="button button--primary" to="/#projetos">
              Ver projetos
              <ArrowUpRightIcon className="button__icon" />
            </Link>
            <Link className="button button--ghost" to="/#contato">
              Falar comigo
            </Link>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <SocialLinks className="hero__social" />
        </Reveal>
      </div>
    </section>
  )
}
