import { useState } from 'react';
import { Store, Lock } from 'lucide-react';
import { Layout } from '../components/Layout';
import { shops } from '../data/shops';
import type { Shop } from '../data/shops';

type Pill = 'todos' | 'pepitas' | 'mono-product' | 'dropshipping' | 'meta-winner';

const pills: { id: Pill; label: string }[] = [
  { id: 'pepitas', label: '💎 Últimas Pepitas' },
  { id: 'mono-product', label: '🔥 Mono-produto Viral' },
  { id: 'dropshipping', label: '🟩 Dropshipping' },
  { id: 'meta-winner', label: '💜 Meta Ads Winner' },
  { id: 'todos', label: 'Todos' },
];

function GrowthBadge({ value, label }: { value: number; label: string }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
        isPositive
          ? 'bg-green-500/10 text-green-400'
          : 'bg-red-500/10 text-red-400'
      }`}
    >
      {isPositive ? '+' : ''}{value}% {isPositive ? '↑' : '↓'} {label}
    </span>
  );
}

function ShopRow({ shop }: { shop: Shop }) {
  return (
    <tr className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
      {/* Loja */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3F1DFF]/20 flex items-center justify-center font-bold text-[#3F1DFF] text-sm flex-shrink-0">
            {shop.name.charAt(0)}
          </div>
          <div>
            <p className="text-white text-sm font-bold">{shop.name}</p>
            <p className="text-[#3F1DFF] text-xs">{shop.domain}</p>
            <p className="text-gray-500 text-xs">desde {shop.createdAt}</p>
          </div>
        </div>
      </td>

      {/* Receita/dia */}
      <td className="px-4 py-3">
        <p className="text-white font-bold text-sm">{shop.dailyRevenue}</p>
      </td>

      {/* Visitas mensais */}
      <td className="px-4 py-3">
        <p className="text-white font-bold text-sm mb-1">{shop.monthlyVisits}</p>
        <div className="flex flex-col gap-0.5">
          <GrowthBadge value={shop.growth1m} label="1M" />
          <GrowthBadge value={shop.growth3m} label="3M" />
        </div>
      </td>

      {/* Ads Meta ativos */}
      <td className="px-4 py-3">
        <div>
          <p className="text-white font-bold text-sm">+{shop.activeMetaAds}</p>
          <p className="text-gray-500 text-xs">({shop.inactiveMetaAds} inativos)</p>
          <div className="flex gap-1 mt-1">
            {shop.thumbnails.slice(0, 2).map((thumb, i) => (
              <img
                key={i}
                src={thumb}
                alt=""
                className="w-7 h-7 object-cover rounded border border-[#252525]"
              />
            ))}
          </div>
        </div>
      </td>

      {/* Produtos */}
      <td className="px-4 py-3">
        <p className="text-white font-bold text-sm mb-1">{shop.productCount}</p>
        <div className="flex gap-1">
          {shop.thumbnails.map((thumb, i) => (
            <img
              key={i}
              src={thumb}
              alt=""
              className="w-7 h-7 object-cover rounded border border-[#252525]"
            />
          ))}
        </div>
      </td>
    </tr>
  );
}

function FilterSidebar() {
  const lockedItem = (label: string) => (
    <div key={label} className="flex items-center justify-between px-3 py-2 rounded-lg opacity-50 cursor-not-allowed">
      <span className="text-gray-400 text-xs">{label}</span>
      <Lock className="w-3 h-3 text-gray-600" />
    </div>
  );

  return (
    <div className="w-60 flex-shrink-0">
      {/* Por Performance */}
      <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-4 mb-3">
        <p className="text-gray-400 text-[10px] uppercase tracking-wide mb-2">Por Performance</p>
        <div className="space-y-0.5">
          {['Receita diária', 'Visitas mensais', 'Crescimento'].map(lockedItem)}
        </div>
      </div>

      {/* Por Info da Loja */}
      <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-4 mb-3">
        <p className="text-gray-400 text-[10px] uppercase tracking-wide mb-2">Por Info da Loja</p>
        <div className="space-y-0.5">
          {['Categoria', 'País', 'Apps Shopify'].map(lockedItem)}
        </div>
      </div>

      {/* Por Anúncios */}
      <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-4">
        <p className="text-gray-400 text-[10px] uppercase tracking-wide mb-2">Por Anúncios</p>
        <div className="space-y-0.5">
          {['Total ads ativos', 'Total ads'].map(lockedItem)}
        </div>
      </div>
    </div>
  );
}

export function Lojas() {
  const [activePill, setActivePill] = useState<Pill>('todos');

  const filtered = shops.filter((shop) => {
    if (activePill === 'todos' || activePill === 'pepitas' || activePill === 'meta-winner') return true;
    return shop.category === activePill;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[12px] bg-[#3F1DFF]/10 flex items-center justify-center">
          <Store className="w-5 h-5 text-[#3F1DFF]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Lojas em Tendência</h1>
            <span className="bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">NOVO</span>
          </div>
          <p className="text-gray-400 text-sm">Lojas em alta com anúncios vencedores no Meta</p>
        </div>
      </div>

      {/* Quick pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {pills.map((pill) => (
          <button
            key={pill.id}
            onClick={() => setActivePill(pill.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              activePill === pill.id
                ? 'bg-[#3F1DFF] text-white'
                : 'bg-[#141414] border border-[#252525] text-gray-400 hover:text-white hover:border-[#3F1DFF]/40'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Layout: sidebar + tabela */}
      <div className="flex gap-5">
        <FilterSidebar />

        {/* Tabela */}
        <div className="flex-1 min-w-0 bg-[#141414] border border-[#252525] rounded-[16px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252525]">
                {['Loja', 'Receita/dia', 'Visitas mensais', 'Ads Meta ativos', 'Produtos'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((shop) => (
                <ShopRow key={shop.id} shop={shop} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
