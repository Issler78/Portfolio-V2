# Visão geral da arquitetura

## Resumo

SPA estática de portfólio, sem backend e sem banco de dados. React 18 +
TypeScript + Vite 5, com React Router 6 para a home e as páginas de projeto.
Todo o conteúdo vive em módulos TypeScript dentro de `src/data`. O único
serviço externo é o Static Forms (envio do formulário de contato).

```text
Navegador
  └── React (SPA)
        ├── src/data/*        conteúdo tipado em build time
        ├── src/sections/*    seções da home
        ├── src/projects/*    páginas de projeto
        ├── src/components/*  UI compartilhada
        └── POST FormData → api.staticforms.dev/submit
```

## Camadas

### 1. Entrada

- `index.html` — metadata, fontes (JetBrains Mono + Poppins) e `#root`.
- `src/main.tsx` — valida a env do formulário, monta o React e o
  `BrowserRouter` (com future flags do React Router v7).
- `src/App.tsx` — skip link, `ScrollToHash`, `Navbar`, `Routes` e `Footer`.

### 2. Rotas

| Rota | Componente | Descrição |
| --- | --- | --- |
| `/` | `src/pages/HomePage.tsx` | Hero, Sobre, Skills, Projetos, Contato |
| `/projects/projeto-01` | `src/projects/Project01.tsx` | AzuraAPI |
| `/projects/projeto-02` | `src/projects/Project02.tsx` | Mini Blog |
| `/projects/projeto-03` | `src/projects/Project03.tsx` | Weather Automation |
| `*` | `src/pages/NotFoundPage.tsx` | Página 404 |

As rotas são registradas manualmente em `src/App.tsx`. O site precisa de
fallback de SPA no host para que `/projects/*` funcione em acesso direto.

### 3. Conteúdo e tipos

- `src/types/index.ts` — `Project`, `ProjectMedia`, `ProjectStatus`,
  `SkillGroup`, `SkillItem`, `TechIconKey`, `NavItem`, `SocialLink`,
  `Highlight`, `ContactFormValues`, `ContactStatus`.
- `src/data/profile.ts` — identidade, bio, destaques e redes.
- `src/data/navigation.ts` — itens de menu e âncoras (`/#secao`).
- `src/data/skills.ts` — grupos de tecnologias, ordem, ícones e destaques.
- `src/data/projects.ts` — array `projects` + `getAllProjects()`,
  `getProjectBySlug()` e `getProjectNeighbours()`.

`projects.ts` é a fonte única da ordem dos cards e do paginador. Cada projeto
declara `status` (`placeholder`, `published` ou `in-development`) e `media`
(`image` ou `video`). Projetos publicados não exibem o bloco de case study
vazio; apenas `placeholder` o mostra.

### 4. Seções e componentes

```text
src/components/
  Navbar.tsx          header fixo glassmorphism + menu mobile com focus trap
  Footer.tsx          rodapé com navegação e contato
  Logo.tsx            marca textual clicável
  SocialLinks.tsx     GitHub / LinkedIn / e-mail
  SectionHeading.tsx  cabeçalho de seção reutilizável
  Reveal.tsx          wrapper de animação por IntersectionObserver
  Typewriter.tsx      frases do hero em loop (com reduced motion)
  TechIcon.tsx        ícones de tecnologia (Devicon + glifos inline)
  Icons.tsx           ícones SVG inline
  ProjectCard.tsx     card da home
  ProjectMedia.tsx    placeholder / imagem / vídeo
  ProjectShell.tsx    layout das páginas de projeto + pager
  ScrollToHash.tsx    rolagem para âncoras após navegação
```

A home é composta em `src/sections/` (`Hero`, `About`, `Skills`, `Projects`,
`Contact`). As páginas de projeto ficam em `src/projects/` e recebem o layout
comum do `ProjectShell`, mantendo JSX e CSS específicos por projeto.

### 5. Hooks

- `useContactForm` — estado do formulário, validação, honeypot e `fetch` para o
  Static Forms.
- `useActiveSection` — observa as seções e retorna a ativa para o menu.
- `usePrefersReducedMotion` — preferência do sistema por menos movimento, usada
  pelo `Typewriter` e pelas animações CSS.

### 6. Estilos

CSS puro com custom properties, mobile-first.

```text
src/styles/global.css                    design system + seções + responsivo
src/styles/projects/project-shell.css    layout compartilhado de projeto
src/styles/projects/projeto-0X.css       estilos específicos de cada projeto
```

Tokens principais (em `:root`):

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#111111` | fundo |
| `--surface` / `--surface-2` | `#171717` / `#1c1c1c` | cards e painéis |
| `--text` | `#ffffff` | texto |
| `--text-muted` / `--text-dim` | `#a1a1a1` / `#6f6f6f` | texto secundário |
| `--accent` | `#409ddf` | destaque azul (único acento) |
| `--accent-bright` | `#6ab8f0` | hover do azul |
| `--danger` | `#e94560` | erros |
| `--hover` | `#555555` | hover neutro |
| `--font-mono` | JetBrains Mono | eyebrows, labels e typewriter |
| `--font-body` | Poppins | títulos e corpo |

Breakpoints: 360 (skills em 2 colunas), 480, 640, 768, 900 (skills em 4
colunas), 1024 e 1200 px; ajuste extra abaixo de 360 px.
`prefers-reduced-motion` desliga animações e transições.

O hero usa `public/images/background.jpg` como fundo com `filter: blur(14px)`
e um overlay escuro; o header usa `backdrop-filter` para o efeito de vidro.

### 7. Camada de integração

`src/utils/env.ts` lê `import.meta.env`, define o endpoint padrão e expõe
`validateStaticFormsEnv()`. Detalhes do fluxo em `docs/API_FLOW.md`.

## Decisões

- **Sem framer-motion.** As animações usam CSS + `IntersectionObserver`
  (`Reveal`), reduzindo o bundle e respeitando `prefers-reduced-motion`.
- **Sem Tailwind.** CSS puro com tokens mantém o controle do design e evita
  dependências de build.
- **Ícones de marca via Devicon.** O pacote `devicon` (devDependency) fornece
  SVGs oficiais coloridos para as tecnologias da seção de habilidades; quatro
  itens sem marca própria usam glifos SVG inline.
- **Sem ícones decorativos de status.** O redesign removeu `status-dot`s e
  gradientes chamativos; o azul `#409ddf` é o único acento. O status do painel
  "Em resumo" usa apenas reticências animadas em CSS (`steps()`), sem estado no
  React.
- **Typewriter acessível.** O texto animado fica `aria-hidden` e a lista
  completa é exposta em `sr-only`; com reduced motion, a primeira frase fica
  estática.
- **Conteúdo tipado.** `satisfies` garante que os dados batem com os tipos sem
  perder a inferência.
- **Status sem estado em React.** A pill "Em Desenvolvimento" reutiliza
  `@keyframes status-dots` com `steps(4)`; a largura fixa do span evita reflow.
- **Imagens sem corte.** Imagens usam `object-fit: contain` (diagramas e
  screenshots); vídeos mantêm `cover` para preencher o card.
- **Páginas de projeto bespoke.** O shell é compartilhado; o miolo de cada case
  study é próprio, conforme a regra do projeto.

## Build e testes

- `vite.config.ts` configura React e Vitest (jsdom, setup em
  `src/test/setup.ts`, include restrito a `src/**/*.test.{ts,tsx}`) e define
  `assetsInlineLimit: 0` para emitir os SVGs do Devicon como arquivos próprios.
- `playwright.config.ts` sobe o dev server e roda `e2e/portfolio.spec.ts`.
- `scripts/check-secrets.mjs` varre o repositório antes do build.
- `npm run verify` = segredos + testes + build.

## Estrutura de pastas

```text
.
├── docs/
├── e2e/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── background.jpg
│   │   └── projects/          project1.png, project3.png
│   └── videos/
│       └── projects/          project2.mp4
├── scripts/
│   ├── check-secrets.mjs
│   └── visual-check.mjs
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── projects/
│   ├── sections/
│   ├── styles/
│   │   └── projects/
│   ├── test/
│   ├── types/
│   └── utils/
├── AGENTS.md
├── OPENCODE.md
├── index.html
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vite.config.ts
```
