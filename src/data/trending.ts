export interface TrendingProduct {
  id: string;
  name: string;
  image: string;
  niche: string;
  costEstimate: number;
  whyTrending: string;
  tag: 'trending' | 'high-volume' | 'high-margin';
  aliexpressUrl: string;
  shop?: string;
  country?: string;
  expertNote?: string;
}

export const trending: TrendingProduct[] = [
  {
    id: 'trend-001',
    name: 'Hitch33',
    image: '/images/products/sr_01_hitch33.jpg',
    niche: 'Acessórios',
    costEstimate: 44.99,
    whyTrending:
      'Produto exclusivo com forte identidade de marca, ideal para capturar nichos de estilo de vida. Alto potencial de fidelização e recompra no modelo DTC.',
    tag: 'trending',
    aliexpressUrl: '#',
    shop: 'hitch33.com',
    country: undefined,
    expertNote:
      'Este produto apresenta uma proposta de valor clara e diferenciada. A combinação de branding forte com preço acessível cria uma janela perfeita para escalar com anúncios pagos no Meta.',
  },
  {
    id: 'trend-002',
    name: 'Head Protection Backpack',
    image: '/images/products/sr_02_head_protection_backpack.jpg',
    niche: 'Kids',
    costEstimate: 19.98,
    whyTrending:
      'Pais preocupados com segurança infantil são um público altamente engajado e com alto ticket emocional. Produto viral em comunidades de maternidade e paternidade.',
    tag: 'trending',
    aliexpressUrl: '#',
    shop: 'wonderbaby.co',
    country: 'US',
  },
  {
    id: 'trend-003',
    name: 'Fisher-Price Puppy Éveil Progressif',
    image: '/images/products/sr_03_fisher_price_rires_et_veil_pup.jpg',
    niche: 'Kids',
    costEstimate: 36.82,
    whyTrending:
      'Brinquedos educativos de marca reconhecida globalmente têm altíssima taxa de conversão em datas comemorativas. A Fisher-Price é sinônimo de confiança para pais de primeira viagem.',
    tag: 'high-margin',
    aliexpressUrl: '#',
    shop: 'mattel.com',
    country: 'US',
  },
  {
    id: 'trend-004',
    name: 'Water Melon Slicer',
    image: '/images/products/sr_04_water_melon_slicer.jpg',
    niche: 'Home',
    costEstimate: 4.01,
    whyTrending:
      'Utensílios de cozinha virais no TikTok têm custo baixíssimo e margens expressivas. Conteúdo UGC orgânico potencializa as vendas sem gastar muito em mídia.',
    tag: 'high-volume',
    aliexpressUrl: '#',
    shop: 'trend2spend.com',
    country: 'US',
  },
  {
    id: 'trend-005',
    name: 'Soplador TurboSopla™',
    image: '/images/products/sr_05_soplador_turbosopla_2_bater_as.jpg',
    niche: 'Tech',
    costEstimate: 47.50,
    whyTrending:
      'Ferramenta multifuncional com branding próprio e bundle de baterias recarregáveis aumenta o valor percebido significativamente. Forte no mercado hispânico.',
    tag: 'high-margin',
    aliexpressUrl: '#',
    shop: 'rocoesplendor.co',
    country: 'ES',
  },
  {
    id: 'trend-006',
    name: 'Swarous',
    image: '/images/products/sr_06_swarous.jpg',
    niche: 'Beauty',
    costEstimate: 29.99,
    whyTrending:
      'Produto de beleza com identidade de marca sólida e preço premium. Excelente para estratégias de influencer marketing e público feminino de 25 a 45 anos.',
    tag: 'trending',
    aliexpressUrl: '#',
    shop: 'swarous.com',
    country: 'US',
  },
  {
    id: 'trend-007',
    name: 'Ocean Breeze Splashland',
    image: '/images/products/sr_07_ocean_breeze_splashland.jpg',
    niche: 'Kids',
    costEstimate: 14.99,
    whyTrending:
      'Produto sazonal de verão com demanda previsível e curva de tendência clara. Perfeito para campanhas de retenção com clientes de anos anteriores.',
    tag: 'high-volume',
    aliexpressUrl: '#',
    shop: 'aprolo.com',
    country: 'US',
  },
  {
    id: 'trend-008',
    name: 'PurrWhirl – Interactive Cat Toy',
    image: '/images/products/sr_08_purrwhirl_interactive_cat_toy_.jpg',
    niche: 'Pet Tech',
    costEstimate: 39.95,
    whyTrending:
      'O mercado pet tech cresce aceleradamente com donos que tratam animais como membros da família. Brinquedos interativos têm taxa de recompra e reviews espontâneos muito altos.',
    tag: 'trending',
    aliexpressUrl: '#',
    shop: 'marnetic.com',
    country: 'US',
  },
  {
    id: 'trend-009',
    name: 'MultiMinopia – Fix It All',
    image: '/images/products/sr_09_multiminopia_tout_fixer_la_mai.jpg',
    niche: 'Home',
    costEstimate: 11.43,
    whyTrending:
      'Produtos que resolvem problemas cotidianos sem necessidade de ferramentas têm conversão altíssima em vídeo. Excelente para demonstrações curtas no Reels e TikTok.',
    tag: 'high-volume',
    aliexpressUrl: '#',
    shop: 'minopia.com',
    country: 'FR',
  },
  {
    id: 'trend-010',
    name: 'Anti-Theft Crossbody Bag',
    image: '/images/products/sr_10_anti_theft_crossbody_bag.jpg',
    niche: 'Lifestyle',
    costEstimate: 34.28,
    whyTrending:
      'Bolsas antifurto combinam funcionalidade e estilo, atendendo viajantes e profissionais urbanos. Ótimo ângulo de copy focado em segurança pessoal.',
    tag: 'high-margin',
    aliexpressUrl: '#',
    shop: 'simplifyliving.uk',
    country: 'US',
  },
];
