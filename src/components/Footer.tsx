import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { Logo } from './Logo'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo />
          <p>{profile.tagline}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Links do rodapé">
          {navItems.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <SocialLinks showLabels />
        </div>

        <p className="site-footer__copy">
          © {new Date().getFullYear()} Matheus G. Issler
        </p>
      </div>
    </footer>
  )
}
