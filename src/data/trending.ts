export interface TrendingProduct {
  id: string;
  name: string;
  image: string;
  niche: string;
  costEstimate: number;
  whyTrending: string;
  tag: 'trending' | 'high-volume' | 'high-margin';
  aliexpressUrl: string;
}

export const trending: TrendingProduct[] = [
  {
    id: 'trend-001',
    name: 'Comedouro Automático para Pets',
    image: 'https://picsum.photos/seed/trending1/400/400',
    niche: 'Pet Tech',
    costEstimate: 18.50,
    whyTrending:
      'O mercado pet no Brasil cresce mais de 10% ao ano. Donos de animais buscam cada vez mais praticidade no dia a dia.',
    tag: 'trending',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-002',
    name: 'Faixa de Resistência Elástica Kit',
    image: 'https://picsum.photos/seed/trending2/400/400',
    niche: 'Home Fitness',
    costEstimate: 7.20,
    whyTrending:
      'Com a popularização dos treinos em casa, kits de resistência são itens de alto volume com margem excelente.',
    tag: 'high-volume',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-003',
    name: 'Massageador Facial de Microcorrente',
    image: 'https://picsum.photos/seed/trending3/400/400',
    niche: 'Beauty Tech',
    costEstimate: 12.00,
    whyTrending:
      'Influenciadoras de skincare impulsionaram a demanda por dispositivos de beleza acessíveis com aparência premium.',
    tag: 'high-margin',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-004',
    name: 'Luminária de Mesa LED Recarregável',
    image: 'https://picsum.photos/seed/trending4/400/400',
    niche: 'Home Office',
    costEstimate: 9.90,
    whyTrending:
      'O home office se consolidou e acessórios de mesa com design moderno continuam vendendo muito bem.',
    tag: 'trending',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-005',
    name: 'Garrafa Térmica Inteligente com Display',
    image: 'https://picsum.photos/seed/trending5/400/400',
    niche: 'Wellness',
    costEstimate: 8.50,
    whyTrending:
      'Produtos de hidratação com tecnologia atraem consumidores de saúde e bem-estar, gerando alto engajamento nas redes.',
    tag: 'high-volume',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-006',
    name: 'Organizador de Maquiagem Rotativo',
    image: 'https://picsum.photos/seed/trending6/400/400',
    niche: 'Beauty Organization',
    costEstimate: 6.30,
    whyTrending:
      'Vídeos de organização pessoal viralizam no TikTok e Instagram, impulsionando vendas de organizadores estilosos.',
    tag: 'high-margin',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-007',
    name: 'Mini Drone com Câmera HD',
    image: 'https://picsum.photos/seed/trending7/400/400',
    niche: 'Tech Toys',
    costEstimate: 35.00,
    whyTrending:
      'Mini drones acessíveis são presentes populares e têm alta margem de lucro no mercado brasileiro.',
    tag: 'high-margin',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-008',
    name: 'Cinto de Corrida com Porta Celular',
    image: 'https://picsum.photos/seed/trending8/400/400',
    niche: 'Running Gear',
    costEstimate: 4.50,
    whyTrending:
      'Corrida de rua bateu recorde de praticantes no Brasil. Acessórios leves e funcionais têm demanda garantida.',
    tag: 'high-volume',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-009',
    name: 'Projetor Portátil para Celular',
    image: 'https://picsum.photos/seed/trending9/400/400',
    niche: 'Entertainment',
    costEstimate: 42.00,
    whyTrending:
      'A experiência de cinema em casa segue em alta. Projetores compactos são desejados por jovens e famílias.',
    tag: 'trending',
    aliexpressUrl: '#',
  },
  {
    id: 'trend-010',
    name: 'Escova Alisadora Elétrica',
    image: 'https://picsum.photos/seed/trending10/400/400',
    niche: 'Hair Care',
    costEstimate: 11.00,
    whyTrending:
      'Produtos de cuidado capilar dominam o e-commerce brasileiro. Escovas elétricas combinam praticidade e resultado rápido.',
    tag: 'high-volume',
    aliexpressUrl: '#',
  },
];
