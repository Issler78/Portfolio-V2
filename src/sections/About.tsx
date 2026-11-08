import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

export function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container about__layout">
        <Reveal className="about__heading">
          <SectionHeading
            index="01"
            label="Sobre"
            title={
              <>
                Curiosidade que virou{' '}
                <span className="text-accent">código</span>.
              </>
            }
          />
          <p className="about__aside">
            <span aria-hidden="true">&gt;</span> sempre aprendendo
          </p>
        </Reveal>

        <div className="about__content">
          <Reveal delay={100}>
            <div className="about__text">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="about__panel">
              <p className="about__panel-label">Em resumo</p>
              <ul className="about__highlights">
                {profile.highlights.map((highlight) => (
                  <li key={highlight.label}>
                    <span>{highlight.label}</span>
                    <strong>{highlight.value}</strong>
                  </li>
                ))}
              </ul>
              <div className="about__panel-footer" aria-hidden="true">
                <span>status</span>
                <span className="about__panel-status">
                  construindo
                  <span className="about__panel-dots">...</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
