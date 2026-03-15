import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type MessageRole = 'user' | 'assistant';

interface ToolCard {
  type: 'products' | 'strategy' | 'calculator' | 'creative';
  data?: unknown;
}

interface Message {
  id: string;
  role: MessageRole;
  text: string;
  toolCard?: ToolCard;
  actions?: { label: string; href: string }[];
}

// Mock de respostas baseadas em keywords
function getMockResponse(input: string): Omit<Message, 'id' | 'role'> {
  const lower = input.toLowerCase();

  if (lower.includes('pet') || lower.includes('animal')) {
    return {
      text: '🐾 Ótima escolha! O mercado pet brasileiro cresceu **27% em 2024** e ainda está em expansão. Baseado nos anúncios desta semana, esses produtos estão dominando o feed:',
      toolCard: { type: 'products' },
      actions: [
        { label: '📁 Criar projeto Pet', href: '/projetos/novo' },
        { label: '📣 Ver anúncios', href: '/em-alta' },
        { label: '💰 Calcular margem', href: '/calculadora' },
      ],
    };
  }
  if (lower.includes('criativ') || lower.includes('banner') || lower.includes('imagem')) {
    return {
      text: '🎨 Gerando criativo para seu produto com base nos anúncios vencedores desta semana...',
      toolCard: { type: 'creative' },
      actions: [{ label: '💾 Salvar criativo', href: '#' }, { label: '🔄 Gerar outro', href: '#' }],
    };
  }
  if (lower.includes('margem') || lower.includes('calcul') || lower.includes('lucro')) {
    return {
      text: '💰 Vou te ajudar a calcular a margem. Insira os dados abaixo:',
      toolCard: { type: 'calculator' },
      actions: [{ label: '📊 Ver calculadora completa', href: '/calculadora' }],
    };
  }
  if (lower.includes('estratég') || lower.includes('marketing') || lower.includes('vender')) {
    return {
      text: '🎯 Aqui está uma estratégia baseada no que está funcionando para lojas similares esta semana:',
      toolCard: { type: 'strategy' },
      actions: [
        { label: '📁 Criar projeto', href: '/projetos/novo' },
        { label: '📣 Ver anúncios vencedores', href: '/em-alta' },
      ],
    };
  }
  return {
    text: `Entendi! Para te ajudar melhor com **"${input}"**, posso analisar os anúncios mais performáticos do momento, sugerir produtos com alta margem, ou montar uma estratégia personalizada. O que prefere?`,
    actions: [
      { label: '🔍 Analisar anúncios', href: '/em-alta' },
      { label: '📦 Ver produtos em alta', href: '/em-alta' },
      { label: '📁 Criar projeto', href: '/projetos/novo' },
    ],
  };
}

// Tool Cards visuais
function ProductsToolCard() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {[
        { name: 'Head Protection Backpack', price: '$19.98', img: '/images/products/sr_02_head_protection_backpack.jpg' },
        { name: 'PurrWhirl Cat Toy', price: '$39.95', img: '/images/products/sr_08_purrwhirl_interactive_cat_toy_.jpg' },
        { name: 'Fisher-Price Puppy', price: '$36.82', img: '/images/products/sr_03_fisher_price_rires_et_veil_pup.jpg' },
      ].map((p) => (
        <div key={p.name} className="bg-[#1a1a1a] border border-[#333] rounded-[10px] overflow-hidden">
          <img src={p.img} alt={p.name} className="w-full aspect-square object-cover" />
          <div className="p-2">
            <p className="text-white text-[10px] font-medium leading-tight line-clamp-2">{p.name}</p>
            <p className="text-[#3F1DFF] text-[10px] font-bold mt-1">{p.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategyToolCard() {
  return (
    <div className="mt-3 space-y-2">
      {[
        { icon: '🎯', title: 'Aquisição', desc: 'Meta Ads com objetivo de conversão, público 25-45 anos, interesse em pets' },
        { icon: '📦', title: 'Produto', desc: 'Foco em 1-2 produtos com margem >60%. Ticket médio R$80-150.' },
        { icon: '📈', title: 'Escala', desc: 'Testar 3 criativos por semana. Dobrar budget no melhor ROAS após 3 dias.' },
      ].map((item) => (
        <div key={item.title} className="flex items-start gap-3 bg-[#1a1a1a] border border-[#333] rounded-[10px] p-3">
          <span className="text-xl">{item.icon}</span>
          <div>
            <p className="text-white text-xs font-semibold">{item.title}</p>
            <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CalculatorToolCard() {
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');
  const margin = cost && price ? Math.round(((Number(price) - Number(cost)) / Number(price)) * 100) : null;
  return (
    <div className="mt-3 bg-[#1a1a1a] border border-[#333] rounded-[10px] p-4">
      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <label className="text-gray-500 text-xs mb-1 block">Custo do produto</label>
          <input value={cost} onChange={e => setCost(e.target.value)} placeholder="R$0" className="w-full bg-[#252525] border border-[#333] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#3F1DFF]" />
        </div>
        <div className="flex-1">
          <label className="text-gray-500 text-xs mb-1 block">Preço de venda</label>
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="R$0" className="w-full bg-[#252525] border border-[#333] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#3F1DFF]" />
        </div>
      </div>
      {margin !== null && (
        <div className={`text-center py-2 rounded-lg ${margin > 50 ? 'bg-green-500/10 text-green-400' : margin > 30 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
          <p className="text-2xl font-bold">{margin}%</p>
          <p className="text-xs mt-0.5">{margin > 50 ? '✅ Margem excelente' : margin > 30 ? '⚠️ Margem aceitável' : '❌ Margem baixa'}</p>
        </div>
      )}
    </div>
  );
}

function CreativeToolCard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 2000); return () => clearTimeout(t); }, []);
  return (
    <div className="mt-3 bg-[#1a1a1a] border border-[#333] rounded-[10px] overflow-hidden aspect-video relative flex items-center justify-center">
      {loading ? (
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#3F1DFF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Gerando criativo com IA...</p>
        </div>
      ) : (
        <img src="/images/products/sr_08_purrwhirl_interactive_cat_toy_.jpg" alt="criativo" className="w-full h-full object-cover" />
      )}
      {!loading && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3"><p className="text-white text-xs font-semibold">✨ Criativo gerado com IA</p></div>}
    </div>
  );
}

const SUGGESTIONS = ['Quero vender para pets 🐾', 'Criar estratégia de marketing 🎯', 'Calcular margem de lucro 💰', 'Gerar criativo para anúncio 🎨'];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsOpen(true);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    setIsTyping(false);
    const response = getMockResponse(text);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', ...response }]);
  };

  return (
    <div className="bg-[#0d0d0d] border border-[#252525] rounded-[20px] overflow-hidden mb-16">
      {/* Chat messages (expandem ao usar) */}
      {isOpen && (
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 border-b border-[#252525]">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#3F1DFF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">B</div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#3F1DFF]/20 border border-[#3F1DFF]/30' : 'bg-[#141414] border border-[#252525]'} rounded-[14px] p-3`}>
                <p className="text-white text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                {msg.toolCard?.type === 'products' && <ProductsToolCard />}
                {msg.toolCard?.type === 'strategy' && <StrategyToolCard />}
                {msg.toolCard?.type === 'calculator' && <CalculatorToolCard />}
                {msg.toolCard?.type === 'creative' && <CreativeToolCard />}
                {msg.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.actions.map(a => (
                      <button key={a.label} onClick={() => navigate(a.href)} className="bg-[#3F1DFF]/10 hover:bg-[#3F1DFF]/20 text-[#3F1DFF] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border border-[#3F1DFF]/20">
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-[#3F1DFF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">B</div>
              <div className="bg-[#141414] border border-[#252525] rounded-[14px] p-3 flex items-center gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input area */}
      <div className="p-4">
        {!isOpen && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#3F1DFF]" />
              <span className="text-white font-semibold text-sm">Assistente Bequest</span>
              <span className="bg-[#3F1DFF]/10 text-[#3F1DFF] text-[10px] font-bold px-2 py-0.5 rounded-full">IA</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)} className="border border-[#333] text-gray-400 hover:text-white hover:border-[#3F1DFF]/40 text-xs px-3 py-1.5 rounded-full transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="O que você quer construir hoje?"
              className="w-full bg-[#141414] border border-[#333] focus:border-[#3F1DFF] rounded-[14px] px-4 py-3 text-white text-sm outline-none resize-none transition-colors placeholder:text-gray-600"
              rows={1}
            />
          </div>
          <button onClick={() => sendMessage(input)} disabled={!input.trim()} className="bg-[#3F1DFF] hover:bg-[#3217C7] disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 rounded-[14px] transition-colors flex-shrink-0">
            <Send className="w-4 h-4" />
          </button>
          {isOpen && (
            <button onClick={() => { setIsOpen(false); setMessages([]); }} className="text-gray-500 hover:text-white p-3 rounded-[14px] transition-colors flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
