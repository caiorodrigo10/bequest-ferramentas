import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Buscador } from './pages/Buscador';
import { EmAlta } from './pages/EmAlta';
import { Fornecedores } from './pages/Fornecedores';
import { Calculadora } from './pages/Calculadora';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/em-alta" element={<EmAlta />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/calculadora" element={<Calculadora />} />
      </Routes>
    </BrowserRouter>
  );
}
