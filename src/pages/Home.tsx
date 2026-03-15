import { useNavigate, Link } from 'react-router-dom';
import { Search, TrendingUp, Calculator, Eye, BarChart2, Bell } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { RadarProdutos } from '../components/RadarProdutos';
import { trending } from '../data/trending';

const tools = [
  {
    icon: Search,
    title: 'Buscador de Produtos',
    description: 'Encontre produtos lucrativos por texto ou imagem',
    route: '/buscador',
    emoji: '🔍',
  },
  {
    icon: TrendingUp,
    title: 'Produtos em Alta',
    description: 'Os produtos mais quentes do momento, curados pelo time',
    route: '/em-alta',
    emoji: '🔥',
  },
  {
    icon: Calculator,
    title: 'Calculadora de Preços',
    description: 'Calcule margens e preço de venda ideal automaticamente',
    route: '/calculadora',
    emoji: '💰',
  },
];

const comingSoonTools = [
  {
    icon: Eye,
    title: 'Spy de Anúncios',
    description: 'Espie os anúncios vencedores da sua concorrência em tempo real',
  },
  {
    icon: BarChart2,
    title: 'Analytics de Loja',
    description: 'Métricas avançadas e insights automáticos para sua loja',
  },
  {
    icon: Bell,
    title: 'Alertas de Tendência',
    description: 'Receba notificações quando um produto explodir no mercado',
  },
];

const tagVariantMap: Record<string, 'accent' | 'secondary' | 'ghost'> = {
  trending: 'accent',
  'high-volume': 'ghost',
  'high-margin': 'secondary',
};

const tagLabelMap: Record<string, string> = {
  trending: '🔥 Trending',
  'high-volume': '📦 Alto Volume',
  'high-margin': '💰 Alta Margem',
};

export function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero / Header de boas-vindas */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0c0c0c] to-[#3F1DFF]/5 rounded-[24px] mb-12 px-8">
        <p className="text-gray-400 text-sm uppercase tracking-widest font-medium mb-3">
          Bem-vindo de volta
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Olá, João 👋
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Suas ferramentas de dropshipping estão prontas. O que vamos fazer hoje?
        </p>
      </section>

      {/* Grid de ferramentas */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Ferramentas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.route}
                className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 rounded-[16px] p-8 flex flex-col gap-6 transition-colors group cursor-pointer"
                onClick={() => navigate(tool.route)}
              >
                <div className="w-16 h-16 rounded-[16px] bg-[#3F1DFF]/10 border border-[#3F1DFF]/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#3F1DFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                </div>
                <Link to={tool.route} onClick={(e) => e.stopPropagation()}>
                  <Button variant="primary" className="w-full">
                    Acessar
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* TASK 7 — Em Breve */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">🔒 Em Breve</h2>
          <Badge variant="secondary">Beta</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comingSoonTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="bg-[#141414] border border-[#252525] rounded-[16px] p-8 flex flex-col gap-6 opacity-50 cursor-not-allowed"
              >
                <div className="w-16 h-16 rounded-[16px] bg-[#252525] border border-[#333] flex items-center justify-center">
                  <Icon className="w-8 h-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                </div>
                <div className="w-full py-2 px-4 rounded-lg bg-[#252525] text-gray-600 text-sm text-center font-medium">
                  Em Breve
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TASK 5 — Radar de Produtos */}
      <RadarProdutos />

      {/* Produtos em Alta esta semana */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">🔥 Produtos em Alta esta semana</h2>
          <button
            onClick={() => navigate('/em-alta')}
            className="text-sm text-[#3F1DFF] hover:text-[#3217C7] font-medium transition-colors"
          >
            Ver todos →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trending.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 rounded-[16px] overflow-hidden transition-colors"
            >
              <div className="flex items-center gap-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-[12px] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
                    {product.name}
                  </p>
                  <Badge variant={tagVariantMap[product.tag] ?? 'ghost'}>
                    {tagLabelMap[product.tag] ?? product.tag}
                  </Badge>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Button
                  variant="ghost"
                  className="w-full text-sm py-2"
                  onClick={() => navigate('/em-alta')}
                >
                  Ver mais
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
