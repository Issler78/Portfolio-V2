# Fonte de conteúdo

Referência de mapeamento entre o conteúdo editorial e os arquivos que o site
renderiza. **Não é importado pela aplicação** — é documentação.

Instruções do usuário no chat têm prioridade sobre este documento. Ao mudar
qualquer texto, atualize o arquivo de runtime e este mapa.

## Identidade

| Campo | Valor | Arquivo |
| --- | --- | --- |
| Nome | Matheus Issler | `src/data/profile.ts` |
| Cargo | Estudante de Engenharia de Software | `src/data/profile.ts` |
| Foco | Desenvolvedor back-end em formação | `src/data/profile.ts` |
| E-mail | isslermatheus0@gmail.com | `src/data/profile.ts` |
| GitHub | https://github.com/Issler78 | `src/data/profile.ts` |
| LinkedIn | https://www.linkedin.com/in/matheus-issler/ | `src/data/profile.ts` |
| Favicon | Monograma "MI" azul sobre fundo escuro | `public/favicon.svg` |

## Textos

| Bloco | Onde aparece | Arquivo |
| --- | --- | --- |
| Frases do typewriter do hero (loop, nesta ordem): "Desenvolvedor Back-end" → "Estudante de Engenharia de Software" → "Arquitetando o futuro em código" | `Hero` | `src/sections/Hero.tsx` (`HERO_PHRASES`) |
| Imagem de fundo do hero | `Hero` | `public/images/background.jpg` |
| Tagline do hero e do rodapé | `Hero`, `Footer` | `src/data/profile.ts` (`tagline`) |
| Parágrafos do Sobre | `About` | `src/data/profile.ts` (`about`) |
| Destaques do painel "Em resumo" | `About` | `src/data/profile.ts` (`highlights`) |
| Título da seção Sobre | `About` | `src/sections/About.tsx` |
| Grupos, itens e destaques de skills | `Skills` | `src/data/skills.ts` |
| Título/descrição da seção Habilidades | `Skills` | `src/sections/Skills.tsx` |
| Cards de projeto | `Projects` | `src/data/projects.ts` |
| Título/descrição da seção Projetos | `Projects` | `src/sections/Projects.tsx` |
| Título/descrição do Contato | `Contato` | `src/sections/Contact.tsx` |
| Labels, placeholders e mensagens do formulário | `Contact` | `src/sections/Contact.tsx`, `src/hooks/useContactForm.ts` |
| Itens de menu | `Navbar`, `Footer` | `src/data/navigation.ts` |
| Rótulos de copyright | `Footer` | `src/components/Footer.tsx` |
| Página 404 | Rota desconhecida | `src/pages/NotFoundPage.tsx` |

## Biografia (referência)

Os três parágrafos do Sobre, em `profile.about`, resumem:

1. Interesse por games e tecnologia que levou à programação.
2. Obsessão por aprender e curiosidade sobre como as coisas funcionam.
3. Foco atual em back-end com Java + Spring, base web com PHP, Python, HTML,
   CSS e JavaScript.

## Habilidades

Ordem exata renderizada por `src/data/skills.ts`. Itens em **negrito** usam
`highlight: true` e aparecem em azul `#409ddf`.

- **Linguagens:** **Java**, **PHP**, Python, SQL, HTML5, CSS3, Bootstrap,
  JavaScript
- **Frameworks & Bibliotecas:** **Spring Boot**, Hibernate / Spring Data JPA,
  Spring Security, JUnit, **Laravel**, Eloquent ORM, Livewire, PHPUnit
- **Ferramentas e plataformas:** **Git e GitHub**, **Docker**, PostgreSQL,
  MySQL, DataGrip, Postman, IntelliJ e VS Code

Os ícones vêm do pacote `devicon` (dependência de desenvolvimento). SQL,
Eloquent ORM, Spring Security e PHPUnit não têm marca própria no Devicon e usam
glifos SVG inline em `src/components/TechIcon.tsx`.

## Projetos

Os três cards (`projeto-01`, `projeto-02`, `projeto-03`) exibem, nesta ordem:

| Slug | Título | Status | Mídia | GitHub |
| --- | --- | --- | --- | --- |
| `projeto-01` | AzuraAPI | Em Desenvolvimento (pill animada) | `public/images/projects/project1.png` | https://github.com/Issler78/AzuraAPI |
| `projeto-02` | Mini Blog | Publicado | `public/videos/projects/project2.mp4` | https://github.com/Issler78/PersonalBlog |
| `projeto-03` | Weather Automation | Publicado | `public/images/projects/project3.png` | https://github.com/Issler78/Weather-Automation |

As descrições são curtas e derivadas dos READMEs dos repositórios (o Mini Blog
ignora Redis, filas e cache). `status: 'in-development'` renderiza a pill azul
com reticências animadas em CSS; `published` não mostra pill. Enquanto
`github` for `null`, o rótulo "GitHub em breve" aparece como texto discreto
(sem forma de botão) e não é clicável.

## Regras editoriais

- Idioma: português do Brasil.
- Tom: direto, técnico e pessoal; sem superlativos vazios.
- Não inventar experiências, empresas, métricas ou datas.
- Placeholders devem ser identificados como tal na interface (o card usa
  "Espaço reservado" e "GitHub em breve" quando os dados ainda não existem).
