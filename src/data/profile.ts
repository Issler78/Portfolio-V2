import type { Highlight, SocialLink } from '../types'

export const profile = {
  name: 'Matheus Issler',
  role: 'Estudante de Engenharia de Software',
  focus: 'Desenvolvedor back-end em formação',
  tagline:
    'Foco principal em Java e Spring, complementado por conhecimentos em PHP e Python.',
  email: 'isslermatheus0@gmail.com',
  about: [
    'Sou apaixonado por games e tecnologia e, desde cedo, decidi me aprofundar em programação.',
    'Tenho obsessão por aprender e curiosidade para entender como tudo realmente funciona. Acredito que curiosidade e dedicação são fundamentais para continuar evoluindo — e foi isso que me motivou a chegar até aqui.',
    'Hoje estou focado em desenvolver aplicações back-end com Java e Spring. Também tenho conhecimento web em PHP e familiaridade com Python, o que complementa minha base em HTML, CSS e JavaScript.',
  ],
  highlights: [
    {
      label: 'Foco atual',
      value: 'Back-end com Java + Spring',
    },
    {
      label: 'Também exploro',
      value: 'PHP, Python e desenvolvimento web',
    },
    {
      label: 'Base web',
      value: 'HTML, CSS e JavaScript',
    },
  ] satisfies Highlight[],
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/Issler78',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/matheus-issler/',
      icon: 'linkedin',
    },
    {
      label: 'E-mail',
      url: 'mailto:isslermatheus0@gmail.com',
      icon: 'mail',
    },
  ] satisfies SocialLink[],
}
