import { CheckIcon, MailIcon, SendIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SocialLinks } from '../components/SocialLinks'
import { profile } from '../data/profile'
import { useContactForm } from '../hooks/useContactForm'

export function Contact() {
  const { values, status, error, handleChange, handleSubmit } = useContactForm()
  const isSubmitting = status === 'submitting'

  return (
    <section id="contato" className="section contact">
      <div className="container contact__layout">
        <Reveal className="contact__info">
          <SectionHeading
            index="04"
            label="Contato"
            title={
              <>
                Vamos <span className="text-accent">conversar</span>.
              </>
            }
            description="Tem um projeto, uma ideia, uma oportunidade profissional ou quer trocar experiência sobre back-end, Java e desenvolvimento web? Me chama."
          />

          <div className="contact__direct">
            <a className="contact__email" href={`mailto:${profile.email}`}>
              <MailIcon className="contact__email-icon" />
              <span>{profile.email}</span>
            </a>
            <p className="contact__hint">
              Respondo assim que possível. Também estou no GitHub e no LinkedIn.
            </p>
            <SocialLinks showLabels className="contact__socials" />
          </div>
        </Reveal>

        <Reveal delay={140} className="contact__form-wrap">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <label className="field">
                <span className="field__label">Nome</span>
                <input
                  className="field__input"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Como posso te chamar?"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">E-mail</span>
                <input
                  className="field__input"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="voce@email.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="field">
              <span className="field__label">Mensagem</span>
              <textarea
                className="field__input field__textarea"
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Conte um pouco sobre o que você tem em mente..."
                rows={5}
                required
              />
            </label>

            <label className="honeypot" aria-hidden="true">
              <span>Não preencha este campo</span>
              <input
                type="text"
                name="honeypot"
                value={values.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <div className="contact-form__footer">
              <button
                className="button button--primary contact-form__submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensagem
                    <SendIcon className="button__icon" />
                  </>
                )}
              </button>

              <p className="contact-form__privacy">
                Seus dados são usados apenas para responder à mensagem.
              </p>
            </div>

            <div className="contact-form__status" aria-live="polite">
              {status === 'success' ? (
                <p className="form-message form-message--success" role="status">
                  <CheckIcon className="form-message__icon" />
                  Mensagem enviada com sucesso. Obrigado pelo contato!
                </p>
              ) : null}

              {status === 'error' && error ? (
                <p className="form-message form-message--error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
