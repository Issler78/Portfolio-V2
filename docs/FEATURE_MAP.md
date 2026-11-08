# Mapa de funcionalidades

Status atual do portfólio. Atualize este arquivo sempre que uma seção, rota,
componente ou recurso mudar.

## Legenda

- ✅ implementado e coberto por testes
- 🟡 implementado, depende de configuração/conteúdo externo
- ⬜ planejado / espaço reservado

## Seções da home (`/`)

| Seção | ID | Componente | Estado | Observações |
| --- | --- | --- | --- | --- |
| Hero | `inicio` | `src/sections/Hero.tsx` | ✅ | Fundo `/images/background.jpg` com blur, nome centralizado, typewriter em loop, CTAs e redes. |
| Sobre | `sobre` | `src/sections/About.tsx` | ✅ | Textos e painel "Em resumo" com status e reticências animadas em CSS. |
| Skills | `skills` | `src/sections/Skills.tsx` | ✅ | Três grupos: Linguagens, Frameworks & Bibliotecas, Ferramentas e plataformas. Cards com ícone colorido; destaques em azul. |
| Projetos | `projetos` | `src/sections/Projects.tsx` | ✅ | Grid com AzuraAPI (pill "Em Desenvolvimento" animada), Mini Blog (vídeo) e Weather Automation (imagem), todos com link "Ver GitHub". |
| Contato | `contato` | `src/sections/Contact.tsx` | 🟡 | Formulário pronto; envio real exige `VITE_STATIC_FORMS_KEY`. |

## Páginas de projeto

| Rota | Componente | Slug | CSS | Estado |
| --- | --- | --- | --- | --- |
| `/projects/projeto-01` | `src/projects/Project01.tsx` | `projeto-01` | `src/styles/projects/projeto-01.css` | 🟡 AzuraAPI; case study pendente |
| `/projects/projeto-02` | `src/projects/Project02.tsx` | `projeto-02` | `src/styles/projects/projeto-02.css` | 🟡 Mini Blog; case study pendente |
| `/projects/projeto-03` | `src/projects/Project03.tsx` | `projeto-03` | `src/styles/projects/projeto-03.css` | 🟡 Weather Automation; case study pendente |

Cada página usa `ProjectShell` (hero, mídia, conteúdo e paginador). O conteúdo
do case study é passado como `children`; sem children, aparece o bloco
"Este espaço está pronto para receber o case study" **apenas** para projetos
com `status: 'placeholder'`. Nos demais, o bloco é omitido. Enquanto não há URL
de GitHub, o rótulo "GitHub em breve" é texto discreto, não um botão.

## Navegação

| Recurso | Arquivo | Estado |
| --- | --- | --- |
| Header fixo glassmorphism (64 px) | `src/components/Navbar.tsx` | ✅ |
| Links de navegação sem moldura, com brilho sutil no hover | `src/components/Navbar.tsx`, `global.css` | ✅ |
| Nav desktop (≥1024 px) | `src/components/Navbar.tsx` | ✅ |
| Menu hambúrguer mobile | `src/components/Navbar.tsx` | ✅ |
| Foco preso no menu, `Escape`, `aria-expanded` | `src/components/Navbar.tsx` | ✅ |
| Seção ativa via `IntersectionObserver` | `src/hooks/useActiveSection.ts` | ✅ |
| Scroll suave para âncoras | `src/components/ScrollToHash.tsx` | ✅ |
| Skip link "Pular para o conteúdo" | `src/App.tsx` | ✅ |
| Rodapé com menu, e-mail e redes | `src/components/Footer.tsx` | ✅ |

## Componentes de UI

| Componente | Responsabilidade | Estado |
| --- | --- | --- |
| `Logo` | Marca textual `matheus.issler`, link para `/#inicio` | ✅ |
| `SocialLinks` | GitHub, LinkedIn e e-mail (ícone ou ícone + rótulo) | ✅ |
| `Typewriter` | Digitação em loop com fallback estático e lista `sr-only` | ✅ |
| `TechIcon` | Ícones de tecnologia (Devicon + glifos SVG para SQL, Eloquent, Spring Security e PHPUnit) | ✅ |
| `SectionHeading` | Eyebrow numerado + título + descrição | ✅ |
| `Reveal` | Animação de entrada no scroll, com reduced motion | ✅ |
| `ProjectCard` | Card com mídia condicional (imagem/vídeo), textos, stack, pill de status animada e ações | ✅ |
| `ProjectMedia` | Placeholder, `<img>` ou `<video>` autoplay/muted/loop | ✅ |
| `ProjectShell` | Layout comum das páginas de projeto + pager; omite o placeholder em projetos publicados | ✅ |
| `Icons` | Ícones SVG inline (sem dependência externa) | ✅ |

## Formulário de contato

| Recurso | Arquivo | Estado |
| --- | --- | --- |
| Validação de nome, e-mail e mensagem | `src/hooks/useContactForm.ts` | ✅ |
| Envio `FormData` para o Static Forms | `src/hooks/useContactForm.ts` | 🟡 exige chave |
| Honeypot invisível (curto-circuito no cliente) | `src/hooks/useContactForm.ts` | ✅ |
| Estados `idle/submitting/success/error` com `aria-live` | `src/sections/Contact.tsx` | ✅ |
| Aviso de configuração ausente | `src/hooks/useContactForm.ts` | ✅ |
| Validação da env no carregamento | `src/utils/env.ts`, `src/main.tsx` | ✅ |

## Qualidade e segurança

| Recurso | Arquivo | Estado |
| --- | --- | --- |
| Testes de componentes e formulário (27 em 7 arquivos) | `src/**/*.test.tsx`, `src/**/*.test.ts` | ✅ |
| Testes E2E e responsividade (9) | `e2e/portfolio.spec.ts` | ✅ |
| Verificação de segredos | `scripts/check-secrets.mjs` | ✅ |
| Screenshots de responsividade | `scripts/visual-check.mjs` | ✅ |
| TypeScript estrito | `tsconfig.json` | ✅ |
| Build de produção | `vite.config.ts` | ✅ |

## Pendências conhecidas

- Criar case study próprio (contexto, decisões, resultados) para os três
  projetos; hoje as páginas de detalhe mostram hero, mídia e descrição.
- Criar `.env.local` com a chave do Static Forms.
- Configurar a env var no host de deploy.
- Revisar os avisos do `npm audit`: 8 advisories — 2 moderados em
  `react-router` (só afetam SSR/hydration, não usados neste SPA) e 6 em
  ferramentas de dev (`vite`, `vitest`, `esbuild`, `tinypool`). Os corretores
  exigem saltos maiores (Vite 8, Vitest 5, React Router 7), incompatíveis com
  a stack definida (React 18 + Vite 5 + Router 6). Reavaliar com um upgrade
  planejado.
- Inicializar repositório Git (o diretório ainda não é um repo).
