import { useState } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { trending } from '../data/trending';
import type { TrendingProduct } from '../data/trending';
import { ads } from '../data/ads';
import type { AdItem } from '../data/ads';
import { formatCurrency } from '../lib/utils';

// Curated filter pills (show all products)
const curatedPills = ['Todos', '🔥 Em Alta', '✅ Pronto pra Escalar', '💎 Alta Margem', '🌎 Global', '📦 Alto Volume'];

// Extract unique niches from real data
const nichesPills = [...new Set(trending.map((p) => p.niche))];

const tagColors: Record<string, string> = {
  trending: 'bg-[#3F1DFF] text-white',
  'high-volume': 'bg-blue-600 text-white',
  'high-margin': 'bg-green-600 text-white',
};

const tagLabels: Record<string, string> = {
  trending: '🔥 Trending',
  'high-volume': '📦 Alto Volume',
  'high-margin': '💰 Alta Margem',
};

function HeroCard({ product }: { product: TrendingProduct }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#141414] border border-[#252525] rounded-[24px] overflow-hidden mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[40%] flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="flex-1 p-8 flex flex-col justify-center gap-4">
          <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full w-fit ${tagColors[product.tag]}`}>
            {tagLabels[product.tag]}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{product.name}</h2>
          {product.shop && (
            <p className="text-gray-500 text-sm">{product.shop}</p>
          )}
          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <Sparkles className="w-4 h-4 text-[#FFBA26] flex-shrink-0 mt-0.5" />
            <span>{product.whyTrending}</span>
          </div>
          {/* Expert Note block */}
          {product.expertNote && (
            <div className="bg-[#1a1a1a] border-l-2 border-[#3F1DFF] p-4 rounded-r-lg mt-3">
              <p className="text-gray-300 text-sm italic">"{product.expertNote}"</p>
              <span className="text-gray-500 text-xs mt-1 block">— Expert Bequest</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Custo estimado:</span>
            <span className="text-[#3F1DFF] font-bold text-xl">{formatCurrency(product.costEstimate)}</span>
            <span className="text-green-400 text-xs ml-2">↑</span>
          </div>
          <div className="flex gap-3 flex-wrap mt-2">
            <a href={product.aliexpressUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver no AliExpress
              </Button>
            </a>
            <Button
              variant="ghost"
              onClick={() => navigate(`/fornecedores?q=${encodeURIComponent(product.name)}`)}
            >
              Buscar Fornecedores
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: TrendingProduct }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 rounded-[16px] overflow-hidden transition-colors flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 left-3 inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full ${tagColors[product.tag]}`}>
          {tagLabels[product.tag]}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{product.name}</p>
        {product.shop && (
          <p className="text-gray-500 text-xs">{product.shop}</p>
        )}
        <span className="text-green-400 text-xs">🟢 Ativo</span>
        <p className="text-gray-500 text-xs">{product.niche}</p>
        <div className="flex items-center mt-1">
          <span className="text-[#3F1DFF] font-bold">{formatCurrency(product.costEstimate)}</span>
          <span className="text-green-400 text-xs ml-2">↑</span>
        </div>
        <div className="flex gap-2 flex-wrap mt-auto pt-2">
          <a href={product.aliexpressUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="ghost" className="w-full text-xs py-2 flex items-center justify-center gap-1">
              <ExternalLink className="w-3 h-3" />
              AliExpress
            </Button>
          </a>
          <Button
            variant="ghost"
            className="flex-1 text-xs py-2"
            onClick={() => navigate(`/fornecedores?q=${encodeURIComponent(product.name)}`)}
          >
            Fornecedores
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdCard({ ad }: { ad: AdItem }) {
  return (
    <div className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 rounded-[16px] overflow-hidden transition-colors flex flex-col">
      {/* Media */}
      <div className="aspect-video overflow-hidden bg-[#0c0c0c] relative">
        {ad.mediaType === 'video' && ad.videoPath ? (
          <video
            src={ad.videoPath}
            className="w-full h-full object-cover"
            controls
            muted
            playsInline
          />
        ) : ad.thumbnailPath ? (
          <img
            src={ad.thumbnailPath}
            alt={ad.shopName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            Sem mídia
          </div>
        )}
        {/* Media type badge */}
        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 text-gray-300">
          {ad.mediaType === 'video' ? '🎬 Vídeo' : '🖼️ Imagem'}
        </span>
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-white font-semibold text-sm">{ad.shopName}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-green-400 text-xs">🟢 {ad.status}</span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs">{ad.activeAds} anúncios ativos</span>
        </div>
        <p className="text-gray-600 text-xs">{ad.date}</p>
        <a
          href={ad.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-2"
        >
          <Button variant="ghost" className="w-full text-xs py-2 flex items-center justify-center gap-1">
            <ExternalLink className="w-3 h-3" />
            Ver Produto
          </Button>
        </a>
      </div>
    </div>
  );
}

export function EmAlta() {
  const [activePill, setActivePill] = useState('Todos');

  // Determine if the active pill is curated or niche-based
  const isCurated = curatedPills.includes(activePill);

  const filtered = isCurated
    ? trending
    : trending.filter((p) => p.niche === activePill);

  const hero = filtered[0];
  const rest = filtered.slice(1);

  const dateStr = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Layout>
      <div className="py-8">
        {/* Header editorial */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Seleção da Semana — {dateStr}
            </h1>
            <Badge variant="secondary">Atualizado semanalmente</Badge>
          </div>
          <p className="text-gray-400">Os produtos mais quentes do momento, curados pelo time Bequest</p>
        </div>

        {/* Quick Filter Pills — TASK 2 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Curated pills */}
          {curatedPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setActivePill(pill)}
              className={
                activePill === pill
                  ? 'bg-[#3F1DFF] text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap border border-[#3F1DFF]'
                  : 'border border-[#333] text-gray-400 rounded-full px-4 py-2 text-sm whitespace-nowrap hover:text-white transition-colors cursor-pointer'
              }
            >
              {pill}
            </button>
          ))}
          {/* Niche pills */}
          {nichesPills.map((niche) => (
            <button
              key={niche}
              onClick={() => setActivePill(niche)}
              className={
                activePill === niche
                  ? 'bg-[#3F1DFF] text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap border border-[#3F1DFF]'
                  : 'border border-[#333] text-gray-400 rounded-full px-4 py-2 text-sm whitespace-nowrap hover:text-white transition-colors cursor-pointer'
              }
            >
              {niche}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Nenhum produto neste nicho.</div>
        ) : (
          <>
            {/* Card Hero */}
            {hero && <HeroCard product={hero} />}

            {/* Grid de cards menores */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* TASK 6 — Anúncios Vencedores */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">📣 Anúncios Vencedores</h2>
            <Badge variant="secondary">Meta Ads</Badge>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            Anúncios ativos detectados no Meta com alto volume — aprenda com os melhores criativos da semana.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
