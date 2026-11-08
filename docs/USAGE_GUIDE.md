# Guia de uso — Portfólio Matheus Issler

Este guia explica como rodar, editar e publicar o portfólio, e qual documentação
precisa ser atualizada a cada mudança.

## 1. Requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Navegador moderno (Chrome, Edge, Firefox ou Safari)

## 2. Primeiros passos

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

O Vite sobe em `http://localhost:5173`.

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `VITE_STATIC_FORMS_KEY` | Sim, para o formulário | Chave da API do Static Forms. Fica **apenas** em `.env.local`. |
| `VITE_STATIC_FORMS_ENDPOINT` | Não | Sobrescreve o endpoint padrão `https://api.staticforms.dev/submit`. |

Sem a chave, o site continua funcionando: o formulário mostra uma mensagem
explicando que falta configuração. O `npm run dev` também emite um aviso no
console (somente em desenvolvimento).

> Nunca faça commit de `.env.local`. O `.gitignore` cobre `.env`, `.env.local`
> e `.env.*` (exceto `.env.example`), além de `dist/` e dos arquivos de
> contexto da IA (`AGENTS.md`, `OPENCODE.md`), preservando `.agents/skills/`.
> `npm run check:secrets` bloqueia chaves reais em arquivos versionados.

## 3. Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com HMR. |
| `npm run build` | Checagem de tipos (`tsc --noEmit`) + build de produção em `dist/`. |
| `npm run preview` | Serve o build de produção localmente. |
| `npm run test` | Testes unitários/componentes (Vitest + Testing Library). |
| `npm run test:watch` | Vitest em modo watch. |
| `npm run test:e2e` | Testes end-to-end (Playwright, Chromium). |
| `npm run check:secrets` | Varre o repositório em busca de segredos. |
| `npm run verify` | `check:secrets` + testes + build. Use antes de publicar. |

### Screenshots de responsividade

```bash
npm run dev -- --host 127.0.0.1 --port 5173
node scripts/visual-check.mjs
```

As imagens vão para `%TEMP%/opencode/portfolio-shots` em 320, 375, 768 e
1440 px, para a home e para a página de projeto.

## 4. Como editar o conteúdo

### 4.1 Mapa rápido

| Conteúdo | Arquivo |
| --- | --- |
| Nome, cargo, textos do "Sobre", e-mail e redes | `src/data/profile.ts` |
| Itens do menu e âncoras | `src/data/navigation.ts` |
| Grupos de skills, ícones e destaques | `src/data/skills.ts` |
| Frases do typewriter do hero | `src/sections/Hero.tsx` |
| Ícones de tecnologia | `src/components/TechIcon.tsx` |
| Cards de projeto | `src/data/projects.ts` |
| Título/descrição da seção de contato | `src/sections/Contact.tsx` |
| Textos do formulário | `src/sections/Contact.tsx` e `src/hooks/useContactForm.ts` |

### 4.2 Sincronização obrigatória de documentação

Depois de **qualquer** mudança de código ou configuração, atualize os docs
abaixo conforme o impacto:

| O que mudou | Documentos a atualizar |
| --- | --- |
| Textos, links, e-mail, redes | `docs/CONTENT_SOURCE.md` |
| Seções, componentes, hooks, estilos | `docs/FEATURE_MAP.md`, `docs/ARCHITECTURE_OVERVIEW.md` |
| Rotas, navegação, páginas de projeto | `docs/FEATURE_MAP.md`, `docs/ARCHITECTURE_OVERVIEW.md`, `docs/AI_AGENT_GUIDE.md`, `docs/API_FLOW.md`, `AGENTS.md` |
| Formulário, env vars, integrações | `docs/API_FLOW.md`, `docs/FULL_DOCUMENTATION.md` |
| Scripts, dependências, comandos | `README.md`, `docs/FULL_DOCUMENTATION.md`, `AGENTS.md` |
| Qualquer mudança relevante | `docs/FULL_DOCUMENTATION.md` |

Ao terminar, **liste os arquivos de documentação atualizados** na resposta.

## 5. Adicionar um projeto

Os três projetos atuais já estão publicados e servem de referência:
`projeto-01` (AzuraAPI), `projeto-02` (Mini Blog) e `projeto-03` (Weather
Automation). Para adicionar um novo projeto:

1. **Dados** — edite `src/data/projects.ts`:

   ```ts
   {
     slug: 'meu-projeto',
     title: 'Meu Projeto',
     description: 'Resumo curto exibido no card.',
     stack: ['Java', 'Spring'],
     github: 'https://github.com/Issler78/meu-projeto',
     demo: null,
     media: {
       type: 'video',
       src: '/videos/projects/meu-projeto.mp4',
       alt: 'Demonstração do Meu Projeto',
     },
     status: 'published',
   }
   ```

2. **Página** — crie `src/projects/MeuProjeto.tsx` importando o CSS próprio:

   ```tsx
   import { ProjectShell } from '../components/ProjectShell'
   import '../styles/projects/meu-projeto.css'

   export function MeuProjeto() {
     return <ProjectShell slug="meu-projeto">{/* case study */}</ProjectShell>
   }
   ```

3. **Estilo** — crie `src/styles/projects/meu-projeto.css`.

4. **Rota** — registre em `src/App.tsx`:
   `<Route path="/projects/meu-projeto" element={<MeuProjeto />} />`.

5. **Mídia** — coloque imagens em `public/images/projects/` e vídeos em
   `public/videos/projects/`; o `src` em `projects.ts` começa com `/images/...`
   ou `/videos/...`.

6. **Docs** — atualize `docs/CONTENT_SOURCE.md`, `docs/FEATURE_MAP.md`,
   `docs/ARCHITECTURE_OVERVIEW.md`, `docs/AI_AGENT_GUIDE.md`,
   `docs/FULL_DOCUMENTATION.md`, `docs/API_FLOW.md` e `AGENTS.md` (se as rotas
   mudarem).

7. **Verifique** o paginador anterior/próximo em `ProjectShell` e rode
   `npm run verify`.

### Invariantes

```
projects.ts slug === segmento da rota em App.tsx === prop slug do ProjectShell
link do card      === '/projects/' + slug
ordem de getAllProjects() === ordem do paginador anterior/próximo
```

Cada página de projeto tem JSX e CSS próprios. Não transforme todas em um
template genérico: o `ProjectShell` cuida do layout comum (hero, mídia,
paginador) e o conteúdo do case study fica no componente do projeto.

## 6. Mídia dos cards

- `type: 'image'` → `<img loading="lazy">` com `object-fit: contain` (não corta
  diagramas nem screenshots).
- `type: 'video'` → `<video autoPlay muted loop playsInline>` (estilo GIF) com
  `object-fit: cover`.
- Use MP4 curto, sem áudio, com `poster` opcional, para não pesar no mobile.
- Enquanto `media` for `null`, o card mostra um placeholder com grid.
- `status: 'in-development'` exibe a pill azul "Em Desenvolvimento" com
  reticências animadas; `published` não exibe pill.

## 7. Deploy

O site é 100% estático. Passos gerais:

1. `npm run verify`.
2. Publique a pasta `dist/` em um host estático (Netlify, Vercel, GitHub Pages,
   Cloudflare Pages).
3. Configure `VITE_STATIC_FORMS_KEY` no painel do host (variável de build).
4. Ative fallback de SPA para que `/projects/*` devolva `index.html`:
   - Netlify: `/* /index.html 200`
   - Vercel: rewrite para `/index.html`
   - GitHub Pages: use `404.html` igual ao `index.html` ou um host com rewrite.

## 8. Acessibilidade e responsividade

- Layout validado de 320 px a 1440 px.
- Menu mobile com foco preso, `Escape` para fechar e `aria-expanded`.
- Animações respeitam `prefers-reduced-motion` (o typewriter fica estático).
- Formulário tem labels, `aria-live` para status e honeypot invisível.

Checklist manual antes de publicar:

- [ ] 320, 375, 768, 1024 e 1440 px sem overflow horizontal
- [ ] Menu hambúrguer abre/fecha e navega
- [ ] Paginador dos projetos percorre 01 → 02 → 03
- [ ] Formulário envia com a chave configurada
- [ ] `npm run verify` sem erros
