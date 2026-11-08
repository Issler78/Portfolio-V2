import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TechIcon } from '../components/TechIcon'
import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="02"
            label="Habilidades"
            title={
              <>
                Tecnologias que uso para{' '}
                <span className="text-accent">construir</span>.
              </>
            }
            description="O que estudo e aplico no dia a dia."
          />
        </Reveal>

        <div className="skills__groups">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 90}>
              <div className="skills__group">
                <h3 className="skills__group-title">{group.title}</h3>

                <ul className="skills__grid">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={`skill-card ${item.highlight ? 'is-highlight' : ''}`.trim()}
                    >
                      <span className="skill-card__icons">
                        {item.icons.map((icon) => (
                          <TechIcon key={icon} name={icon} />
                        ))}
                      </span>
                      <span className="skill-card__name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
