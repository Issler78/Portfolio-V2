#!/usr/bin/env node
/**
 * Verificador de segredos do repositório.
 *
 * Regras:
 * 1. Nenhum arquivo versionado pode conter uma chave real do Static Forms.
 * 2. A chave só pode existir em `.env.local` (ignorado pelo .gitignore).
 * 3. `.env.example` deve conter apenas placeholders.
 * 4. Padrões conhecidos de credenciais (AWS, Stripe, GitHub, etc.) são bloqueados.
 *
 * Uso: npm run check:secrets
 * Saída: código 0 quando nada é encontrado, 1 quando há violações.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const ROOT = process.cwd()

const IGNORED_DIRECTORIES = new Set([
  'node_modules',
  'dist',
  'coverage',
  '.git',
  '.vite',
  'playwright-report',
  'test-results',
  '.agents',
  '.opencode',
])

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.html',
  '.css',
  '.md',
  '.yml',
  '.yaml',
  '.env',
  '.example',
  '.txt',
  '.svg',
  '.sh',
])

const ALLOWED_ENV_FILES = new Set(['.env.local', '.env.local.example'])

/**
 * Um valor de placeholder típico: vazio, com "seu", "aqui", "example",
 * "placeholder", "changeme" ou cercado por < >.
 */
function isPlaceholder(value) {
  const normalized = value.trim().replace(/^["']|["']$/g, '').toLowerCase()

  if (!normalized) return true
  if (normalized.startsWith('<') && normalized.endsWith('>')) return true

  return [
    'seu_',
    'sua_',
    'aqui',
    'example',
    'exemplo',
    'placeholder',
    'changeme',
    'your_',
    'xxx',
    'todo',
  ].some((token) => normalized.includes(token))
}

const PATTERNS = [
  {
    name: 'Chave do Static Forms',
    // Captura atribuições de chave no código e em arquivos de ambiente.
    regex: /(?:VITE_STATIC_FORMS_KEY|STATIC_FORMS_KEY)\s*[:=]\s*["']?([^\s"',;]+)/g,
    shouldIgnore: (value) => isPlaceholder(value),
  },
  {
    name: 'Chave de API do Stripe',
    regex: /\b(sk_(?:live|test)_[A-Za-z0-9]{16,})\b/g,
  },
  {
    name: 'Chave de acesso AWS',
    regex: /\b(AKIA[0-9A-Z]{16})\b/g,
  },
  {
    name: 'Token do GitHub',
    regex: /\b(gh[pousr]_[A-Za-z0-9]{30,})\b/g,
  },
  {
    name: 'Chave privada',
    regex: /(-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/g,
  },
]

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) continue
      files.push(...(await collectFiles(join(directory, entry.name))))
      continue
    }

    if (!entry.isFile()) continue

    const fullPath = join(directory, entry.name)
    const name = entry.name
    const dotIndex = name.lastIndexOf('.')
    const extension = dotIndex === -1 ? '' : name.slice(dotIndex)

    if (name.startsWith('.env')) {
      files.push(fullPath)
      continue
    }

    if (TEXT_EXTENSIONS.has(extension)) {
      files.push(fullPath)
    }
  }

  return files
}

async function main() {
  const files = await collectFiles(ROOT)
  const violations = []
  let scanned = 0

  for (const file of files) {
    const relativePath = relative(ROOT, file).split(sep).join('/')
    const fileName = relativePath.split('/').pop() ?? relativePath

    // Arquivos locais de ambiente são permitidos (e ignorados pelo Git).
    const isAllowedEnvFile = ALLOWED_ENV_FILES.has(fileName)
    const isEnvFile = fileName.startsWith('.env')

    if (isEnvFile && !isAllowedEnvFile && fileName !== '.env.example') {
      // .env / .env.production etc. não devem ser usados neste projeto.
      violations.push({
        file: relativePath,
        rule: 'Arquivo de ambiente não permitido',
        detail:
          'Use apenas .env.local para a chave real e .env.example para o placeholder.',
      })
      continue
    }

    if (isAllowedEnvFile) continue

    const info = await stat(file)

    // Evita ler binários grandes por engano.
    if (info.size > 512 * 1024) continue

    let content

    try {
      content = await readFile(file, 'utf8')
    } catch {
      continue
    }

    scanned += 1

    for (const pattern of PATTERNS) {
      pattern.regex.lastIndex = 0

      let match

      while ((match = pattern.regex.exec(content)) !== null) {
        const value = match[1] ?? match[0]

        if (pattern.shouldIgnore?.(value)) continue

        const line = content.slice(0, match.index).split('\n').length

        violations.push({
          file: relativePath,
          line,
          rule: pattern.name,
          detail: `Valor suspeito encontrado: ${value.slice(0, 6)}…`,
        })
      }
    }
  }

  if (violations.length > 0) {
    console.error('\n✖ check:secrets encontrou possíveis segredos:\n')

    for (const violation of violations) {
      const location = violation.line
        ? `${violation.file}:${violation.line}`
        : violation.file

      console.error(`  • ${location}`)
      console.error(`    ${violation.rule} — ${violation.detail}`)
    }

    console.error(
      '\nRemova o valor do código, use .env.local e mantenha apenas placeholders em .env.example.\n',
    )
    process.exit(1)
  }

  console.log(
    `✔ check:secrets: ${scanned} arquivo(s) analisado(s), nenhum segredo encontrado.`,
  )
  console.log(
    '  A chave real do Static Forms deve ficar apenas em .env.local (não versionado).',
  )
}

main().catch((error) => {
  console.error('Falha ao executar check:secrets:', error)
  process.exit(1)
})
