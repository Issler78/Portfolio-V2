import type { ReactNode } from 'react'
import type { TechIconKey } from '../types'

import javaIcon from 'devicon/icons/java/java-original.svg'
import phpIcon from 'devicon/icons/php/php-original.svg'
import pythonIcon from 'devicon/icons/python/python-original.svg'
import html5Icon from 'devicon/icons/html5/html5-original.svg'
import css3Icon from 'devicon/icons/css3/css3-original.svg'
import bootstrapIcon from 'devicon/icons/bootstrap/bootstrap-original.svg'
import javascriptIcon from 'devicon/icons/javascript/javascript-original.svg'
import springIcon from 'devicon/icons/spring/spring-original.svg'
import hibernateIcon from 'devicon/icons/hibernate/hibernate-original.svg'
import junitIcon from 'devicon/icons/junit/junit-original.svg'
import laravelIcon from 'devicon/icons/laravel/laravel-original.svg'
import livewireIcon from 'devicon/icons/livewire/livewire-original.svg'
import gitIcon from 'devicon/icons/git/git-original.svg'
import githubIcon from 'devicon/icons/github/github-original.svg'
import dockerIcon from 'devicon/icons/docker/docker-original.svg'
import postgresqlIcon from 'devicon/icons/postgresql/postgresql-original.svg'
import mysqlIcon from 'devicon/icons/mysql/mysql-original.svg'
import datagripIcon from 'devicon/icons/datagrip/datagrip-original.svg'
import postmanIcon from 'devicon/icons/postman/postman-original.svg'
import intellijIcon from 'devicon/icons/intellij/intellij-original.svg'
import vscodeIcon from 'devicon/icons/vscode/vscode-original.svg'

interface ImageIcon {
  kind: 'image'
  src: string
  /** Ícones originalmente pretos precisam ser invertidos no fundo escuro. */
  invert?: boolean
}

interface GlyphIcon {
  kind: 'glyph'
  color: string
  content: ReactNode
}

type IconDefinition = ImageIcon | GlyphIcon

/**
 * Devicon (https://devicon.dev) cobre as marcas oficiais coloridas.
 * Quatro itens não têm marca própria no Devicon: SQL, Eloquent ORM,
 * Spring Security e PHPUnit. Para esses, usamos glifos simples nas cores
 * das respectivas famílias.
 */
const icons: Record<TechIconKey, IconDefinition> = {
  java: { kind: 'image', src: javaIcon },
  php: { kind: 'image', src: phpIcon },
  python: { kind: 'image', src: pythonIcon },
  sql: {
    kind: 'glyph',
    color: '#409ddf',
    content: (
      <>
        <ellipse cx="12" cy="5.5" rx="7" ry="3" />
        <path d="M5 5.5v13c0 1.66 3.13 3 7 3s7-1.34 7-3v-13" />
        <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </>
    ),
  },
  html5: { kind: 'image', src: html5Icon },
  css3: { kind: 'image', src: css3Icon },
  bootstrap: { kind: 'image', src: bootstrapIcon },
  javascript: { kind: 'image', src: javascriptIcon },
  springboot: { kind: 'image', src: springIcon },
  hibernate: { kind: 'image', src: hibernateIcon },
  springsecurity: {
    kind: 'glyph',
    color: '#6db33f',
    content: (
      <>
        <path d="M12 3 19 6v5.5c0 4.3-2.9 8.2-7 9.5-4.1-1.3-7-5.2-7-9.5V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  junit: { kind: 'image', src: junitIcon },
  laravel: { kind: 'image', src: laravelIcon },
  eloquent: {
    kind: 'glyph',
    color: '#ff2d20',
    content: (
      <>
        <ellipse cx="12" cy="6.5" rx="6" ry="2.5" />
        <path d="M6 6.5v11c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-11" />
        <path d="M6 12c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5" />
      </>
    ),
  },
  livewire: { kind: 'image', src: livewireIcon },
  phpunit: {
    kind: 'glyph',
    color: '#4f5b93',
    content: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
  },
  git: { kind: 'image', src: gitIcon },
  github: { kind: 'image', src: githubIcon, invert: true },
  docker: { kind: 'image', src: dockerIcon },
  postgresql: { kind: 'image', src: postgresqlIcon },
  mysql: { kind: 'image', src: mysqlIcon },
  datagrip: { kind: 'image', src: datagripIcon },
  postman: { kind: 'image', src: postmanIcon },
  intellij: { kind: 'image', src: intellijIcon },
  vscode: { kind: 'image', src: vscodeIcon },
}

interface TechIconProps {
  name: TechIconKey
  className?: string
}

export function TechIcon({ name, className = '' }: TechIconProps) {
  const icon = icons[name]

  if (icon.kind === 'glyph') {
    return (
      <svg
        className={`tech-icon tech-icon--glyph ${className}`.trim()}
        viewBox="0 0 24 24"
        fill="none"
        stroke={icon.color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {icon.content}
      </svg>
    )
  }

  return (
    <img
      className={`tech-icon ${icon.invert ? 'tech-icon--invert' : ''} ${className}`.trim()}
      src={icon.src}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
    />
  )
}
