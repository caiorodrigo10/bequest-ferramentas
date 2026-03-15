import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, ExternalLink } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AIChat } from '../components/AIChat';
import { projetos, type Projeto } from '../data/projetos';

const CHECKLIST_ITEMS = [
  'Registrar CNPJ / MEI',
  'Criar conta Shopify',
  'Instalar pixel Meta',
  'Criar conta Meta Ads',
  'Selecionar produtos',
  'Criar criativos',
  'Lançar campanha teste',
];

function useChecklist(projectId: string) {
  const key = `bequest_checklist_${projectId}`;
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  });

  const toggle = (item: string) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  return { checked, toggle };
}

export function ProjetoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const { checked, toggle } = useChecklist(id || '');

  useEffect(() => {
    // Check static data first
    const found = projetos.find(p => p.id === id);
    if (found) {
      setProjeto(found);
      return;
    }
    // Check localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('bequest_projetos') || '[]') as Projeto[];
      const local = stored.find(p => p.id === id);
      if (local) setProjeto(local);
    } catch {
      // noop
    }
  }, [id]);

  if (!projeto) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Projeto não encontrado</p>
            <Link to="/projetos" className="text-[#3F1DFF] hover:underline">← Voltar</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const doneCount = CHECKLIST_ITEMS.filter(i => checked[i]).length;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/projetos" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-4xl">{projeto.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{projeto.nome}</h1>
              <div className="flex gap-2 mt-1">
                <span className="bg-[#3F1DFF]/10 text-[#3F1DFF] text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">{projeto.tipo}</span>
                <span className="bg-[#252525] text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {projeto.mercado === 'nacional' ? '🇧🇷 Nacional' : '🌎 Global'}
                </span>
                <span className="bg-[#252525] text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Criado em {projeto.criadoEm}
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 text-gray-400 hover:text-white px-4 py-2 rounded-[12px] transition-colors text-sm">
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left column ── */}
          <div className="space-y-4">
            {/* Visão Geral */}
            <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6">
              <h2 className="text-white font-bold mb-4">📊 Visão Geral</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🏷️</span>
                  <div>
                    <p className="text-gray-500 text-xs">Nicho</p>
                    <p className="text-white text-sm font-medium">{projeto.nicho}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌍</span>
                  <div>
                    <p className="text-gray-500 text-xs">Mercado</p>
                    <p className="text-white text-sm font-medium">{projeto.mercado === 'nacional' ? '🇧🇷 Nacional' : '🌎 Global'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">👥</span>
                  <div>
                    <p className="text-gray-500 text-xs">Público-alvo</p>
                    <p className="text-white text-sm font-medium">{projeto.publicoAlvo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">📣</span>
                  <div>
                    <p className="text-gray-500 text-xs">Estratégia</p>
                    <p className="text-white text-sm font-medium">{projeto.estrategia.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎯</span>
                  <div>
                    <p className="text-gray-500 text-xs">Meta</p>
                    <p className="text-white text-sm font-bold">{projeto.meta}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold">✅ Checklist de Setup</h2>
                <span className="text-gray-400 text-xs">{doneCount}/{CHECKLIST_ITEMS.length}</span>
              </div>
              <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#3F1DFF] rounded-full transition-all"
                  style={{ width: `${(doneCount / CHECKLIST_ITEMS.length) * 100}%` }}
                />
              </div>
              <div className="space-y-3">
                {CHECKLIST_ITEMS.map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggle(item)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        checked[item]
                          ? 'bg-[#3F1DFF] border-[#3F1DFF]'
                          : 'border-[#333] group-hover:border-[#3F1DFF]/50'
                      }`}
                    >
                      {checked[item] && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span className={`text-sm transition-colors ${checked[item] ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Produtos */}
            <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6">
              <h2 className="text-white font-bold mb-3">📦 Produtos</h2>
              <p className="text-gray-400 text-sm mb-4">Nenhum produto adicionado ainda</p>
              <Link
                to="/em-alta"
                className="flex items-center gap-2 bg-[#3F1DFF]/10 hover:bg-[#3F1DFF]/20 text-[#3F1DFF] text-sm font-medium px-4 py-2 rounded-[12px] transition-colors border border-[#3F1DFF]/20 w-fit"
              >
                <ExternalLink className="w-4 h-4" />
                Adicionar produtos do Radar →
              </Link>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-4">
            {/* Assistente do Projeto */}
            <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6">
              <h2 className="text-white font-bold mb-4">🤖 Assistente do Projeto</h2>
              <ProjectChat projeto={projeto} />
            </div>

            {/* Criativos */}
            <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6">
              <h2 className="text-white font-bold mb-4">🎨 Criativos</h2>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-video border-2 border-dashed border-[#333] rounded-[12px] flex flex-col items-center justify-center gap-1 hover:border-[#3F1DFF]/40 transition-colors cursor-pointer group"
                    onClick={() => alert('Em breve')}
                  >
                    <span className="text-lg">🎨</span>
                    <p className="text-gray-500 text-[9px] text-center font-medium group-hover:text-gray-400 transition-colors">Gerar criativo com IA</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Mini AIChat with project context
function ProjectChat({ projeto }: { projeto: Projeto }) {
  const nichoSuggestions: Record<string, string[]> = {
    'Pet': ['🐾 Produtos mais vendidos pet', '📣 Estratégia Meta Ads para pet', '💰 Calcular margem'],
    'Fitness': ['💪 Produtos fitness em alta', '📣 TikTok Ads para fitness', '💰 Calcular margem'],
    'Beleza': ['💄 Produtos beleza trending', '📣 Estratégia para beleza', '💰 Calcular margem'],
    'default': ['📦 Ver produtos em alta', '📣 Criar estratégia', '💰 Calcular margem'],
  };
  const suggestions = nichoSuggestions[projeto.nicho] || nichoSuggestions['default'];
  const welcomeMsg = `Olá! Estou aqui para ajudar com sua ${projeto.nome}. O que precisas hoje?`;

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#3F1DFF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">B</div>
        <div className="bg-[#0d0d0d] border border-[#252525] rounded-[14px] p-3 max-w-[85%]">
          <p className="text-white text-sm">{welcomeMsg}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map(s => (
          <span key={s} className="border border-[#333] text-gray-400 text-xs px-3 py-1.5 rounded-full cursor-pointer hover:border-[#3F1DFF]/40 hover:text-white transition-colors">
            {s}
          </span>
        ))}
      </div>
      <div className="border-t border-[#252525] pt-4">
        <AIChat />
      </div>
    </div>
  );
}
