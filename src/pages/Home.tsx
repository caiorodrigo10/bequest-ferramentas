import { Link } from 'react-router-dom';
import { Calculator, Package, Search, TrendingUp, Store } from 'lucide-react';
import { Layout } from '../components/Layout';
import { RadarProdutos } from '../components/RadarProdutos';
import { ads } from '../data/ads';
import { radarProducts } from '../data/radar';
import type { AdItem } from '../data/ads';

// ─── AdCard ────────────────────────────────────────────────────────────────
function AdCard({ ad }: { ad: AdItem }) {
  return (
    <div className="bg-[#141414] border border-[#252525] rounded-[16px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-[#252525]">
        <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {ad.shop_name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold truncate">{ad.shop_name}</p>
          <p className="text-gray-500 text-[10px]">{ad.active_ads} active ads</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded">Meta</span>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 px-3 py-2 text-[10px]">
        <span className="text-green-400 flex items-center gap-1">● {ad.status || '0d Active'}</span>
        <span className="text-gray-500">{ad.date}</span>
      </div>

      {/* Criativo */}
      <div className="relative aspect-video bg-[#0a0a0a] overflow-hidden">
        {ad.video_url ? (
          <video src={ad.video_url} className="w-full h-full object-cover" muted loop playsInline />
        ) : (
          <img src={ad.thumbnail ?? ''} alt={ad.shop_name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#252525]">
        {ad.product_url && (
          <p className="text-gray-500 text-[10px] mb-2 truncate">
            <span className="text-gray-600">Ads link </span>
            <a href={ad.product_url} target="_blank" rel="noreferrer" className="text-[#3F1DFF] hover:underline">
              {ad.product_url.replace('https://', '').slice(0, 35)}...
            </a>
          </p>
        )}
        <Link to={`/anuncios/${ad.id}`}>
          <button className="w-full bg-[#3F1DFF]/10 hover:bg-[#3F1DFF]/20 text-[#3F1DFF] text-xs font-semibold py-2 rounded-lg transition-colors">
            Ver análise
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── DayCarousel ────────────────────────────────────────────────────────────
function DayCarousel() {
  const today = new Date();
  const days: { label: string; date: Date; isFuture: boolean; isToday: boolean }[] = [];

  for (let i = -5; i <= 2; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const isToday = i === 0;
    const isFuture = i > 0;
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const label = isToday ? 'Hoje' : `${dayNames[d.getDay()]} ${d.getDate()}`;
    days.push({ label, date: d, isFuture, isToday });
  }

  return (
    <div className="mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {days.map((day, i) => {
          const product = radarProducts[i % radarProducts.length];
          return (
            <div
              key={i}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer`}
            >
              <div
                className={`w-[72px] h-[72px] rounded-[12px] overflow-hidden flex items-center justify-center
                  ${day.isToday ? 'border-2 border-[#3F1DFF] bg-[#3F1DFF]/10' : 'border border-[#252525] bg-[#141414]'}
                `}
              >
                {day.isFuture ? (
                  <span className="text-gray-600 text-lg font-bold">{day.date.getDate()}</span>
                ) : (
                  <img
                    src={product.imagePath}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className={`text-[10px] font-medium ${day.isToday ? 'text-[#3F1DFF]' : 'text-gray-500'}`}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── QuickTools ─────────────────────────────────────────────────────────────
const quickTools = [
  { icon: Calculator, label: 'Calculadora', to: '/calculadora' },
  { icon: Search, label: 'Buscador', to: '/buscador' },
  { icon: TrendingUp, label: 'Em Alta', to: '/em-alta' },
  { icon: Package, label: 'Fornecedores', to: '/fornecedores' },
  { icon: Store, label: 'Lojas', to: '/lojas' },
];

// ─── Home ────────────────────────────────────────────────────────────────────
export function Home() {
  // Greeting by time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <Layout>
      <div className="flex gap-6">
        {/* ── Coluna principal ~70% ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Greeting */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">{greeting}</p>
            <h1 className="text-3xl font-bold text-white">Olá, bem-vindo de volta 👋</h1>
          </div>

          {/* Carrossel de dias */}
          <DayCarousel />

          {/* Radar de Produtos */}
          <RadarProdutos />

          {/* Ad Cards */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">📢 Anúncios do Dia</h2>
              <span className="text-gray-500 text-xs">{ads.length} anúncios</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ads.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Painel direito ~280px ─────────────────────────────────── */}
        <div className="w-72 flex-shrink-0 hidden lg:block">
          {/* Depoimento */}
          <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-4 mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-3">Resultado da semana</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#3F1DFF]/20 flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Marcos S.</p>
                <p className="text-gray-500 text-[10px]">há 2 dias</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "Seguindo o método, fiz R$ 4.200 em 7 dias com produto de pet. Obrigado pelo conteúdo!"
            </p>
          </div>

          {/* Acesso rápido */}
          <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-4">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-3">Ferramentas</p>
            <div className="flex flex-col gap-1">
              {quickTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#252525] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#3F1DFF]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#3F1DFF]" />
                    </div>
                    <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors">
                      {tool.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
