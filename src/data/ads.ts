export interface AdItem {
  id: string;
  shop_name: string;
  media_type: 'image' | 'video';
  thumbnail: string | null;
  video_url: string | null;
  product_url: string | null;
  active_ads?: string;
  status?: string;
  date?: string;
}

export const ads: AdItem[] = [
  {
    id: 'ad-001',
    shop_name: 'Belvet Moon Shop',
    media_type: 'image',
    thumbnail: '/images/ads/ad_01_belvet_moon_shop.webp',
    video_url: null,
    product_url: 'https://belvetmoon.com/products/siboo-l-alleato-inclinato-per-la-pappa-e-la-nanna',
    active_ads: '10',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-002',
    shop_name: 'Joyspring Colombia',
    media_type: 'image',
    thumbnail: '/images/ads/ad_02_joyspring_colombia.webp',
    video_url: null,
    product_url: 'https://santaelena.shop/products/genius-gummy',
    active_ads: '7',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-003',
    shop_name: 'MisticaFlora',
    media_type: 'image',
    thumbnail: '/images/ads/ad_03_misticaflora.webp',
    video_url: null,
    product_url: 'https://misticafloracolombia.com/products/semillas-rosas-trepadoras',
    active_ads: '128',
    status: '2d Active',
    date: '12 Mar 2026',
  },
  {
    id: 'ad-004',
    shop_name: 'Cristina Recomienda',
    media_type: 'image',
    thumbnail: '/images/ads/ad_04_cristina_recomienda.webp',
    video_url: null,
    product_url: 'https://www.bienbuenochile.com/products/collar-de-proteccion-de-san-miguel-arcangel-oferta-limitada-2x1',
    active_ads: '254',
    status: '1d Active',
    date: '13 Mar 2026',
  },
  {
    id: 'ad-005',
    shop_name: 'Cloggies',
    media_type: 'image',
    thumbnail: '/images/ads/ad_05_cloggies.webp',
    video_url: null,
    product_url: 'https://cloggies.de/pages/10r-cloggies-classic-a8',
    active_ads: '13',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-006',
    shop_name: 'Kim Colon',
    media_type: 'video',
    thumbnail: '/images/products/sr_04_water_melon_slicer.jpg',
    video_url: '/videos/ad_06_kim_colon.mp4',
    product_url: 'https://zser.xyz/products/womens-tummy-control-butt-lifting-shapewear?variant=51275242897720',
    active_ads: '198',
    status: '0d Active',
    date: '14 Mar 2026',
  },
];
