import { useState, useEffect } from 'react';
import { Search, ExternalLink, Clock, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { suppliers } from '../data/suppliers';
import type { Supplier } from '../data/suppliers';
import { formatCurrency } from '../lib/utils';

type SortKey = 'price' | 'rating' | 'shipping';

const quickSearches = [
  'Fone Bluetooth',
  'Smartwatch',
  'Luminária LED',
  'Capa Phone',
  'Kit Maquiagem',
  'Suporte Celular',
];

function getShippingMin(days: string): number {
  return parseInt(days.split('-')[0], 10);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-[#FFBA26] fill-[#FFBA26]' : 'text-gray-600'}`}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function computeAutoBadges(list: Supplier[]): Record<string, string> {
  if (list.length === 0) return {};
  const minPrice = Math.min(...list.map((s) => s.pricePerUnit));
  const minShipping = Math.min(...list.map((s) => getShippingMin(s.shippingDays)));
  const maxRating = Math.max(...list.map((s) => s.rating));
  const result: Record<string, string> = {};
  let bestPriceAssigned = false;
  let fastShipAssigned = false;
  let topRatedAssigned = false;
  for (const s of list) {
    if (!bestPriceAssigned && s.pricePerUnit === minPrice) {
      result[s.id] = 'best-price';
      bestPriceAssigned = true;
    } else if (!fastShipAssigned && getShippingMin(s.shippingDays) === minShipping) {
      result[s.id] = 'fast-ship';
      fastShipAssigned = true;
    } else if (!topRatedAssigned && s.rating === maxRating) {
      result[s.id] = 'top-rated';
      topRatedAssigned = true;
    }
  }
  return result;
}

function SupplierCard({ supplier, autoBadge }: { supplier: Supplier; autoBadge?: string }) {
  const isVerified = supplier.badges.includes('Verified');
  return (
    <div className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 rounded-[16px] p-6 flex flex-col gap-4 transition-colors">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{supplier.flag}</span>
          <div>
            <p className="text-white font-semibold">{supplier.name}</p>
            <p className="text-gray-500 text-xs">{supplier.country}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {isVerified && <Badge variant="accent">✓ Verificado</Badge>}
          {autoBadge === 'best-price' && (
            <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#3F1DFF] text-white">
              💰 Melhor Preço
            </span>
          )}
          {autoBadge === 'fast-ship' && (
            <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-600 text-white">
              ⚡ Entrega Rápida
            </span>
          )}
          {autoBadge === 'top-rated' && (
            <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFBA26] text-[#0c0c0c]">
              ⭐ Mais Avaliado
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Preço/unidade</p>
          <p className="text-[#3F1DFF] font-bold text-xl">{formatCurrency(supplier.pricePerUnit)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Prazo de entrega</p>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-white font-medium">{supplier.shippingDays} dias</span>
          </div>
        </div>
      </div>

      <div>
        <StarRating rating={supplier.rating} />
        <p className="text-xs text-gray-500 mt-1">{supplier.reviews.toLocaleString()} avaliações</p>
      </div>

      <a href="#" target="_blank" rel="noopener noreferrer" className="mt-auto">
        <Button variant="primary" className="w-full flex items-center justify-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Acessar Fornecedor
        </Button>
      </a>
    </div>
  );
}

export function Fornecedores() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [searched, setSearched] = useState(!!searchParams.get('q'));
  const [displayedSuppliers, setDisplayedSuppliers] = useState<Supplier[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('price');

  const sortSuppliers = (list: Supplier[], key: SortKey): Supplier[] => {
    const sorted = [...list];
    if (key === 'price') sorted.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    if (key === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (key === 'shipping') sorted.sort((a, b) => getShippingMin(a.shippingDays) - getShippingMin(b.shippingDays));
    return sorted;
  };

  const handleSearch = () => {
    setSearched(true);
    setDisplayedSuppliers(sortSuppliers(suppliers, sortKey));
  };

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    setSearched(true);
    setDisplayedSuppliers(sortSuppliers(suppliers, sortKey));
  };

  useEffect(() => {
    if (searched) {
      setDisplayedSuppliers(sortSuppliers(displayedSuppliers, sortKey));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      setSearched(true);
      setDisplayedSuppliers(sortSuppliers(suppliers, sortKey));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoBadges = computeAutoBadges(displayedSuppliers);

  const sortButtons: { key: SortKey; label: string }[] = [
    { key: 'price', label: 'Menor Preço' },
    { key: 'rating', label: 'Melhor Avaliação' },
    { key: 'shipping', label: 'Entrega Mais Rápida' },
  ];

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Buscador de Fornecedores</h1>
        <p className="text-gray-400 mb-8">Encontre os melhores fornecedores para seus produtos</p>

        {/* Campo de busca */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Nome do produto ou URL do AliExpress..."
              className="w-full bg-[#141414] border border-[#252525] focus:border-[#3F1DFF]/60 rounded-[12px] pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
          <Button variant="primary" onClick={handleSearch} className="px-8">
            Buscar Fornecedores
          </Button>
        </div>

        {/* Estado inicial — chips */}
        {!searched && (
          <div>
            <p className="text-gray-400 text-sm mb-4">Pesquisas populares:</p>
            <div className="flex flex-wrap gap-3">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className="px-4 py-2 bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/60 rounded-[12px] text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultados */}
        {searched && (
          <>
            {/* Ordenação */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-gray-400 text-sm">Ordenar por:</span>
              {sortButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setSortKey(btn.key)}
                  className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-colors ${
                    sortKey === btn.key
                      ? 'bg-[#3F1DFF] text-white'
                      : 'bg-[#141414] border border-[#252525] text-gray-400 hover:text-white hover:border-[#3F1DFF]/40'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <p className="text-gray-400 text-sm mb-6">
              {displayedSuppliers.length} fornecedor(es) encontrado(s)
              {query && ` para "${query}"`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  autoBadge={autoBadges[supplier.id]}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
