import type { ProjectMedia as ProjectMediaType } from '../types'
import { CodeIcon, PlayIcon } from './Icons'

interface ProjectMediaProps {
  media: ProjectMediaType | null
  title: string
  className?: string
}

export function ProjectMedia({
  media,
  title,
  className = '',
}: ProjectMediaProps) {
  if (!media) {
    return (
      <div
        className={`project-media project-media--placeholder ${className}`.trim()}
        role="img"
        aria-label={`Mídia do ${title} em breve`}
      >
        <div className="project-media__grid" aria-hidden="true" />
        <div className="project-media__placeholder-content">
          <span className="project-media__icon">
            <CodeIcon />
          </span>
          <span className="project-media__label">Mídia em breve</span>
          <span className="project-media__hint">Imagem ou vídeo do projeto</span>
        </div>
        <span className="project-media__play" aria-hidden="true">
          <PlayIcon />
        </span>
      </div>
    )
  }

  if (media.type === 'video') {
    return (
      <div className={`project-media ${className}`.trim()}>
        <video
          className="project-media__asset"
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt}
        />
      </div>
    )
  }

  return (
    <div className={`project-media ${className}`.trim()}>
      <img
        className="project-media__asset"
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
