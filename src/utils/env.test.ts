import { describe, expect, it, vi } from 'vitest'
import { getStaticFormsConfig, validateStaticFormsEnv } from './env'

describe('getStaticFormsConfig', () => {
  it('usa o endpoint padrão e chave vazia quando nada está definido', () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', '')
    vi.stubEnv('VITE_STATIC_FORMS_ENDPOINT', '')

    expect(getStaticFormsConfig()).toEqual({
      apiKey: '',
      endpoint: 'https://api.staticforms.dev/submit',
    })
  })

  it('lê a chave apenas de import.meta.env e remove espaços', () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', '  sf_test_key  ')
    vi.stubEnv('VITE_STATIC_FORMS_ENDPOINT', ' https://example.com/submit ')

    expect(getStaticFormsConfig()).toEqual({
      apiKey: 'sf_test_key',
      endpoint: 'https://example.com/submit',
    })
  })

  it('não expõe a chave em variáveis globais', () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', 'sf_test_key')

    expect(window).not.toHaveProperty('VITE_STATIC_FORMS_KEY')
    expect(document.documentElement.innerHTML).not.toContain('sf_test_key')
  })
})

describe('validateStaticFormsEnv', () => {
  it('aponta a variável ausente quando a chave não está configurada', () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', '')

    expect(validateStaticFormsEnv()).toEqual({
      ok: false,
      missing: ['VITE_STATIC_FORMS_KEY'],
    })
  })

  it('passa quando a chave está definida', () => {
    vi.stubEnv('VITE_STATIC_FORMS_KEY', 'sf_test_key')

    expect(validateStaticFormsEnv()).toEqual({ ok: true, missing: [] })
  })
})
