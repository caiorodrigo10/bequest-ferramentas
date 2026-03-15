export interface Projeto {
  id: string;
  nome: string;
  emoji: string;
  tipo: 'nichada' | 'geral';
  mercado: 'nacional' | 'global';
  nicho: string;
  publicoAlvo: string;
  estrategia: string[];
  meta: string;
  setupPercent: number;
  criadoEm: string;
}

export const projetos: Projeto[] = [
  {
    id: '1',
    nome: 'Loja Pet Brasil',
    emoji: '🐾',
    tipo: 'nichada',
    mercado: 'nacional',
    nicho: 'Pet',
    publicoAlvo: 'Donos de pets, 25-40 anos',
    estrategia: ['Meta Ads'],
    meta: 'R$10k/mês',
    setupPercent: 75,
    criadoEm: '10 Mar 2026',
  },
  {
    id: '2',
    nome: 'Dropshipping Fitness Global',
    emoji: '💪',
    tipo: 'nichada',
    mercado: 'global',
    nicho: 'Fitness',
    publicoAlvo: 'Atletas e entusiastas fitness, 18-35',
    estrategia: ['TikTok Ads'],
    meta: '$2k/mês',
    setupPercent: 30,
    criadoEm: '13 Mar 2026',
  },
];
