# Fluxos de API e dados

O projeto não tem backend próprio. Existem dois "fluxos" externos: a
configuração de ambiente em build time e o envio do formulário para o Static
Forms. A navegação entre páginas também é descrita aqui porque afeta as rotas.

## 1. Configuração de ambiente

```text
.env.local
   │  (Vite injeta apenas variáveis com prefixo VITE_)
   ▼
import.meta.env.VITE_STATIC_FORMS_KEY
import.meta.env.VITE_STATIC_FORMS_ENDPOINT
   │
   ▼
src/utils/env.ts
   ├── getStaticFormsConfig() → { apiKey, endpoint }
   └── validateStaticFormsEnv() → { ok, missing[] }
   │
   ├── src/main.tsx  → aviso no console em DEV se faltar a chave
   └── src/hooks/useContactForm.ts → usa no submit
```

| Variável | Padrão | Obrigatória |
| --- | --- | --- |
| `VITE_STATIC_FORMS_KEY` | — | sim, para enviar |
| `VITE_STATIC_FORMS_ENDPOINT` | `https://api.staticforms.dev/submit` | não |

A chave é **pública no bundle** por design do Static Forms (envio direto do
navegador). A proteção real é: não commitar `.env.local`, usar `.env.example`
com placeholder e rodar `npm run check:secrets`.

## 2. Envio do formulário

```text
Usuário preenche Nome, E-mail, Mensagem
        │
        ▼
Contact.tsx  onSubmit → useContactForm.handleSubmit
        │
        ├── status === 'submitting'? → ignora (evita duplo envio)
        │
        ├── trim() nos três campos
        │      └── vazio? → status=error: "Preencha nome, e-mail e mensagem..."
        │
        ├── regex de e-mail falhou? → status=error: "Informe um endereço..."
        │
        ├── honeypot preenchido? → status=success (finge sucesso, não envia)
        │
        ├── apiKey ausente? → status=error com instrução sobre .env.local
        │
        └── POST FormData
              apiKey   = chave
              name     = nome
              email    = e-mail
              message  = mensagem
                    │
                    ├── response.ok → status=success, limpa campos
                    └── erro/rede   → status=error com mensagem amigável
```

### Detalhes da requisição

- Método: `POST`
- Endpoint: `getStaticFormsConfig().endpoint`
- Corpo: `FormData` (multipart/form-data)
- Campos extras do Static Forms (ex.: `_subject`, `_replyTo`) podem ser
  adicionados em `useContactForm.ts` se o painel exigir.
- Não há headers manuais: o navegador define o boundary do multipart.

### Estados de UI

| Status | UI |
| --- | --- |
| `idle` | Formulário normal |
| `submitting` | Botão desabilitado + spinner + "Enviando..." |
| `success` | Mensagem verde com `role="status"` |
| `error` | Mensagem vermelha com `role="alert"` |

`aria-live="polite"` no container de status garante anúncio em leitores de tela.

### Honeypot

O campo `honeypot` fica fora da tela (`position:absolute; left:-9999px`),
com `tabIndex={-1}`, `autoComplete="off"` e `aria-hidden`. Bots que preenchem
todos os campos recebem uma resposta de sucesso falsa, sem chamada de rede.
O Static Forms também oferece honeypot no servidor; este é o filtro do cliente.

## 3. Navegação e scroll

```text
Link "/#sobre"
   │
   ▼
React Router atualiza location.hash
   │
   ▼
ScrollToHash (useEffect em hash + pathname)
   │
   ├── sem hash → window.scrollTo(0, 0)
   └── com hash → scrollIntoView({ behavior: smooth|auto, block: start })
                    (50 ms de atraso para o DOM montar; reduced motion = auto)
```

- `Navbar` fecha o menu mobile quando `pathname` ou `hash` muda.
- O menu mobile é posicionado sob o header (`absolute`, `top: 100%`) porque o
  `backdrop-filter` do header cria um *containing block* para `fixed`.
- `useActiveSection` observa `#inicio`, `#sobre`, `#skills`, `#projetos` e
  `#contato` com `rootMargin: '-20% 0px -55% 0px'` para destacar o item ativo.
- Em páginas de projeto, qualquer link para a home usa `/#secao`, porque um
  `#secao` puro apontaria para a própria página de projeto.

## 4. Dados de projeto

```text
src/data/projects.ts
   ├── projects: Project[]              (fonte única, ordem = paginador)
   ├── getAllProjects()                 (home + índice)
   ├── getProjectBySlug(slug)           (ProjectShell)
   └── getProjectNeighbours(slug)       (pager anterior/próximo)
```

`ProjectShell` resolve o projeto pelo `slug`, calcula o índice em
`getAllProjects()` e renderiza hero, mídia, conteúdo (`children`) e pager.
Se o slug não existir, mostra "Projeto não encontrado" com link de volta.

Cada item declara:

- `status`: `placeholder` (mostra o bloco de case study vazio), `published`
  (sem pill) ou `in-development` (pill azul com reticências animadas);
- `media`: `{ type: 'image', src, alt }` ou `{ type: 'video', src, alt }`, ou
  `null` para o placeholder com grid;
- `github`: URL pública (`Ver GitHub`) ou `null` ("GitHub em breve").

Projetos atuais: AzuraAPI (`projeto-01`), Mini Blog (`projeto-02`) e Weather
Automation (`projeto-03`). As páginas de detalhe ainda não têm case study
editorial próprio; o bloco vazio só aparece para `placeholder`.

## 5. Diagrama de dependências

```text
main.tsx
 ├── App.tsx
 │    ├── Navbar.tsx → useActiveSection.ts
 │    ├── ScrollToHash.tsx
 │    ├── HomePage.tsx
 │    │    ├── Hero.tsx        → profile, Reveal, SocialLinks,
 │    │    │                      Typewriter → usePrefersReducedMotion
 │    │    ├── About.tsx       → profile, SectionHeading
 │    │    ├── Skills.tsx      → skills, TechIcon (Devicon)
 │    │    ├── Projects.tsx    → projects, ProjectCard → ProjectMedia
 │    │    └── Contact.tsx     → useContactForm → utils/env
 │    ├── Project01/02/03.tsx  → ProjectShell → projects, ProjectMedia
 │    ├── NotFoundPage.tsx
 │    └── Footer.tsx
 └── styles/global.css
```

## 6. Limites e falhas

- **Sem a chave**: envio bloqueado com mensagem clara; nenhum `fetch` ocorre.
- **Falha de rede/HTTP**: mensagem genérica + sugestão de e-mail direto.
- **CORS**: o Static Forms aceita chamadas do navegador para esse endpoint.
- **Duplo envio**: bloqueado por `status === 'submitting'` e `disabled`.
- **Conteúdo de projeto ausente**: o bloco de case study vazio só aparece para
  `status: 'placeholder'`; projetos publicados exibem apenas hero, mídia e
  descrição, sem inventar dados.
