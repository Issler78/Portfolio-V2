import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { ArrowUpRightIcon, GithubIcon } from './Icons'
import { ProjectMedia } from './ProjectMedia'
import { Reveal } from './Reveal'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectPath = `/projects/${project.slug}`

  return (
    <Reveal delay={index * 90}>
      <article className="project-card">
        <Link
          to={projectPath}
          className="project-card__media-link"
          aria-label={`Ver detalhes do ${project.title}`}
        >
          <ProjectMedia media={project.media} title={project.title} />
        </Link>

        <div className="project-card__body">
          <div className="project-card__meta">
            <span className="project-card__index">
              {String(index + 1).padStart(2, '0')}
            </span>

            {project.status === 'in-development' ? (
              <span className="project-card__status project-card__status--dev">
                Em Desenvolvimento
                <span className="project-card__dots" aria-hidden="true" />
              </span>
            ) : project.status === 'placeholder' ? (
              <span className="project-card__status">Espaço reservado</span>
            ) : null}
          </div>

          <h3 className="project-card__title">
            <Link to={projectPath}>{project.title}</Link>
          </h3>
          <p className="project-card__description">{project.description}</p>

          <div className="project-card__stack" aria-label="Tecnologias">
            {project.stack.length > 0 ? (
              project.stack.map((technology) => (
                <span key={technology} className="tag">
                  {technology}
                </span>
              ))
            ) : (
              <span className="project-card__stack-empty">Stack a definir</span>
            )}
          </div>

          <div className="project-card__actions">
            <Link className="button button--ghost" to={projectPath}>
              Ver detalhes
              <ArrowUpRightIcon className="button__icon" />
            </Link>

            {project.github ? (
              <a
                className="button button--ghost"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="button__icon" />
                Ver GitHub
              </a>
            ) : (
              <span className="project-card__soon" aria-disabled="true">
                <GithubIcon className="button__icon" />
                GitHub em breve
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
