import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, GithubIcon } from '../components/Icons'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { getAllProjects } from '../data/projects'
import { profile } from '../data/profile'

export function Projects() {
  const projects = getAllProjects()

  return (
    <section id="projetos" className="section projects">
      <div className="container">
        <Reveal>
          <div className="projects__header">
            <SectionHeading
              index="03"
              label="Projetos"
              title={
                <>
                  Meus <span className="text-accent">projetos</span>.
                </>
              }
              description="Conheça alguns dos sistemas e soluções que desenvolvi. Sinta-se à vontade para explorar os códigos completos no GitHub."
            />
            <a
              className="projects__github-link"
              href={profile.socials[0]?.url ?? 'https://github.com/Issler78'}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="button__icon" />
              Ver perfil no GitHub
              <ArrowUpRightIcon className="button__icon" />
            </a>
          </div>
        </Reveal>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Reveal delay={120}>
          <p className="projects__note">
            Quer acompanhar o que vem por aí?{' '}
            <Link to="/#contato">Vamos conversar.</Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
