import { useCallback, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { ContactFormValues, ContactStatus } from '../types'
import { getStaticFormsConfig } from '../utils/env'

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
  honeypot: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setValues((current) => ({ ...current, [name]: value }))
      if (status === 'error') {
        setStatus('idle')
        setError(null)
      }
    },
    [status],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (status === 'submitting') {
        return
      }

      const name = values.name.trim()
      const email = values.email.trim()
      const message = values.message.trim()

      if (!name || !email || !message) {
        setStatus('error')
        setError('Preencha nome, e-mail e mensagem antes de enviar.')
        return
      }

      if (!emailPattern.test(email)) {
        setStatus('error')
        setError('Informe um endereço de e-mail válido.')
        return
      }

      // Honeypot preenchido: encerra silenciosamente sem enviar.
      if (values.honeypot.trim()) {
        setStatus('success')
        setValues(initialValues)
        return
      }

      const { apiKey, endpoint } = getStaticFormsConfig()

      if (!apiKey) {
        setStatus('error')
        setError(
          'O formulário ainda não está configurado. Defina VITE_STATIC_FORMS_KEY no arquivo .env.local.',
        )
        return
      }

      setStatus('submitting')
      setError(null)

      const payload = new FormData()
      payload.append('apiKey', apiKey)
      payload.append('name', name)
      payload.append('email', email)
      payload.append('message', message)

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: payload,
        })

        if (!response.ok) {
          throw new Error('Falha no envio do formulário.')
        }

        setStatus('success')
        setValues(initialValues)
      } catch {
        setStatus('error')
        setError(
          'Não foi possível enviar sua mensagem agora. Tente novamente ou envie um e-mail diretamente.',
        )
      }
    },
    [status, values],
  )

  return {
    values,
    status,
    error,
    handleChange,
    handleSubmit,
  }
}
