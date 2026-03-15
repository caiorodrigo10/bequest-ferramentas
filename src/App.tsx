import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Buscador } from './pages/Buscador';
import { EmAlta } from './pages/EmAlta';
import { Fornecedores } from './pages/Fornecedores';
import { Calculadora } from './pages/Calculadora';
import { Lojas } from './pages/Lojas';
import { AnuncioDetalhe } from './pages/AnuncioDetalhe';
import { Projetos } from './pages/Projetos';
import { ProjetoNovo } from './pages/ProjetoNovo';
import { ProjetoDetalhe } from './pages/ProjetoDetalhe';
import { Chat } from './pages/Chat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/em-alta" element={<EmAlta />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/lojas" element={<Lojas />} />
        <Route path="/anuncios/:id" element={<AnuncioDetalhe />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/novo" element={<ProjetoNovo />} />
        <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
      </Routes>
    </BrowserRouter>
  );
}
