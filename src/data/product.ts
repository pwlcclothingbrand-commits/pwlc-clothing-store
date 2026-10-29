import { SizeInventory, Colorway, ProductCategory } from '../types';

export const INITIAL_INVENTORY: SizeInventory[] = [
  { size: 'XS', stock: 0, label: 'Extra Small' },
  { size: 'S', stock: 6, label: 'Small' },
  { size: 'M', stock: 6, label: 'Medium' },
  { size: 'L', stock: 6, label: 'Large' },
  { size: 'XL', stock: 6, label: 'Extra Large' },
  { size: 'XXL', stock: 0, label: 'Double Extra Large' },
];

export const CATEGORIES: { id: ProductCategory; label: string; description: string; count: number }[] = [
  {
    id: 't-shirt',
    label: 'Heavyweight T-Shirts',
    description: '300 GSM combed compact cotton with drop-shoulder silhouette',
    count: 4,
  },
  {
    id: 'headwear',
    label: 'Headwear & Ski Mask',
    description: 'Tactical balaclavas with scarlet embroidered PWLC insignia',
    count: 1,
  },
];

// 4 T-Shirt Colorways (Black Earth [Available Now], Pink Earth, White Earth, Light Blue Earth [Coming Soon])
// NOTE: Grey Earth has been completely removed per user instruction.
export const TSHIRT_COLORWAYS: Colorway[] = [
  {
    id: 'pwlc-001-black-earth',
    category: 't-shirt',
    categoryName: 'Heavyweight T-Shirt',
    name: 'PWLC 001 Black Earth Design',
    colorName: 'Black Earth',
    hex: '#0d0d0f',
    status: 'available',
    releaseTag: 'PWLC 001 · AVAILABLE NOW (LIMITED DROP)',
    dropNumber: 'PWLC 001',
    image: '/assets/pwlc_001_black_earth.jpg',
    price: 75.0,
    description:
      'PWLC 001 Black Earth Design. Dual-print heavyweight 300 GSM combed compact cotton in deep jet black. Features the scarlet PWLC script on the front chest and the iconic luminous Earth graphic with community manifesto on the back.',
    washDetails: 'Deep jet black finish with contrast scarlet PWLC chest branding and detailed back Earth screenprint',
    specs: [
      '300 GSM ultra-heavyweight combed organic cotton',
      'Custom boxy silhouette with elongated dropped shoulder seams',
      'Dual-side screenprint: Scarlet PWLC chest script + Back Earth Manifesto',
      'Individual mineral enzyme wash — no two shirts are identical',
      'Thick 1.25" (32mm) reinforced tight-ribbed neckline',
      'Pre-shrunk fabric ensuring zero shrink post cold wash',
    ],
    sizeType: 'standard',
  },
  {
    id: 'pwlc-002-pink-earth',
    category: 't-shirt',
    categoryName: 'Heavyweight T-Shirt',
    name: 'PWLC 002 Pink Earth Design',
    colorName: 'Pink Earth',
    hex: '#e2889c',
    status: 'coming_soon',
    releaseTag: 'PWLC 002 · COMING SOON',
    dropNumber: 'PWLC 002',
    image: '/assets/pwlc_002_pink_earth.png',
    price: 75.0,
    description:
      'PWLC 002 Pink Earth Design. Pigment-dyed and enzyme washed for an organic earthy pink patina, with scarlet PWLC chest script and back Earth community insignia.',
    washDetails: 'Vintage pink earth pigment wash with soft broken-in hand and back screenprint',
    specs: [
      '300 GSM ultra-heavyweight combed organic cotton',
      'Custom boxy silhouette with elongated dropped shoulder seams',
      'Dual-side screenprint: Scarlet PWLC chest script + Back Earth Manifesto',
      'Pigment dyed with vintage enzyme wash',
      'Thick 1.25" (32mm) reinforced tight-ribbed neckline',
    ],
    sizeType: 'standard',
  },
  {
    id: 'pwlc-003-white-earth',
    category: 't-shirt',
    categoryName: 'Heavyweight T-Shirt',
    name: 'PWLC 003 White Earth Design',
    colorName: 'White Earth',
    hex: '#eae3d2',
    status: 'coming_soon',
    releaseTag: 'PWLC 003 · COMING SOON',
    dropNumber: 'PWLC 003',
    image: '/assets/pwlc_003_white_earth.jpeg',
    price: 75.0,
    description:
      'PWLC 003 White Earth Design. Warm unbleached stone white wash on heavyweight 300 GSM jersey, accented with high-density red PWLC chest insignia and back Earth graphic.',
    washDetails: 'Warm mineral stone white wash with raw organic undertone and back Earth screenprint',
    specs: [
      '300 GSM ultra-heavyweight combed organic cotton',
      'Warm unbleached stone natural cotton fiber shade',
      'Dual-side screenprint: Scarlet PWLC chest script + Back Earth Manifesto',
      'Thick 1.25" (32mm) reinforced tight-ribbed neckline',
    ],
    sizeType: 'standard',
  },
  {
    id: 'pwlc-004-light-blue-earth',
    category: 't-shirt',
    categoryName: 'Heavyweight T-Shirt',
    name: 'PWLC 004 Light Blue Earth Design',
    colorName: 'Light Blue Earth',
    hex: '#91b8da',
    status: 'coming_soon',
    releaseTag: 'PWLC 004 · COMING SOON',
    dropNumber: 'PWLC 004',
    image: '/assets/pwlc_004_light_blue_earth.jpeg',
    price: 75.0,
    description:
      'PWLC 004 Light Blue Earth Design. Soft mineral glacial wash with weathered highlights and signature red PWLC branding on boxy drop-shoulder cut.',
    washDetails: 'Glacial light blue earth mineral fade with back Earth screenprint',
    specs: [
      '300 GSM ultra-heavyweight combed organic cotton',
      'Mineral glacial fade wash with soft-touch finish',
      'Dual-side screenprint: Scarlet PWLC chest script + Back Earth Manifesto',
      'Thick 1.25" (32mm) reinforced tight-ribbed neckline',
    ],
    sizeType: 'standard',
  },
];

// Dedicated Headwear & Tactical Balaclava Category
export const HEADWEAR_ITEMS: Colorway[] = [
  {
    id: 'pwlc-000-shadow-balaclava',
    category: 'headwear',
    categoryName: 'Tactical Balaclava / Headwear',
    name: 'PWLC 000 Tactical Shadow Balaclava / Ski Mask',
    colorName: 'Obsidian Black',
    hex: '#111114',
    status: 'coming_soon',
    releaseTag: 'HEADWEAR CATEGORY · DROP 02 COMING SOON',
    dropNumber: 'PWLC HEADWEAR 000',
    image: '/assets/aistudio/Black_Balaclava_with_Red_PWLC_Logo_ede42c5f.png',
    price: 35.0,
    description:
      'PWLC 000 Tactical Shadow Balaclava / Ski Mask in deep obsidian black featuring high-density scarlet embroidered PWLC insignia. Ergonomic contoured eye slit and 4-way stretch breathable thermal compression knit for street drape and winter wind coverage.',
    washDetails: 'Deep obsidian black knit with scarlet embroidered PWLC script logo and reinforced seam binding',
    specs: [
      'Heavyweight 4-way stretch thermal compression knit',
      'Signature scarlet embroidered PWLC script insignia across brow/forehead',
      'Ergonomically contoured eye slit with non-slip reinforced stitching',
      'Breathable, wind-resistant double-layer face & neck drape',
      'One Size Fits All (OSFA) adaptive elastic form factor',
      'Anti-chafing flatlock seams for maximum comfort under helmets or hoods',
    ],
    sizeType: 'one-size',
  },
];

// Default COLORWAYS reference points strictly to T-Shirts (4 colors, no grey)
export const COLORWAYS: Colorway[] = TSHIRT_COLORWAYS;

// All products across both categories
export const ALL_PRODUCTS: Colorway[] = [...TSHIRT_COLORWAYS, ...HEADWEAR_ITEMS];

export const PRODUCT_DATA = {
  brand: 'PWLC',
  brandFullName: 'PEOPLE WHO LOVES CLOTHES',
  currency: 'AED',
  currencySymbol: 'AED',
  price: 75.0,
  standardDeliveryPrice: 30.0,
  closeDeliveryPrice: 15.0,
  weight: '300 GSM',
  composition: '100% Combed Compact Cotton',
  fit: 'Boxy Oversized with Dropped Shoulders',
  origin: 'Crafted & Hand-Washed in Portugal',
  sku: 'PWLC-EARTH-SERIES',
  details: [
    '300 GSM ultra-heavyweight combed organic cotton',
    'Custom boxy silhouette with elongated dropped shoulder seams',
    'Dual-side screenprint: Scarlet PWLC chest script + Back Earth Manifesto',
    'Individual mineral enzyme wash — no two shirts are identical',
    'Thick 1.25" (32mm) reinforced tight-ribbed neckline',
    'Pre-shrunk fabric ensuring zero shrink post cold wash',
    'Woven interior branded neck tag and internal care label',
  ],
  sizeChart: [
    { size: 'XS', chestIn: '42.5"', chestCm: '108', lengthIn: '28.0"', lengthCm: '71', shoulderIn: '21.0"', shoulderCm: '53' },
    { size: 'S', chestIn: '45.0"', chestCm: '114', lengthIn: '29.0"', lengthCm: '74', shoulderIn: '22.0"', shoulderCm: '56' },
    { size: 'M', chestIn: '47.5"', chestCm: '120', lengthIn: '30.0"', lengthCm: '76', shoulderIn: '23.0"', shoulderCm: '58' },
    { size: 'L', chestIn: '50.0"', chestCm: '127', lengthIn: '31.0"', lengthCm: '79', shoulderIn: '24.0"', shoulderCm: '61' },
    { size: 'XL', chestIn: '52.5"', chestCm: '133', lengthIn: '32.0"', lengthCm: '81', shoulderIn: '25.0"', shoulderCm: '63' },
    { size: 'XXL', chestIn: '55.0"', chestCm: '140', lengthIn: '33.0"', lengthCm: '84', shoulderIn: '26.0"', shoulderCm: '66' },
  ],
};

export const HEADWEAR_DATA = {
  name: 'PWLC 000 Tactical Shadow Balaclava / Ski Mask',
  category: 'Headwear & Accessories',
  sku: 'PWLC-HEADWEAR-000',
  price: 35.0,
  fit: 'One Size Fits All (OSFA) Adaptive Stretch',
  material: '4-Way Stretch Thermal Compression Knit',
  features: [
    'Signature scarlet embroidered PWLC insignia at forehead',
    '4-way ergonomic stretch for anatomical head and neck contours',
    'Reinforced dual-stitch eye aperture maintaining form over time',
    'Thermal wind-block barrier with breathable mouth filtration',
    'Compatible with beanies, oversized hoods, and outerwear layering',
    'Machine cold washable — retains deep obsidian shade and shape',
  ],
};
