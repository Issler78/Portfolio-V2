import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { CloseIcon, MenuIcon } from './Icons'
import { Logo } from './Logo'
import { SocialLinks } from './SocialLinks'

const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const location = useLocation()
  const activeSection = useActiveSection(sectionIds)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 30)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) {
        return
      }

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      )

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner container">
        <Logo />

        <nav className="nav-desktop" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isActive = isHome && activeSection === item.id

            return (
              <Link
                key={item.id}
                to={item.href}
                className={`nav-link ${isActive ? 'is-active' : ''}`.trim()}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="site-header__actions">
          <a
            className="header-email"
            href="mailto:isslermatheus0@gmail.com"
            aria-label="Enviar e-mail para Matheus Issler"
          >
            isslermatheus0@gmail.com
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? (
              <CloseIcon className="menu-toggle__icon" />
            ) : (
              <MenuIcon className="menu-toggle__icon" />
            )}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="nav-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="nav-mobile__inner container">
            <p className="nav-mobile__eyebrow">Navegação</p>
            <nav className="nav-mobile__nav" aria-label="Navegação mobile">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.href}
                  className="nav-mobile__link"
                  onClick={closeMenu}
                >
                  <span className="nav-mobile__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="nav-mobile__footer">
              <p>Vamos conversar?</p>
              <SocialLinks showLabels />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
