import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

function fillForm() {
  return {
    name: screen.getByRole('textbox', { name: 'Nome' }),
    email: screen.getByRole('textbox', { name: 'E-mail' }),
    message: screen.getByRole('textbox', { name: 'Mensagem' }),
  }
}

describe('Contact', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('exibe os campos e os links de contato', () => {
    render(<Contact />)

    expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Mensagem' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /isslermatheus0@gmail.com/i }),
    ).toBeInTheDocument()
  })

  it('valida os campos obrigatórios antes de enviar', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Preencha nome, e-mail e mensagem',
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it('envia o payload correto para o Static Forms', async () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', 'sf_test_key')
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValue({ ok: true } as Response)

    const user = userEvent.setup()
    render(<Contact />)

    const fields = fillForm()
    await user.type(fields.name, 'Matheus Issler')
    await user.type(fields.email, 'matheus@example.com')
    await user.type(fields.message, 'Olá, vamos conversar?')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    const [url, options] = fetchMock.mock.calls[0] as [
      string,
      RequestInit,
    ]
    const body = options.body as FormData

    expect(url).toBe('https://api.staticforms.dev/submit')
    expect(body.get('apiKey')).toBe('sf_test_key')
    expect(body.get('name')).toBe('Matheus Issler')
    expect(body.get('email')).toBe('matheus@example.com')
    expect(body.get('message')).toBe('Olá, vamos conversar?')
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Mensagem enviada com sucesso',
    )
  })

  it('mostra erro amigável quando o envio falha', async () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', 'sf_test_key')
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockRejectedValue(new Error('network error'))

    const user = userEvent.setup()
    render(<Contact />)

    const fields = fillForm()
    await user.type(fields.name, 'Matheus')
    await user.type(fields.email, 'matheus@example.com')
    await user.type(fields.message, 'Teste')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível enviar sua mensagem',
    )
  })

  it('não envia quando o honeypot é preenchido', async () => {
    const user = userEvent.setup()
    const { container } = render(<Contact />)

    const fields = fillForm()
    await user.type(fields.name, 'Matheus')
    await user.type(fields.email, 'matheus@example.com')
    await user.type(fields.message, 'Teste')

    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="honeypot"]',
    )
    expect(honeypot).not.toBeNull()

    if (honeypot) {
      await user.type(honeypot, 'spam')
    }

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(fetch).not.toHaveBeenCalled()
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Mensagem enviada com sucesso',
    )
  })

  it('explica quando a chave do Static Forms não está configurada', async () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', '')
    const user = userEvent.setup()
    render(<Contact />)

    const fields = fillForm()
    await user.type(fields.name, 'Matheus')
    await user.type(fields.email, 'matheus@example.com')
    await user.type(fields.message, 'Teste')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'VITE_STATIC_FORMS_KEY',
    )
    expect(fetch).not.toHaveBeenCalled()
  })
})
