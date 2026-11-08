import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollToHash } from './components/ScrollToHash'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Project01 } from './projects/Project01'
import { Project02 } from './projects/Project02'
import { Project03 } from './projects/Project03'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ScrollToHash />
      <Navbar />
      <div className="site-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/projeto-01" element={<Project01 />} />
          <Route path="/projects/projeto-02" element={<Project02 />} />
          <Route path="/projects/projeto-03" element={<Project03 />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
