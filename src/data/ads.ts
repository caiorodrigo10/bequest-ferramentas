export interface AdItem {
  id: string;
  shopName: string;
  mediaType: 'image' | 'video';
  thumbnailPath: string | null;
  videoPath: string | null;
  productUrl: string;
  activeAds: string;
  status: string;
  date: string;
}

export const ads: AdItem[] = [
  {
    id: 'ad-001',
    shopName: 'Belvet Moon Shop',
    mediaType: 'image',
    thumbnailPath: '/images/ads/ad_01_belvet_moon_shop.webp',
    videoPath: null,
    productUrl: 'https://belvetmoon.com/products/siboo-l-alleato-inclinato-per-la-pappa-e-la-nanna',
    activeAds: '10',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-002',
    shopName: 'Joyspring Colombia',
    mediaType: 'image',
    thumbnailPath: '/images/ads/ad_02_joyspring_colombia.webp',
    videoPath: null,
    productUrl: 'https://santaelena.shop/products/genius-gummy',
    activeAds: '7',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-003',
    shopName: 'MisticaFlora',
    mediaType: 'image',
    thumbnailPath: '/images/ads/ad_03_misticaflora.webp',
    videoPath: null,
    productUrl: 'https://misticafloracolombia.com/products/semillas-rosas-trepadoras',
    activeAds: '128',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-004',
    shopName: 'Cristina Recomienda',
    mediaType: 'image',
    thumbnailPath: '/images/ads/ad_04_cristina_recomienda.webp',
    videoPath: null,
    productUrl: 'https://www.bienbuenochile.com/products/collar-de-proteccion-de-san-miguel-arcangel-oferta-limitada-2x1',
    activeAds: '254',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-005',
    shopName: 'Cloggies',
    mediaType: 'image',
    thumbnailPath: '/images/ads/ad_05_cloggies.webp',
    videoPath: null,
    productUrl: 'https://cloggies.de/pages/10r-cloggies-classic-a8',
    activeAds: '13',
    status: '0d Active',
    date: '14 Mar 2026',
  },
  {
    id: 'ad-006',
    shopName: 'Kim Colon',
    mediaType: 'video',
    thumbnailPath: null,
    videoPath: '/videos/ad_06_kim_colon.mp4',
    productUrl: 'https://zser.xyz/products/womens-tummy-control-butt-lifting-shapewear?variant=51275242897720',
    activeAds: '198',
    status: '0d Active',
    date: '14 Mar 2026',
  },
];
