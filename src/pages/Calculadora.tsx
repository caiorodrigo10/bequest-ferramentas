import { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

type Platform = 'Mercado Livre' | 'Shopee' | 'Shopify' | 'Personalizado';

interface Inputs {
  custo: number;
  freteInt: number;
  freteNac: number;
  impostos: number;
  plataforma: Platform;
  taxa: number;
  margem: number;
}

interface Results {
  totalCost: number;
  impostoValor: number;
  taxaPlataforma: number;
  lucroDesejado: number;
  precoSugerido: number;
  lucroLiquido: number;
  margemReal: number;
  breakeven: number;
}

interface Scenario {
  name: string;
  inputs: Inputs;
  results: Results;
  createdAt: string;
}

const PLATFORM_RATES: Record<Platform, number> = {
  'Mercado Livre': 12,
  'Shopee': 14,
  'Shopify': 2,
  'Personalizado': 0,
};

const DEFAULT_INPUTS: Inputs = {
  custo: 15,
  freteInt: 8,
  freteNac: 12,
  impostos: 15,
  plataforma: 'Mercado Livre',
  taxa: 12,
  margem: 40,
};

function computeResults(inputs: Inputs): Results {
  const { custo, freteInt, freteNac, impostos, taxa, margem } = inputs;
  const totalCost = custo + freteInt + freteNac;
  const impostoValor = totalCost * (impostos / 100);
  const taxaPlataforma = totalCost * (taxa / 100);
  const lucroDesejado = totalCost * (margem / 100);
  const precoSugerido = totalCost + impostoValor + taxaPlataforma + lucroDesejado;
  const lucroLiquido = precoSugerido - totalCost - impostoValor - taxaPlataforma;
  const margemReal = precoSugerido > 0 ? (lucroLiquido / precoSugerido) * 100 : 0;
  const breakeven = lucroLiquido > 0 ? Math.ceil(totalCost / lucroLiquido) : 0;
  return { totalCost, impostoValor, taxaPlataforma, lucroDesejado, precoSugerido, lucroLiquido, margemReal, breakeven };
}

function loadScenarios(): Scenario[] {
  try {
    return JSON.parse(localStorage.getItem('calc-scenarios') ?? '[]');
  } catch {
    return [];
  }
}

function saveScenarios(scenarios: Scenario[]) {
  localStorage.setItem('calc-scenarios', JSON.stringify(scenarios));
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = '0.01',
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">{label}</label>
      <div className="flex items-center bg-[#1c1c1c] border border-[#252525] focus-within:border-[#3F1DFF]/60 rounded-[10px] transition-colors overflow-hidden">
        {prefix && <span className="px-3 text-gray-500 text-sm">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          className="flex-1 bg-transparent px-3 py-3 text-white text-sm outline-none min-w-0"
        />
        {suffix && <span className="px-3 text-gray-500 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

export function Calculadora() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);
  const [scenarios, setScenarios] = useState<Scenario[]>(loadScenarios);

  const results = useMemo(() => computeResults(inputs), [inputs]);

  const updateInput = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlatformChange = (plataforma: Platform) => {
    updateInput('plataforma', plataforma);
    if (plataforma !== 'Personalizado') {
      updateInput('taxa', PLATFORM_RATES[plataforma]);
    }
  };

  const handleSaveScenario = () => {
    const name = prompt('Nome do cenário:');
    if (!name?.trim()) return;
    const newScenario: Scenario = {
      name: name.trim(),
      inputs: { ...inputs },
      results: { ...results },
      createdAt: new Date().toISOString(),
    };
    const updated = [newScenario, ...scenarios].slice(0, 5);
    setScenarios(updated);
    saveScenarios(updated);
  };

  const handleLoadScenario = (scenario: Scenario) => {
    setInputs(scenario.inputs);
  };

  const ResultRow = ({ label, value, highlight, color }: { label: string; value: string; highlight?: boolean; color?: string }) => (
    <div className={`flex justify-between items-center py-3 ${highlight ? '' : 'border-b border-[#252525]'}`}>
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-bold ${color ?? 'text-white'} ${highlight ? 'text-3xl' : 'text-base'}`}>{value}</span>
    </div>
  );

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Calculadora de Precificação</h1>
        <p className="text-gray-400 mb-8">Calcule o preço ideal e sua margem de lucro real</p>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start">
          {/* Painel de Inputs */}
          <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-white mb-2">Custos & Configurações</h2>

            <InputField
              label="Custo do Produto"
              value={inputs.custo}
              onChange={(v) => updateInput('custo', v)}
              prefix="R$"
            />
            <InputField
              label="Frete Internacional"
              value={inputs.freteInt}
              onChange={(v) => updateInput('freteInt', v)}
              prefix="R$"
            />
            <InputField
              label="Frete Nacional"
              value={inputs.freteNac}
              onChange={(v) => updateInput('freteNac', v)}
              prefix="R$"
            />
            <InputField
              label="Impostos"
              value={inputs.impostos}
              onChange={(v) => updateInput('impostos', v)}
              suffix="%"
              step="0.5"
            />

            {/* Plataforma */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Plataforma</label>
              <select
                value={inputs.plataforma}
                onChange={(e) => handlePlatformChange(e.target.value as Platform)}
                className="w-full bg-[#1c1c1c] border border-[#252525] rounded-[10px] px-3 py-3 text-white text-sm outline-none"
              >
                {(Object.keys(PLATFORM_RATES) as Platform[]).map((p) => (
                  <option key={p} value={p}>{p} ({PLATFORM_RATES[p]}%)</option>
                ))}
              </select>
            </div>

            <InputField
              label="Taxa da Plataforma"
              value={inputs.taxa}
              onChange={(v) => {
                updateInput('plataforma', 'Personalizado');
                updateInput('taxa', v);
              }}
              suffix="%"
              step="0.5"
            />
            <InputField
              label="Margem Desejada"
              value={inputs.margem}
              onChange={(v) => updateInput('margem', v)}
              suffix="%"
              step="1"
            />

            <Button variant="secondary" onClick={handleSaveScenario} className="mt-2">
              💾 Salvar Cenário
            </Button>
          </div>

          {/* Painel de Resultado */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#1c1c1c] border border-[#3F1DFF]/30 rounded-[16px] p-8">
              <h2 className="text-lg font-bold text-white mb-6">Resultado</h2>

              <div className="mb-6 pb-6 border-b border-[#252525]">
                <p className="text-gray-400 text-sm mb-2">Preço de Venda Sugerido</p>
                <p className="text-3xl font-bold text-[#3F1DFF]">
                  {formatCurrency(results.precoSugerido, 'BRL')}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <ResultRow
                  label="Custo Total"
                  value={formatCurrency(results.totalCost, 'BRL')}
                />
                <ResultRow
                  label="Impostos"
                  value={formatCurrency(results.impostoValor, 'BRL')}
                />
                <ResultRow
                  label="Taxa da Plataforma"
                  value={formatCurrency(results.taxaPlataforma, 'BRL')}
                />
                <ResultRow
                  label="Lucro Líquido"
                  value={formatCurrency(results.lucroLiquido, 'BRL')}
                  color={results.lucroLiquido >= 0 ? 'text-green-400' : 'text-red-400'}
                />
                <ResultRow
                  label="Margem Real"
                  value={`${results.margemReal.toFixed(1)}%`}
                  color={results.margemReal >= 20 ? 'text-green-400' : results.margemReal >= 10 ? 'text-yellow-400' : 'text-red-400'}
                />
                <ResultRow
                  label="Breakeven (unidades)"
                  value={results.breakeven > 0 ? `${results.breakeven} un.` : '—'}
                />
              </div>
            </div>

            {/* Cenários salvos */}
            {scenarios.length > 0 && (
              <div className="bg-[#141414] border border-[#252525] rounded-[16px] p-6">
                <h3 className="text-base font-bold text-white mb-4">Cenários Salvos</h3>
                <div className="flex flex-col gap-3">
                  {scenarios.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 p-3 bg-[#1c1c1c] rounded-[10px]"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{s.name}</p>
                        <p className="text-[#3F1DFF] text-xs font-bold">
                          {formatCurrency(s.results.precoSugerido, 'BRL')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-xs py-1.5 px-4"
                        onClick={() => handleLoadScenario(s)}
                      >
                        Carregar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
