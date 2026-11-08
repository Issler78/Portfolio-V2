/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STATIC_FORMS_KEY?: string
  readonly VITE_STATIC_FORMS_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
