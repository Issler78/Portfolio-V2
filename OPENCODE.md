# OpenCode System Context - Portfólio Pessoal

Este arquivo define as regras de arquitetura, comportamento e estilo de código para o assistente OpenCode trabalhar neste repositório.

## 1. Goal (Objetivo)
Construir e manter um portfólio pessoal moderno, rápido, acessível e totalmente responsivo para um estudante de Engenharia de Software.

## 2. Context (Contexto)
- **Idioma:** Português do Brasil (pt-BR).
- **Inspiração Visual:** Estrutura e animações de [Aditi Arya](https://aditiarya.netlify.app/), **sem** a seção de Experiências.
- **Skill Base:** Utilize a skill portfolio-site, instalada em .agents/skills

## 3. Constraints (Restrições)
- **Stack Tecnológico:** React + TypeScript + Vite.
- **Responsividade:** Padrão **Mobile-First** obrigatório. Nenhuma feature deve ser aprovada se quebrar o layout em telas de 320px a 1024px. O uso de media queries ou classes utilitárias de responsividade deve ser rigoroso.
- **Backend/Banco de Dados:** **Nenhum.** Site 100% estático/client-side.
- **Formulário de Contato:** Integração com **Static Forms**.
- **Segurança:** Uso obrigatório de variáveis de ambiente (`import.meta.env`).

## 4. Deliverables (Padrões de Entrega)
O assistente deve garantir que o código passe pelos seguintes scripts locais:
- `npm run dev` (Teste local manual de responsividade)
- `npm run build`
- `npm run test`

## 5. Coding Standards (Padrões de Código)
- **TypeScript:** Tipagem estrita obrigatória. Evite `any`.
- **Componentização & UI:** Padrão DRY. Componentes de UI devem aceitar props para adaptação em diferentes tamanhos de tela.
- **Estrutura de Pastas Sugerida:**
  ```text
  /src
    /assets
    /components   # (Botões, Cards de Projeto, Navbar Responsiva)
    /hooks
    /sections
    /styles
    /types
    /utils

## 6. Security & Testing Guidelines
- Proteção de Variáveis: Validação no load para garantir que import.meta.env.VITE_STATIC_FORMS_KEY existe.

### Testes Obrigatórios:
- Testes de renderização para Desktop e Mobile.
- Teste de isolamento de variáveis.
- Teste de submissão do formulário.

## 7. Workflow do Assistente
- **Pense antes de codificar:** Analise o pedido do usuário.
- **Não presuma dados:** Nunca invente informações que não foram fornecidas.
- **Passo a passo:** Ao implementar uma feature, siga a ordem estrita: tipagem, hook, UI responsiva, testes.