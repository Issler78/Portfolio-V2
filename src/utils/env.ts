const DEFAULT_ENDPOINT = 'https://api.staticforms.dev/submit'

/**
 * Lê a configuração do Static Forms a partir das variáveis de ambiente do Vite.
 * Nunca inclua a chave real no código-fonte: use `.env.local`.
 */
export function getStaticFormsConfig() {
  return {
    apiKey: import.meta.env.VITE_STATIC_FORMS_KEY?.trim() ?? '',
    endpoint:
      import.meta.env.VITE_STATIC_FORMS_ENDPOINT?.trim() || DEFAULT_ENDPOINT,
  }
}

export interface EnvValidation {
  ok: boolean
  missing: string[]
}

/**
 * Validação executada no carregamento da aplicação.
 * Retorna quais variáveis obrigatórias estão ausentes, sem lançar erro:
 * o site continua navegável e o formulário explica o que falta.
 */
export function validateStaticFormsEnv(): EnvValidation {
  const { apiKey } = getStaticFormsConfig()
  const missing = apiKey ? [] : ['VITE_STATIC_FORMS_KEY']

  return { ok: missing.length === 0, missing }
}
