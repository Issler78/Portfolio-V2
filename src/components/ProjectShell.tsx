import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import '../styles/projects/project-shell.css'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectNeighbours,
} from '../data/projects'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
} from './Icons'
import { ProjectMedia } from './ProjectMedia'
import { Reveal } from './Reveal'

interface ProjectShellProps {
  slug: string
  children?: ReactNode
}

export function ProjectShell({ slug, children }: ProjectShellProps) {
  const project = getProjectBySlug(slug)
  const { previous, next } = getProjectNeighbours(slug)
  const projectIndex = getAllProjects().findIndex((item) => item.slug === slug)

  if (!project) {
    return (
      <main className="project-page">
        <div className="container project-page__missing">
          <p className="eyebrow">Projeto não encontrado</p>
          <h1>Esse projeto ainda não existe.</h1>
          <Link className="button button--primary" to="/#projetos">
            Voltar para projetos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="project-page">
      <section className="project-hero">
        <div className="container">
          <Reveal>
            <Link className="project-hero__back" to="/#projetos">
              <ArrowLeftIcon className="button__icon" />
              Voltar para projetos
            </Link>

            <p className="eyebrow">
              <span aria-hidden="true">Projeto</span>
              <span className="project-hero__index">
                {String(projectIndex + 1).padStart(2, '0')}
              </span>
            </p>

            <h1 className="project-hero__title">{project.title}</h1>
            <p className="project-hero__description">{project.description}</p>

            <div className="project-hero__meta">
              <div className="project-hero__stack" aria-label="Tecnologias">
                {project.stack.length > 0 ? (
                  project.stack.map((technology) => (
                    <span key={technology} className="tag">
                      {technology}
                    </span>
                  ))
                ) : (
                  <span className="tag tag--muted">Stack a definir</span>
                )}
              </div>

              <div className="project-hero__actions">
                {project.github ? (
                  <a
                    className="button button--primary"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon className="button__icon" />
                    Ver no GitHub
                  </a>
                ) : (
                  <span className="project-hero__soon" aria-disabled="true">
                    <GithubIcon className="button__icon" />
                    GitHub em breve
                  </span>
                )}

                {project.demo ? (
                  <a
                    className="button button--ghost"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver demo
                    <ArrowUpRightIcon className="button__icon" />
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ProjectMedia
              media={project.media}
              title={project.title}
              className="project-hero__media"
            />
          </Reveal>
        </div>
      </section>

      {children || project.status === 'placeholder' ? (
        <section className="project-content">
          <div className="container project-content__inner">
            {children ?? (
              <div className="project-placeholder">
                <p className="eyebrow">Conteúdo do projeto</p>
                <h2>Este espaço está pronto para receber o case study.</h2>
                <p>
                  Quando o projeto estiver definido, substitua este bloco em{' '}
                  <code>src/projects/{slug}.tsx</code> e os dados em{' '}
                  <code>src/data/projects.ts</code>. Inclua contexto, decisões
                  técnicas, stack, aprendizados e links.
                </p>
                <div className="project-placeholder__steps">
                  <span>01 — Contexto e objetivo</span>
                  <span>02 — Solução e arquitetura</span>
                  <span>03 — Resultados e aprendizados</span>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}

      <nav className="project-pager container" aria-label="Navegação entre projetos">
        {previous ? (
          <Link className="project-pager__link" to={`/projects/${previous.slug}`}>
            <span className="project-pager__label">
              <ArrowLeftIcon className="button__icon" />
              Anterior
            </span>
            <span className="project-pager__title">{previous.title}</span>
          </Link>
        ) : (
          <span className="project-pager__spacer" />
        )}

        {next ? (
          <Link
            className="project-pager__link project-pager__link--next"
            to={`/projects/${next.slug}`}
          >
            <span className="project-pager__label">
              Próximo
              <ArrowRightIcon className="button__icon" />
            </span>
            <span className="project-pager__title">{next.title}</span>
          </Link>
        ) : (
          <span className="project-pager__spacer" />
        )}
      </nav>
    </main>
  )
}
