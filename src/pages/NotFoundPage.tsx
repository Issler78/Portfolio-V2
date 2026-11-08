import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main id="conteudo" className="not-found container">
      <p className="not-found__code">404</p>
      <h1>Página fora do escopo.</h1>
      <p>
        O endereço que você tentou acessar não existe. Volte para o início e
        continue explorando.
      </p>
      <Link className="button button--primary" to="/#inicio">
        Voltar ao início
      </Link>
    </main>
  )
}
