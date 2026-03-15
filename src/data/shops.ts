export interface Shop {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
  dailyRevenue: string;
  monthlyVisits: string;
  growth1m: number;
  growth3m: number;
  activeMetaAds: number;
  inactiveMetaAds: number;
  productCount: number;
  thumbnails: string[];
  category: 'dropshipping' | 'brand' | 'mono-product';
}

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Hitch33',
    domain: 'hitch33.com',
    createdAt: 'Jan 2024',
    dailyRevenue: '$2k',
    monthlyVisits: '8.4k',
    growth1m: 32,
    growth3m: 84,
    activeMetaAds: 5,
    inactiveMetaAds: 2,
    productCount: 1,
    thumbnails: ['/images/products/sr_01_hitch33.jpg'],
    category: 'mono-product',
  },
  {
    id: '2',
    name: 'Wonderbaby',
    domain: 'wonderbaby.co',
    createdAt: 'Mar 2023',
    dailyRevenue: '$4k',
    monthlyVisits: '11.5k',
    growth1m: 72,
    growth3m: 120,
    activeMetaAds: 12,
    inactiveMetaAds: 8,
    productCount: 3,
    thumbnails: ['/images/products/sr_02_head_protection_backpack.jpg'],
    category: 'dropshipping',
  },
  {
    id: '3',
    name: 'Trend2Spend',
    domain: 'trend2spend.com',
    createdAt: 'Jun 2023',
    dailyRevenue: '$1k',
    monthlyVisits: '4.2k',
    growth1m: -12,
    growth3m: 45,
    activeMetaAds: 3,
    inactiveMetaAds: 15,
    productCount: 8,
    thumbnails: ['/images/products/sr_04_water_melon_slicer.jpg'],
    category: 'dropshipping',
  },
  {
    id: '4',
    name: 'Swarous',
    domain: 'swarous.com',
    createdAt: 'Sep 2024',
    dailyRevenue: '$3k',
    monthlyVisits: '6.1k',
    growth1m: 58,
    growth3m: 95,
    activeMetaAds: 8,
    inactiveMetaAds: 4,
    productCount: 2,
    thumbnails: ['/images/products/sr_06_swarous.jpg'],
    category: 'brand',
  },
  {
    id: '5',
    name: 'Aprolo',
    domain: 'aprolo.com',
    createdAt: 'Nov 2024',
    dailyRevenue: '$800',
    monthlyVisits: '2.3k',
    growth1m: 210,
    growth3m: 380,
    activeMetaAds: 2,
    inactiveMetaAds: 0,
    productCount: 1,
    thumbnails: ['/images/products/sr_07_ocean_breeze_splashland.jpg'],
    category: 'mono-product',
  },
  {
    id: '6',
    name: 'Marnetic',
    domain: 'marnetic.com',
    createdAt: 'Aug 2024',
    dailyRevenue: '$5k',
    monthlyVisits: '15.2k',
    growth1m: 44,
    growth3m: 67,
    activeMetaAds: 21,
    inactiveMetaAds: 9,
    productCount: 4,
    thumbnails: ['/images/products/sr_08_purrwhirl_interactive_cat_toy_.jpg'],
    category: 'dropshipping',
  },
];
