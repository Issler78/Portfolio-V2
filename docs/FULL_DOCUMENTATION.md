# Documentação completa

Documento consolidado do portfólio de Matheus Issler. Para instruções
passo a passo, veja `docs/USAGE_GUIDE.md`.

## 1. Visão geral

| Item | Valor |
| --- | --- |
| Tipo | SPA estática de portfólio pessoal |
| Idioma | Português do Brasil |
| Stack | React 18.3 + TypeScript 5.7 + Vite 5.4 |
| Rotas | React Router 6.30 |
| Estilo | CSS puro com custom properties |
| Formulário | Static Forms (`https://api.staticforms.dev/submit`) |
| Backend / banco | Nenhum |
| Testes | Vitest 2 + Testing Library; Playwright (Chromium) |
| Node | 18+ (desenvolvido com Node 24) |

O site apresenta Matheus Issler, seus focos de estudo (Java + Spring, com base
web em PHP, Python, HTML, CSS e JavaScript), três projetos reais (AzuraAPI,
Mini Blog e Weather Automation) e um formulário de contato.

## 2. Começando

```bash
npm install
copy .env.example .env.local   # preencha VITE_STATIC_FORMS_KEY
npm run dev
```

Abra `http://localhost:5173`.

Sem a chave, tudo funciona exceto o envio do formulário: aparece uma mensagem
pedindo a configuração. Esse comportamento é intencional e testado.

## 3. Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Dev server com HMR |
| `npm run build` | `tsc --noEmit` + `vite build` → `dist/` |
| `npm run preview` | Pré-visualiza o build |
| `npm run test` | Vitest (27 testes) |
| `npm run test:watch` | Vitest em watch |
| `npm run test:e2e` | Playwright (9 testes) |
| `npm run check:secrets` | Varredura de segredos |
| `npm run verify` | Segredos + testes + build |

`node scripts/visual-check.mjs` gera screenshots em 320, 375, 768 e 1440 px
(home e página de projeto) em `%TEMP%/opencode/portfolio-shots`. Requer o dev
server rodando.

## 4. Estrutura

```text
src/
├── components/   UI compartilhada (Navbar, Footer, ProjectShell, Typewriter,
│                 TechIcon, Reveal...)
├── data/         conteúdo tipado (profile, navigation, skills, projects)
├── hooks/        useContactForm, useActiveSection, usePrefersReducedMotion
├── pages/        HomePage, NotFoundPage
├── projects/     Project01, Project02, Project03
├── sections/     Hero, About, Skills, Projects, Contact
├── styles/       global.css + projects/*.css
├── test/         setup do Vitest
├── types/        contratos TypeScript
├── utils/        env.ts (config + validação)
├── App.tsx       rotas e shell
└── main.tsx      bootstrap
```

Assets públicos incluem `public/images/background.jpg` (fundo do hero),
`public/favicon.svg`, `public/images/projects/` (project1.png e project3.png)
e `public/videos/projects/` (project2.mp4).

Detalhes em `docs/ARCHITECTURE_OVERVIEW.md`.

## 5. Conteúdo

- Identidade, bio, e-mail e redes: `src/data/profile.ts`.
- Menu: `src/data/navigation.ts`.
- Skills: `src/data/skills.ts` (categorias, ordem, ícones e destaques azuis).
- Projetos: `src/data/projects.ts`.
- Frases do typewriter: `src/sections/Hero.tsx` (`HERO_PHRASES`).
- Textos de seção: arquivos em `src/sections/` e `src/pages/`.
- Mapa editorial completo: `docs/CONTENT_SOURCE.md`.

### Publicar um projeto

1. Editar `src/data/projects.ts` (slug, título, descrição, stack, github, media
   e status).
2. Criar `src/projects/<Nome>.tsx` com `<ProjectShell slug="...">` e o case study.
3. Criar `src/styles/projects/<nome>.css`.
4. Registrar a rota em `src/App.tsx`.
5. Adicionar imagens em `public/images/projects/` ou vídeos em
   `public/videos/projects/`.
6. Atualizar a documentação e verificar o paginador.

Projetos com `status: 'published'` ou `'in-development'` não exibem o bloco
"Este espaço está pronto para receber o case study"; ele fica restrito a
`placeholder`.

Invariantes:

```
slug === segmento da rota === prop slug do ProjectShell
getAllProjects() order === ordem do pager
```

## 6. Design system

| Token | Valor |
| --- | --- |
| Fundo | `#111111` |
| Superfícies | `#171717`, `#1c1c1c` |
| Texto | `#ffffff`; secundário `#a1a1a1`; discreto `#6f6f6f` |
| Destaque | `#409ddf` (hover `#6ab8f0`) |
| Erro | `#e94560` |
| Hover neutro | `#555555` |
| Títulos / corpo | Poppins |
| Eyebrows, labels e typewriter | JetBrains Mono |

- Mobile-first; breakpoints em 360, 480, 640, 768, 900, 1024 e 1200 px.
- Container de até 1080 px; header de 64 px.
- O azul `#409ddf` é o único acento; não há mint, gradientes neon nem
  `status-dot`.
- Componentes: `.button`, `.tag`, `.section-heading`, `.field`, `.reveal`,
  `.typewriter`, `.skill-card`.
- O status do painel "Em resumo" e a pill "Em Desenvolvimento" usam
  `@keyframes status-dots` com `steps(4)` para alternar 0–3 reticências sem
  reflow; reduced motion oculta a animação.
- Imagens de projeto usam `object-fit: contain` para preservar diagramas e
  screenshots; vídeos usam `cover`.
- Navegação e links de texto não têm borda/fundo; só ações reais usam
  `.button`.
- `prefers-reduced-motion` desliga animações (e o typewriter fica estático).
- O hero usa `public/images/background.jpg` com blur, overlay escuro e nome
  centralizado.

## 7. Formulário e segurança

Fluxo completo em `docs/API_FLOW.md`. Resumo:

- `FormData` com `apiKey`, `name`, `email`, `message` via `POST`.
- Validação de obrigatórios e regex de e-mail no cliente.
- Honeypot invisível com curto-circuito.
- Estados acessíveis (`aria-live`, `role="status"`, `role="alert"`).
- Chave lida só de `import.meta.env`, validada em `main.tsx` e no submit.
- `scripts/check-secrets.mjs` bloqueia chaves em arquivos versionados.
- `.gitignore` exclui `.env`, `.env.local` e `.env.*` (exceto `.env.example`),
  `dist/`, `AGENTS.md`, `OPENCODE.md` e `.agents/*`, preservando
  `.agents/skills/`.

A chave fica visível no bundle final por design do serviço. Não reutilize a
mesma chave em outros contextos e nunca a coloque no repositório.

## 8. Testes

### Unitários (Vitest + jsdom)

| Arquivo | Cobertura |
| --- | --- |
| `src/App.test.tsx` | home, projeto e 404 |
| `src/components/Navbar.test.tsx` | menu mobile, Escape e fechamento |
| `src/components/Typewriter.test.tsx` | digitação, reduced motion e texto para leitores de tela |
| `src/sections/Projects.test.tsx` | 3 projetos, pill em desenvolvimento, imagens/vídeo e links do GitHub |
| `src/sections/Skills.test.tsx` | 3 categorias, ordem dos itens, destaques e ausência de porcentagens |
| `src/sections/Contact.test.tsx` | campos, validação, envio, erro, honeypot, chave ausente |
| `src/utils/env.test.ts` | defaults, trim, isolamento e validação |

### E2E (Playwright)

- Overflow horizontal em 320, 375, 768, 1024 e 1440 px.
- Menu hambúrguer abre, navega e fecha.
- Nav desktop visível e hambúrguer oculto em 1440.
- Navegação entre projetos pelo pager.
- Formulário responde ao envio (sucesso ou aviso de chave ausente), com a API
  interceptada para não depender da chave local.

### Execução

```bash
npm run test
npx playwright install chromium   # primeira vez
npm run test:e2e
```

O Playwright reutiliza um dev server existente em `127.0.0.1:5173`.

## 9. Acessibilidade

- Skip link para `#conteudo` (oculto por `transform` até receber foco).
- Header com `aria-expanded`/`aria-controls`; menu mobile é `role="dialog"`
  com `aria-modal`, foco inicial, focus trap e `Escape`.
- O typewriter mantém o texto animado em `aria-hidden` e expõe todas as frases
  em `sr-only`; com reduced motion, mostra a primeira frase estática.
- Links externos com `rel="noreferrer"`.
- Ícones decorativos com `aria-hidden`.
- Formulário com labels associados e mensagens anunciadas.
- Contraste alto (texto branco em fundo `#111`).
- Animações respeitam reduced motion.

## 10. Deploy

1. `npm run verify`.
2. Publicar `dist/`.
3. Definir `VITE_STATIC_FORMS_KEY` no host (build).
4. Configurar fallback de SPA para `/projects/*`.
5. Testar o formulário em produção.

## 11. Solução de problemas

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| Formulário diz que falta configuração | `.env.local` ausente/inválido | Criar com `VITE_STATIC_FORMS_KEY` e reiniciar o dev server |
| 404 ao abrir `/projects/...` direto | host sem fallback de SPA | Configurar rewrite para `index.html` |
| Seções "sumidas" em screenshot | `Reveal` não disparado | Rolar a página antes (use `scripts/visual-check.mjs`) |
| Testes E2E falham ao iniciar | Chromium ausente | `npx playwright install chromium` |
| `getByLabel('E-mail')` ambíguo | links de e-mail no header/rodapé | Escopar no `.contact-form` |
| Avisos do `npm audit` | dependências transitivas | Avaliar `npm audit`; evitar `--force` sem checar breaking changes |

## 12. Estado atual e pendências

Implementado: home completa com redesign "clean & dark" (hero com fundo
desfocado e typewriter, navbar glassmorphism, skills em cards com ícones),
navegação responsiva, três projetos reais com mídia condicional (imagem/vídeo)
e pill de status animada, páginas de projeto com pager, formulário integrado
ao Static Forms, validação de ambiente, testes unitários e E2E, verificação de
segredos e documentação.

Pendências:

- Case study editorial próprio para os três projetos.
- `.env.local` com a chave real (não versionado).
- Variável de ambiente no host de deploy.
- Revisão dos avisos de `npm audit`.
- Criação do repositório Git.

### Nota sobre `npm audit`

São 8 advisories: 2 moderados em `react-router` (relacionados a SSR/hydration,
que este SPA não usa) e 6 em dependências de desenvolvimento (`vite`, `vitest`,
`esbuild`, `tinypool`). Todos os corretores automáticos exigem mudanças maiores
(Vite 8, Vitest 5, React Router 7). Como a stack definida é React 18 + Vite 5 +
Router 6, o upgrade deve ser tratado como uma migração planejada, não como
`npm audit fix --force`.

## 13. Índice da documentação

| Documento | Conteúdo |
| --- | --- |
| `README.md` | visão rápida e comandos |
| `docs/USAGE_GUIDE.md` | uso, edição, deploy e tabela de sincronização |
| `docs/CONTENT_SOURCE.md` | mapa do conteúdo editorial |
| `docs/FEATURE_MAP.md` | funcionalidades e status |
| `docs/ARCHITECTURE_OVERVIEW.md` | arquitetura e decisões |
| `docs/AI_AGENT_GUIDE.md` | regras para agentes |
| `docs/API_FLOW.md` | env, formulário, navegação e dados |
| `docs/FULL_DOCUMENTATION.md` | este documento |
| `AGENTS.md` | resumo operacional do repositório |
| `OPENCODE.md` | regras originais do projeto |
