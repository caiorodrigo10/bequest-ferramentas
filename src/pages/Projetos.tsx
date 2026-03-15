import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { projetos, type Projeto } from '../data/projetos';

function ProjectCard({ p }: { p: Projeto }) {
  return (
    <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6 flex flex-col gap-4 hover:border-[#3F1DFF]/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{p.emoji}</span>
          <div>
            <h3 className="text-white font-bold text-lg">{p.nome}</h3>
            <div className="flex gap-2 mt-1">
              <span className="bg-[#3F1DFF]/10 text-[#3F1DFF] text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">{p.tipo}</span>
              <span className="bg-[#252525] text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {p.mercado === 'nacional' ? '🇧🇷 Nacional' : '🌎 Global'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-400 text-sm flex items-center gap-2">
        <span>👥</span> {p.publicoAlvo}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-500 text-xs">Setup</span>
          <span className="text-gray-400 text-xs">{p.setupPercent}%</span>
        </div>
        <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
          <div className="h-full bg-[#3F1DFF] rounded-full transition-all" style={{ width: `${p.setupPercent}%` }} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs">Meta</p>
          <p className="text-white font-bold">{p.meta}</p>
        </div>
        <Link to={`/projetos/${p.id}`}>
          <Button variant="primary" className="text-sm py-2 px-4">Abrir →</Button>
        </Link>
      </div>
    </div>
  );
}

export function Projetos() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">📁 Meus Projetos</h1>
            <p className="text-gray-400 mt-2">Gerencie suas lojas e acompanhe o progresso de cada projeto</p>
          </div>
          <Link to="/projetos/novo">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Projeto
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projetos.map(p => (
            <ProjectCard key={p.id} p={p} />
          ))}

          {/* Card novo projeto */}
          <Link to="/projetos/novo" className="block">
            <div className="border-dashed border-2 border-[#333] rounded-[16px] flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-[#3F1DFF]/40 transition-colors gap-3">
              <div className="w-12 h-12 rounded-full bg-[#252525] flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm font-medium">+ Novo Projeto</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
