import type { ReactNode } from 'react'

interface SectionHeadingProps {
  index: string
  label: string
  title: ReactNode
  description?: string
  className?: string
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <p className="section-heading__eyebrow">
        <span aria-hidden="true">{index}</span>
        <span>{label}</span>
      </p>
      <h2 className="section-heading__title">{title}</h2>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </div>
  )
}
