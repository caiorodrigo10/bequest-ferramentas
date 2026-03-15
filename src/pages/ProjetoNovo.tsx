import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import type { Projeto } from '../data/projetos';

interface WizardData {
  tipo?: string;
  nicho?: string;
  mercado?: string;
  publico?: string;
  estrategia?: string;
  meta?: string;
  nome?: string;
}

interface StepMessage {
  text: string;
  visible: boolean;
}

const TOTAL_STEPS = 7;

export function ProjetoNovo() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({});
  const [freeInput, setFreeInput] = useState('');
  const [nomeInput, setNomeInput] = useState('');
  const [msgVisible, setMsgVisible] = useState(false);

  // Animate message on step change
  useEffect(() => {
    setMsgVisible(false);
    const t = setTimeout(() => setMsgVisible(true), 400);
    return () => clearTimeout(t);
  }, [step]);

  const choose = (key: keyof WizardData, value: string) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    // Skip nicho step if "geral"
    if (key === 'tipo' && value === 'Loja Geral') {
      setStep(3);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const choosePublico = (value: string) => {
    setData(prev => ({ ...prev, publico: value }));
    setFreeInput('');
    setStep(5);
  };

  const submitPublicoFree = () => {
    if (!freeInput.trim()) return;
    setData(prev => ({ ...prev, publico: freeInput.trim() }));
    setFreeInput('');
    setStep(5);
  };

  const createProject = () => {
    if (!nomeInput.trim()) return;
    const newProj: Projeto = {
      id: Date.now().toString(),
      nome: nomeInput.trim(),
      emoji: getEmoji(data.nicho || data.tipo || ''),
      tipo: data.tipo === 'Loja Nichada' ? 'nichada' : 'geral',
      mercado: data.mercado?.includes('Nacional') ? 'nacional' : 'global',
      nicho: data.nicho || data.tipo || 'Geral',
      publicoAlvo: data.publico || '',
      estrategia: data.estrategia ? [data.estrategia] : [],
      meta: data.meta || '',
      setupPercent: 0,
      criadoEm: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    const existing = JSON.parse(localStorage.getItem('bequest_projetos') || '[]') as Projeto[];
    localStorage.setItem('bequest_projetos', JSON.stringify([...existing, newProj]));
    navigate('/projetos');
  };

  function getEmoji(nicho: string): string {
    const map: Record<string, string> = {
      'Pet': '🐾', 'Fitness': '💪', 'Beleza': '💄', 'Kids': '👶',
      'Tech': '💻', 'Casa': '🏠', 'Outro': '✍️', 'Loja Geral': '🛒',
    };
    return map[nicho] || '🏪';
  }

  const stepMessages: Record<number, string> = {
    1: 'Olá! Vou te ajudar a montar sua loja do zero. Primeiro: que tipo de loja você quer criar?',
    2: 'Qual nicho te interessa?',
    3: 'Seu mercado será:',
    4: 'Quem é seu público-alvo? Descreva ou escolha:',
    5: 'Qual será sua principal estratégia de aquisição?',
    6: 'Qual sua meta de faturamento para o 1º mês?',
    7: 'Último passo: dê um nome para seu projeto!',
  };

  const historyLabels: { label: string; value: string }[] = [
    data.tipo ? { label: 'Tipo', value: data.tipo } : null,
    data.nicho ? { label: 'Nicho', value: data.nicho } : null,
    data.mercado ? { label: 'Mercado', value: data.mercado } : null,
    data.publico ? { label: 'Público', value: data.publico } : null,
    data.estrategia ? { label: 'Estratégia', value: data.estrategia } : null,
    data.meta ? { label: 'Meta', value: data.meta } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6">
        {/* Back */}
        <Link to="/projetos" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Projetos
        </Link>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs">Passo {step} de {TOTAL_STEPS}</span>
            <span className="text-[#3F1DFF] text-xs font-bold">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3F1DFF] rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* History */}
        {historyLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {historyLabels.map(h => (
              <div key={h.label} className="bg-[#141414] border border-[#252525] rounded-full px-3 py-1 flex items-center gap-2">
                <span className="text-gray-500 text-[10px]">{h.label}:</span>
                <span className="text-white text-[10px] font-semibold">{h.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Assistant message */}
        <div
          className={`transition-all duration-300 ${msgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-[#3F1DFF] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">B</div>
            <div className="bg-[#141414] border border-[#252525] rounded-[16px] rounded-tl-sm p-4">
              <p className="text-white text-sm leading-relaxed">{stepMessages[step]}</p>
            </div>
          </div>
        </div>

        {/* Step options */}
        <div className={`transition-all duration-300 delay-100 ${msgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="flex gap-3">
              {[{ label: '🎯 Loja Nichada', value: 'Loja Nichada' }, { label: '🛒 Loja Geral', value: 'Loja Geral' }].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => choose('tipo', opt.value)}
                  className="flex-1 bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/50 rounded-[14px] p-4 text-white font-semibold transition-colors text-center"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 2 - Nicho */}
          {step === 2 && (
            <div className="flex flex-wrap gap-3">
              {[
                { label: '🐾 Pet', value: 'Pet' },
                { label: '💪 Fitness', value: 'Fitness' },
                { label: '💄 Beleza', value: 'Beleza' },
                { label: '👶 Kids', value: 'Kids' },
                { label: '💻 Tech', value: 'Tech' },
                { label: '🏠 Casa', value: 'Casa' },
                { label: '✍️ Outro', value: 'Outro' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => choose('nicho', opt.value)}
                  className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/50 rounded-[12px] px-4 py-3 text-white font-medium transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 3 - Mercado */}
          {step === 3 && (
            <div className="flex flex-col gap-3">
              {[
                { label: '🇧🇷 Nacional — Foco no Brasil', value: 'Nacional' },
                { label: '🌎 Global — Venda para o mundo', value: 'Global' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => choose('mercado', opt.value)}
                  className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/50 rounded-[14px] p-4 text-white font-medium transition-colors text-left"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 4 - Público */}
          {step === 4 && (
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Jovens 18-25', 'Adultos 25-40', 'Mães', 'Atletas', '+40'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => choosePublico(opt)}
                    className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/50 rounded-full px-4 py-2 text-white text-sm font-medium transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={freeInput}
                  onChange={e => setFreeInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitPublicoFree()}
                  placeholder="Descreva seu público..."
                  className="flex-1 bg-[#141414] border border-[#333] focus:border-[#3F1DFF] rounded-[12px] px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
                <Button variant="primary" onClick={submitPublicoFree} disabled={!freeInput.trim()} className="py-3 px-5">
                  OK
                </Button>
              </div>
            </div>
          )}

          {/* Step 5 - Estratégia */}
          {step === 5 && (
            <div className="flex flex-wrap gap-3">
              {[
                { label: '📘 Meta Ads', value: 'Meta Ads' },
                { label: '🎵 TikTok Ads', value: 'TikTok Ads' },
                { label: '🌱 Orgânico', value: 'Orgânico' },
                { label: '🤝 Influencers', value: 'Influencers' },
                { label: '🔀 Misto', value: 'Misto' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => choose('estrategia', opt.value)}
                  className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/50 rounded-[12px] px-4 py-3 text-white font-medium transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 6 - Meta */}
          {step === 6 && (
            <div className="flex flex-wrap gap-3">
              {['R$2k', 'R$5k', 'R$10k', 'R$20k+', '📅 Definir depois'].map(opt => (
                <button
                  key={opt}
                  onClick={() => choose('meta', opt)}
                  className="bg-[#141414] border border-[#252525] hover:border-[#3F1DFF]/50 rounded-[12px] px-5 py-3 text-white font-medium transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Step 7 - Nome */}
          {step === 7 && (
            <div className="flex gap-2">
              <input
                value={nomeInput}
                onChange={e => setNomeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createProject()}
                placeholder="Ex: Loja Pet Brasil"
                className="flex-1 bg-[#141414] border border-[#333] focus:border-[#3F1DFF] rounded-[14px] px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                autoFocus
              />
              <Button variant="primary" onClick={createProject} disabled={!nomeInput.trim()} className="whitespace-nowrap">
                Criar Projeto →
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
