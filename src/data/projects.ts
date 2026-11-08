import type { Project } from '../types'

/**
 * Projetos exibidos na home e nas páginas de detalhe, nesta ordem.
 *
 * `media.type` aceita `image` ou `video`; `ProjectMedia` renderiza
 * `<img loading="lazy">` ou `<video autoPlay muted loop playsInline>`.
 * `status: 'in-development'` adiciona a tag animada no card.
 */
export const projects: Project[] = [
  {
    slug: 'projeto-01',
    title: 'AzuraAPI',
    description:
      'API que simula uma plataforma de cursos, focada no fluxo de matrícula e pagamento. Arquitetura avançada com idempotência, tolerância a falhas (Retry e Circuit Breaker), segurança via Spring Security e JWT, gateway de pagamento fictício desenvolvido do zero e testes.',
    stack: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'Resilience4j',
      'JUnit',
    ],
    github: 'https://github.com/Issler78/AzuraAPI',
    media: {
      type: 'image',
      src: '/images/projects/project1.png',
      alt: 'Diagrama do fluxo de matrícula e pagamento da AzuraAPI',
    },
    status: 'in-development',
  },
  {
    slug: 'projeto-02',
    title: 'Mini Blog',
    description:
      'Blog pessoal completo para gestão de conteúdo: painel administrativo, autenticação, CRUD de publicações, categorias, comentários e upload de imagens, com arquitetura em camadas no Laravel.',
    stack: ['PHP', 'Laravel', 'MySQL', 'Mailpit', 'Docker'],
    github: 'https://github.com/Issler78/PersonalBlog',
    media: {
      type: 'video',
      src: '/videos/projects/project2.mp4',
      alt: 'Demonstração do painel e das publicações do Mini Blog',
    },
    status: 'published',
  },
  {
    slug: 'projeto-03',
    title: 'Weather Automation',
    description:
      'Automação em Python que consome uma API de clima e envia relatórios formatados por e-mail, com execução agendada no Windows Task Scheduler.',
    stack: ['Python', 'Automação', 'APIs REST'],
    github: 'https://github.com/Issler78/Weather-Automation',
    media: {
      type: 'image',
      src: '/images/projects/project3.png',
      alt: 'E-mail com o relatório diário de clima gerado pela automação',
    },
    status: 'published',
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectNeighbours(slug: string): {
  previous: Project | null
  next: Project | null
} {
  const index = projects.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}
