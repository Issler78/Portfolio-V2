export type SectionId = 'inicio' | 'sobre' | 'skills' | 'projetos' | 'contato'

export interface NavItem {
  id: SectionId
  label: string
  href: string
}

export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'mail'
}

export interface Highlight {
  label: string
  value: string
}

/**
 * Chaves dos ícones de tecnologia disponíveis em `src/components/TechIcon.tsx`.
 */
export type TechIconKey =
  | 'java'
  | 'php'
  | 'python'
  | 'sql'
  | 'html5'
  | 'css3'
  | 'bootstrap'
  | 'javascript'
  | 'springboot'
  | 'hibernate'
  | 'springsecurity'
  | 'junit'
  | 'laravel'
  | 'eloquent'
  | 'livewire'
  | 'phpunit'
  | 'git'
  | 'github'
  | 'docker'
  | 'postgresql'
  | 'mysql'
  | 'datagrip'
  | 'postman'
  | 'intellij'
  | 'vscode'

export interface SkillItem {
  name: string
  icons: TechIconKey[]
  /** Destaca o nome em azul (tecnologias principais). */
  highlight?: boolean
}

export interface SkillGroup {
  title: string
  items: SkillItem[]
}

export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
}

export type ProjectStatus = 'placeholder' | 'published' | 'in-development'

export interface Project {
  slug: string
  title: string
  description: string
  stack: string[]
  github: string | null
  demo?: string | null
  media: ProjectMedia | null
  status: ProjectStatus
}

export interface ContactFormValues {
  name: string
  email: string
  message: string
  honeypot: string
}

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error'
