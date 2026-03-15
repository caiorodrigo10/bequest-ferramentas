import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ads } from '../data/ads';

export function AnuncioDetalhe() {
  const { id } = useParams();
  const ad = ads.find((a) => a.id === id) || ads[0];
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Layout>
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Criativo 50% */}
        <div className="flex-1">
          <div className="rounded-[16px] overflow-hidden bg-[#0a0a0a] aspect-video">
            {ad.video_url ? (
              <video src={ad.video_url} controls className="w-full h-full object-cover" />
            ) : (
              <img src={ad.thumbnail ?? ''} alt={ad.shop_name} className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Painel direito 50% */}
        <div className="flex-1">
          {/* Header da loja */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#3F1DFF]/20 flex items-center justify-center font-bold text-[#3F1DFF]">
              {ad.shop_name.charAt(0)}
            </div>
            <div>
              <h2 className="text-white font-bold">{ad.shop_name}</h2>
              <p className="text-gray-400 text-sm">{ad.active_ads} ads ativos</p>
            </div>
          </div>

          {/* Abas */}
          <div className="flex gap-0 border-b border-[#252525] mb-4">
            {['overview', 'transcricao'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-[#3F1DFF] -mb-px'
                    : 'text-gray-400'
                }`}
              >
                {tab === 'overview' ? 'Visão Geral' : 'Transcrição'}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Ads Details */}
              <div className="bg-[#141414] border border-[#252525] rounded-[12px] p-4">
                <h3 className="text-white text-sm font-semibold mb-3">Detalhes do Anúncio</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="text-green-400 font-medium">🟢 {ad.status || 'Ativo'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Publicado em</p>
                    <p className="text-white">{ad.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tipo de mídia</p>
                    <p className="text-white capitalize">{ad.media_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Link do produto</p>
                    <a
                      href={ad.product_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3F1DFF] hover:underline truncate block"
                    >
                      Ver produto ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Shop Details */}
              <div className="bg-[#141414] border border-[#252525] rounded-[12px] p-4">
                <h3 className="text-white text-sm font-semibold mb-3">Dados da Loja</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Ads ativos</p>
                    <p className="text-white font-bold">{ad.active_ads}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Visitas mensais</p>
                    <p className="text-white font-bold flex items-center gap-1">
                      🔒 <span className="text-gray-500">Premium</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Receita estimada</p>
                    <p className="text-white font-bold flex items-center gap-1">
                      🔒 <span className="text-gray-500">Premium</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Outros anúncios */}
              <div className="bg-[#141414] border border-[#252525] rounded-[12px] p-4">
                <h3 className="text-white text-sm font-semibold mb-3">Outros anúncios desta loja</h3>
                <div className="grid grid-cols-3 gap-2">
                  {ads
                    .filter((a) => a.id !== ad.id)
                    .slice(0, 3)
                    .map((a) => (
                      <a
                        key={a.id}
                        href={`/anuncios/${a.id}`}
                        className="aspect-square rounded-lg overflow-hidden border border-[#252525] hover:border-[#3F1DFF]/40 transition-colors"
                      >
                        <img
                          src={a.thumbnail ?? ''}
                          alt={a.shop_name}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ))}
                </div>
              </div>

              {/* CTA */}
              <a href={`/fornecedores?q=${encodeURIComponent(ad.shop_name)}`}>
                <button className="w-full bg-[#3F1DFF] hover:bg-[#3217C7] text-white font-semibold py-3 rounded-[12px] transition-colors">
                  🔍 Buscar Fornecedor
                </button>
              </a>
            </div>
          )}

          {activeTab === 'transcricao' && (
            <div className="bg-[#141414] border border-[#252525] rounded-[12px] p-4">
              <p className="text-gray-400 text-sm italic">
                Transcrição disponível apenas para vídeos.{' '}
                {ad.media_type === 'video' ? 'Processando...' : 'Este anúncio é uma imagem.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
