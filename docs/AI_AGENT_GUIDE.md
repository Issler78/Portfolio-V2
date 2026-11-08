# Guia para agentes de IA

Leia `AGENTS.md`, `OPENCODE.md` e este arquivo antes de editar. O projeto é um
SPA React 18 + TypeScript + Vite 5, em pt-BR, sem backend.

## Ordem de implementação

1. Tipos (`src/types`)
2. Hook/lógica (`src/hooks`, `src/utils`)
3. UI responsiva (`src/components`, `src/sections`, `src/projects`)
4. Testes (`*.test.ts(x)` e `e2e/`)

## Onde editar

| Objetivo | Arquivos |
| --- | --- |
| Textos pessoais | `src/data/profile.ts` |
| Frases do typewriter | `src/sections/Hero.tsx` |
| Menu | `src/data/navigation.ts` |
| Skills (categorias, itens, destaques) | `src/data/skills.ts` |
| Ícones de tecnologia | `src/components/TechIcon.tsx` |
| Projetos (dados) | `src/data/projects.ts` |
| Card de projeto | `src/components/ProjectCard.tsx` + `global.css` |
| Página de projeto | `src/projects/<Nome>.tsx` + `src/styles/projects/<nome>.css` |
| Layout de projeto | `src/components/ProjectShell.tsx` + `project-shell.css` |
| Formulário | `src/hooks/useContactForm.ts`, `src/sections/Contact.tsx` |
| Env | `src/utils/env.ts`, `.env.example` |
| Rotas | `src/App.tsx` |

## Invariantes que não podem quebrar

```
slug em projects.ts === segmento da rota em App.tsx === prop slug do ProjectShell
link do card        === '/projects/' + slug
ordem de getAllProjects() === ordem do paginador (getProjectNeighbours)
```

- De páginas de projeto, links para a home usam `/#secao` (nunca `#secao`).
- Cada projeto mantém JSX e CSS próprios. Não colapse tudo no `ProjectShell`.
- `ProjectShell` só deve receber `children` quando o case study existir.

## Regras de estilo

- TypeScript estrito, sem `any`.
- Componentes DRY e orientados a props.
- CSS puro com custom properties; **não** introduza Tailwind.
- **Não** use `motion.div` nem framer-motion.
- Mobile-first: valide 320 → 1024 px (e 1440 px no desktop).
- Toda animação deve respeitar `prefers-reduced-motion`.
- Conteúdo de interface em português do Brasil.
- **Links vs. botões:** navegação e links de texto não recebem borda/fundo;
  apenas ações reais usam `.button`. Hover é cor mais clara ou brilho sutil.
- **Ícones de tecnologia:** use `src/components/TechIcon.tsx`. Marcas vêm do
  Devicon; itens sem marca (SQL, Eloquent ORM, Spring Security, PHPUnit) usam
  glifos SVG inline. Não introduza barras de progresso ou porcentagens.
- **Paleta:** fundo `#111111`, texto branco e azul `#409ddf` como único acento.
- O typewriter deve permanecer em uma linha (`white-space: nowrap`) e manter a
  lista completa em `sr-only`.

## Segurança

- A chave do Static Forms vem **somente** de `import.meta.env` e mora em
  `.env.local` (não versionado).
- Nunca escreva a chave real em código, docs, testes, prints ou chat.
- Placeholders em `.env.example` devem continuar óbvios (`sf_seu_api_key_aqui`).
- `npm run check:secrets` precisa passar.
- Honeypot: o campo fica invisível e o envio é curto-circuitado no cliente.

## Testes

```bash
npm run test        # Vitest: 27 testes
npm run test:e2e    # Playwright: 9 testes
npm run verify      # segredos + testes + build
```

O Vitest inclui apenas `src/**/*.test.{ts,tsx}`. Testes E2E ficam em `e2e/` e
são executados pelo Playwright.

Ao adicionar comportamento, cubra:

- renderização dos componentes principais;
- validação e envio do formulário (sucesso, erro, honeypot, chave ausente);
- isolamento das variáveis de ambiente;
- ausência de overflow horizontal em 320/375/768/1024/1440 px.

## Documentação obrigatória

Depois de qualquer mudança, siga `docs/USAGE_GUIDE.md` §4.2. No mínimo:

- mudou conteúdo → `docs/CONTENT_SOURCE.md`
- mudou feature/estilo → `docs/FEATURE_MAP.md`
- mudou arquitetura/rota → `docs/ARCHITECTURE_OVERVIEW.md` e este arquivo
- mudou integração/segurança → `docs/API_FLOW.md`
- mudou script/config → `README.md`, `docs/FULL_DOCUMENTATION.md`, `AGENTS.md`

**Sempre liste os arquivos de doc atualizados** ao terminar.

## Armadilhas conhecidas

- Rodar `npx playwright test` sem o Chromium instalado falha; use
  `npx playwright install chromium`.
- `getByLabel('E-mail')` é ambíguo na página inteira (há links com "e-mail" no
  header/rodapé). Escopo no `.contact-form` nos testes de UI.
- Screenshots de página inteira mostram seções invisíveis se o script não
  rolar a página antes: `Reveal` só aparece após interseção. Use
  `scripts/visual-check.mjs`.
- Sem a env var, o formulário exibe erro de configuração — comportamento
  esperado, coberto por teste.
- O header tem `backdrop-filter`, que cria um *containing block* para
  descendentes `position: fixed`. Por isso o menu mobile usa
  `position: absolute` + `top: 100%` + `height: calc(100svh - header)`; não
  volte para `fixed` sem tirar o menu de dentro do header.
- O `Typewriter` não deve receber `max-width` percentual no texto: ele quebra a
  frase no meio durante a digitação. Mantenha `white-space: nowrap`.
- Com `.env.local` presente, testes que simulam chave ausente precisam de
  `vi.stubEnv('VITE_STATIC_FORMS_KEY', '')`; os stubs de env não são
  restaurados automaticamente. No E2E, intercepte
  `https://api.staticforms.dev/**` e aceite sucesso **ou** o aviso de
  configuração, para o teste não depender da chave local.
- O status "construindo" e a pill "Em Desenvolvimento" usam uma animação CSS de
  largura em `steps(4)`. O span das reticências é absoluto (no Sobre) e tem
  largura fixa (no card) para não deslocar o texto.
- Imagens de projeto usam `object-fit: contain`; não troque para `cover` sem
  verificar os diagramas/screenshots (`project1.png` e `project3.png`).
