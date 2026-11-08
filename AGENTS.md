# AGENTS.md

Resumo operacional do repositório. Leia também `OPENCODE.md` (regras originais,
em pt-BR) e `docs/USAGE_GUIDE.md` (tabela de sincronização de docs).

## Estado do workspace

- SPA React 18 + TypeScript + Vite 5 em `C:\PortfolioV2`.
- **Não é um repositório Git** (sem commits, branches ou PR).
- Home, navegação responsiva, três páginas de projeto com pager, formulário
  Static Forms, testes unitários/E2E e documentação implementados.
- Redesign "clean & dark" aplicado: hero com fundo desfocado e typewriter,
  navbar glassmorphism, skills em cards com ícones e destaques azuis.
- Os três projetos estão populados em `src/data/projects.ts`: AzuraAPI (status
  "Em Desenvolvimento" animado + imagem), Mini Blog (vídeo em loop) e Weather
  Automation (imagem), todos com repositório público no GitHub.
- A chave real do Static Forms deve existir apenas em `.env.local`, que é
  ignorado. Enquanto não estiver configurada, o formulário exibe um aviso.

## Stack

- React 18.3, React Router 6.30, TypeScript 5.7 (strict), Vite 5.4.
- CSS puro com custom properties. Sem Tailwind, sem framer-motion.
- Ícones de tecnologia via `devicon` (devDependency) + glifos SVG inline.
- Vitest 2 + Testing Library (jsdom) e Playwright (Chromium).
- Node 18+; npm.

## Comandos

```bash
npm install
npm run dev                    # http://localhost:5173
npm run build                  # tsc --noEmit && vite build
npm run test                   # 27 testes unitários
npx playwright install chromium   # primeira vez
npm run test:e2e               # 9 testes E2E
npm run check:secrets
npm run verify                 # check:secrets + test + build
```

Screenshots responsivos (dev server precisa estar rodando):

```bash
node scripts/visual-check.mjs
```

Saída em `%TEMP%/opencode/portfolio-shots` (320, 375, 768, 1440 px).

## Estrutura essencial

```text
src/
├── components/   Navbar, Footer, Logo, SocialLinks, SectionHeading,
│                 Reveal, Typewriter, TechIcon, Icons, ProjectCard,
│                 ProjectMedia, ProjectShell, ScrollToHash
├── data/         profile.ts, navigation.ts, skills.ts, projects.ts
├── hooks/        useContactForm.ts, useActiveSection.ts,
│                 usePrefersReducedMotion.ts
├── pages/        HomePage.tsx, NotFoundPage.tsx
├── projects/     Project01.tsx, Project02.tsx, Project03.tsx
├── sections/     Hero, About, Skills, Projects, Contact
├── styles/       global.css, projects/project-shell.css, projects/projeto-0X.css
├── test/         setup.ts
├── types/        index.ts
└── utils/        env.ts
```

## Rotas

| Rota | Componente |
| --- | --- |
| `/` | `HomePage` |
| `/projects/projeto-01` | `Project01` |
| `/projects/projeto-02` | `Project02` |
| `/projects/projeto-03` | `Project03` |
| `*` | `NotFoundPage` |

## Convenções não negociáveis

- **Mobile-first**: verifique 320 → 1024 px (e 1440 px no desktop). Nenhuma
  feature é aceitável se quebrar nessa faixa.
- **TypeScript estrito**: evite `any`.
- Ordem de implementação: **tipos → hook → UI responsiva → testes**.
- Componentes DRY e orientados a props.
- Conteúdo de interface em **pt-BR**.
- Cada página de projeto tem JSX e CSS próprios; `ProjectShell` fornece apenas
  o layout comum.
- De páginas de projeto, use `/#secao` (nunca `#secao`).
- Não introduza `motion.div` nem framer-motion.
- **Links vs. botões**: navegação e links de texto não têm borda/fundo; só
  ações reais usam `.button`.
- **Paleta**: fundo `#111111`, texto branco, azul `#409ddf` como único acento
  (sem mint, sem `status-dot`).
- **Hero**: fundo `public/images/background.jpg` com blur + overlay, nome
  centralizado e `Typewriter` em uma linha.
- **Skills**: categorias e ordem em `src/data/skills.ts`; itens com
  `highlight: true` ficam azuis; ícones via `TechIcon`.

## Invariantes de projeto

```
projects.ts slug === segmento da rota em App.tsx === prop slug do ProjectShell
link do card      === '/projects/' + slug
ordem de getAllProjects() === ordem do paginador (getProjectNeighbours)
```

## Adicionar um projeto

1. `src/data/projects.ts` — dados e slug.
2. `src/projects/<Nome>.tsx` — `<ProjectShell slug="...">` + case study.
3. `src/styles/projects/<nome>.css` — estilos próprios.
4. `src/App.tsx` — registrar a rota.
5. `public/images/projects/` ou `public/videos/projects/` — imagem ou vídeo.
6. Atualizar `docs/CONTENT_SOURCE.md`, `docs/FEATURE_MAP.md`,
   `docs/ARCHITECTURE_OVERVIEW.md`, `docs/AI_AGENT_GUIDE.md`,
   `docs/FULL_DOCUMENTATION.md`, `docs/API_FLOW.md` e, se as rotas mudarem,
   este arquivo.
7. Verificar o pager anterior/próximo e rodar `npm run verify`.

## Segurança

- A chave do Static Forms é lida **somente** de `import.meta.env`
  (`VITE_STATIC_FORMS_KEY`), validada em `src/main.tsx` e no submit.
- Nunca commitar `.env.local`; `.env.example` contém apenas placeholder.
- `.gitignore` ignora `.env`, `.env.local`, `.env.*` (exceto `.env.example`),
  `dist/`, `AGENTS.md`, `OPENCODE.md` e `.agents/*`, preservando
  `.agents/skills/`.
- `npm run check:secrets` precisa passar (bloqueia chaves reais e padrões de
  credenciais conhecidos).
- Honeypot invisível no formulário; envio é curto-circuitado no cliente.

## Testes

- Vitest inclui apenas `src/**/*.test.{ts,tsx}`.
- E2E em `e2e/portfolio.spec.ts`, configurado em `playwright.config.ts`
  (baseURL `http://127.0.0.1:5173`).
- `getByLabel('E-mail')` é ambíguo na página inteira; escopar no
  `.contact-form`.
- O header tem `backdrop-filter`, que cria *containing block* para `fixed`;
  o menu mobile usa `position: absolute` + `top: 100%` e
  `height: calc(100svh - var(--header-height))`.
- O texto do `Typewriter` precisa de `white-space: nowrap`; `max-width`
  percentual quebra a frase durante a digitação.
- Não relate testes como passando sem executá-los.

## Sincronização de documentação

Após **qualquer** mudança de código ou configuração, siga
`docs/USAGE_GUIDE.md` §4.2 e **liste os arquivos de doc atualizados** antes de
finalizar.

Estrutura de docs:

```text
docs/USAGE_GUIDE.md          uso + tabela de sincronização
docs/CONTENT_SOURCE.md       mapa do conteúdo editorial
docs/FEATURE_MAP.md          funcionalidades e status
docs/ARCHITECTURE_OVERVIEW.md arquitetura e decisões
docs/AI_AGENT_GUIDE.md       regras para agentes
docs/API_FLOW.md             env, formulário, navegação, dados
docs/FULL_DOCUMENTATION.md   documento consolidado
README.md                    visão rápida
```
