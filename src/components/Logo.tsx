import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      to="/#inicio"
      className={`logo ${className}`.trim()}
      aria-label="Matheus Issler — voltar ao início"
    >
      <span className="logo__text">
        <b><span className="logo__dot">ISS</span>LER</b>
      </span>
    </Link>
  )
}
