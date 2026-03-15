import { useState, useEffect, useRef } from 'react';
import { Search, Upload, ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { formatCurrency, formatNumber } from '../lib/utils';

type Tab = 'texto' | 'imagem' | 'em-alta';

const categories = ['Todos', 'Electronics', 'Home', 'Beauty', 'Sports', 'Fashion'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-[#FFBA26] fill-[#FFBA26]' : 'text-gray-600'}`}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#252525] rounded-[16px] overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#252525]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#252525] rounded w-3/4" />
        <div className="h-4 bg-[#252525] rounded w-1/2" />
        <div className="h-6 bg-[#252525] rounded w-1/3" />
        <div className="h-10 bg-[#252525] rounded-[12px]" />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/40 rounded-[16px] overflow-hidden transition-colors flex flex-col">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{product.name}</p>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between">
          <span className="text-[#3F1DFF] font-bold text-lg">{formatCurrency(product.price)}</span>
          <Badge variant="ghost">{formatNumber(product.orders)} pedidos</Badge>
        </div>
        <a href={product.aliexpressUrl} target="_blank" rel="noopener noreferrer" className="mt-auto">
          <Button variant="ghost" className="w-full text-sm py-2 flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Ver no AliExpress
          </Button>
        </a>
      </div>
    </div>
  );
}

export function Buscador() {
  const [tab, setTab] = useState<Tab>('texto');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      let filtered = products;
      if (query.trim()) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (category !== 'Todos') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (minPrice) {
        filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
      }
      if (minRating) {
        filtered = filtered.filter((p) => p.rating >= parseFloat(minRating));
      }
      setResults(filtered);
      setLoading(false);
    }, 800);
  };

  const handleImageSearch = () => {
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      setResults(products.slice(0, 8));
      setLoading(false);
    }, 800);
  };

  const handleFileDrop = (file: File) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFileDrop(file);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'texto', label: 'Por Texto' },
    { key: 'imagem', label: 'Por Imagem' },
    { key: 'em-alta', label: 'Em Alta' },
  ];

  useEffect(() => {
    if (tab === 'em-alta') {
      setLoading(true);
      setSearched(true);
      setTimeout(() => {
        setResults(products);
        setLoading(false);
      }, 800);
    } else {
      setResults([]);
      setSearched(false);
    }
  }, [tab]);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Buscador de Produtos</h1>
        <p className="text-gray-400 mb-8">Encontre produtos lucrativos para o seu dropshipping</p>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#252525] mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                tab === t.key
                  ? 'text-white border-b-2 border-[#3F1DFF] -mb-px'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Por Texto */}
        {tab === 'texto' && (
          <div className="mb-8">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ex: fone bluetooth, smartwatch..."
                  className="w-full bg-[#141414] border border-[#252525] focus:border-[#3F1DFF]/60 rounded-[12px] pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>
              <Button variant="primary" onClick={handleSearch} className="px-8">
                Buscar
              </Button>
            </div>

            {/* Filtros colapsáveis */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
            >
              {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Filtros avançados
            </button>

            {filtersOpen && (
              <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-[#252525] rounded-[10px] px-3 py-2.5 text-white text-sm outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Faixa de Preço (USD)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min"
                      className="w-1/2 bg-[#1c1c1c] border border-[#252525] rounded-[10px] px-3 py-2.5 text-white text-sm outline-none"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="w-1/2 bg-[#1c1c1c] border border-[#252525] rounded-[10px] px-3 py-2.5 text-white text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Avaliação mínima</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-[#252525] rounded-[10px] px-3 py-2.5 text-white text-sm outline-none"
                  >
                    <option value="">Qualquer</option>
                    <option value="3">3+ estrelas</option>
                    <option value="4">4+ estrelas</option>
                    <option value="4.5">4.5+ estrelas</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Por Imagem */}
        {tab === 'imagem' && (
          <div className="mb-8">
            {!imagePreview ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[16px] p-16 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? 'border-[#3F1DFF] bg-[#3F1DFF]/5' : 'border-[#3F1DFF]/40 hover:border-[#3F1DFF]/70'
                }`}
              >
                <Upload className="w-12 h-12 text-[#3F1DFF]/60 mb-4" />
                <p className="text-white font-semibold mb-1">Arraste uma foto aqui</p>
                <p className="text-gray-400 text-sm">ou clique para selecionar</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileDrop(file);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-[16px] border border-[#252525]"
                  />
                  <button
                    onClick={() => { setImagePreview(null); setImageFile(null); setResults([]); setSearched(false); }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-white font-semibold">{imageFile?.name}</p>
                  <p className="text-gray-400 text-sm">Imagem carregada. Pronto para buscar produtos similares.</p>
                  <Button variant="primary" onClick={handleImageSearch}>
                    Buscar produtos similares
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resultados */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Search className="w-16 h-16 text-gray-600" />
            <p className="text-gray-400 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-600 text-sm">Tente outros termos ou remova os filtros</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="text-gray-400 text-sm mb-4">{results.length} produto(s) encontrado(s)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
