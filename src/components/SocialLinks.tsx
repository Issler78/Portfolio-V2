import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
}

interface SocialLinksProps {
  className?: string
  showLabels?: boolean
}

export function SocialLinks({
  className = '',
  showLabels = false,
}: SocialLinksProps) {
  return (
    <ul className={`social-links ${className}`.trim()}>
      {profile.socials.map((social) => {
        const Icon = icons[social.icon]
        const isExternal = social.url.startsWith('http')

        return (
          <li key={social.label}>
            <a
              className="social-link"
              href={social.url}
              aria-label={social.label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
            >
              <Icon className="social-link__icon" />
              {showLabels ? (
                <span>{social.label}</span>
              ) : (
                <span className="sr-only">{social.label}</span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
