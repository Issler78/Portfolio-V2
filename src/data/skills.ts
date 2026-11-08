import type { SkillGroup } from '../types'

/**
 * Categorias e tecnologias exibidas na seção de habilidades.
 * A ordem dos itens é a ordem de renderização.
 *
 * `highlight: true` destaca o nome em azul; `icons` referencia
 * `src/components/TechIcon.tsx`.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Linguagens',
    items: [
      { name: 'Java', icons: ['java'], highlight: true },
      { name: 'PHP', icons: ['php'], highlight: true },
      { name: 'Python', icons: ['python'] },
      { name: 'SQL', icons: ['sql'] },
      { name: 'HTML5', icons: ['html5'] },
      { name: 'CSS3', icons: ['css3'] },
      { name: 'Bootstrap', icons: ['bootstrap'] },
      { name: 'JavaScript', icons: ['javascript'] },
    ],
  },
  {
    title: 'Frameworks & Bibliotecas',
    items: [
      { name: 'Spring Boot', icons: ['springboot'], highlight: true },
      { name: 'Hibernate / Spring Data JPA', icons: ['hibernate'] },
      { name: 'Spring Security', icons: ['springsecurity'] },
      { name: 'JUnit', icons: ['junit'] },
      { name: 'Laravel', icons: ['laravel'], highlight: true },
      { name: 'Eloquent ORM', icons: ['eloquent'] },
      { name: 'Livewire', icons: ['livewire'] },
      { name: 'PHPUnit', icons: ['phpunit'] },
    ],
  },
  {
    title: 'Ferramentas e plataformas',
    items: [
      { name: 'Git e GitHub', icons: ['git', 'github'], highlight: true },
      { name: 'Docker', icons: ['docker'], highlight: true },
      { name: 'PostgreSQL', icons: ['postgresql'] },
      { name: 'MySQL', icons: ['mysql'] },
      { name: 'DataGrip', icons: ['datagrip'] },
      { name: 'Postman', icons: ['postman'] },
      { name: 'IntelliJ e VS Code', icons: ['intellij', 'vscode'] },
    ],
  },
]
