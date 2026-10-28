import { SizeInventory, Colorway } from '../types';

export const INITIAL_INVENTORY: SizeInventory[] = [
  { size: 'XS', stock: 6, label: 'Extra Small' },
  { size: 'S', stock: 6, label: 'Small' },
  { size: 'M', stock: 6, label: 'Medium' },
  { size: 'L', stock: 6, label: 'Large' },
  { size: 'XL', stock: 6, label: 'Extra Large' },
  { size: 'XXL', stock: 0, label: 'Double Extra Large' },
];

export const COLORWAYS: Colorway[] = [
  {
    id: 'pwlc-001-black-earth',
    name: 'PWLC 001 Black Earth Design',
    colorName: 'Black Earth',
    hex: '#1c1c1f',
    status: 'available',
    releaseTag: 'PWLC 001 · AVAILABLE NOW (6 PER SIZE)',
    dropNumber: 'PWLC 001',
    image: '/assets/aistudio/Washed_Black_Oversized_T-Shirt_Mockup_2835bf2a.png',
    price: 60.0,
    description:
      'PWLC 001 Black Earth Design. Crafted on dense 300 GSM combed compact cotton with an individual mineral wash and the signature scarlet red PWLC brushwork on the left chest.',
    washDetails: 'Deep black earth mineral wash with distressed seam fades',
  },
  {
    id: 'pwlc-002-pink-earth',
    name: 'PWLC 002 Pink Earth Design',
    colorName: 'Pink Earth',
    hex: '#e2889c',
    status: 'coming_soon',
    releaseTag: 'PWLC 002 · COMING SOON',
    dropNumber: 'PWLC 002',
    image: '/assets/aistudio/Pink_PWLC_Vintage-Wash_T-Shirt_Mockup_e8940c68.png',
    price: 60.0,
    description:
      'PWLC 002 Pink Earth Design. Pigment-dyed and enzyme washed for an organic earthy pink patina, finished with scarlet PWLC chest script and 1.25" rib crew collar.',
    washDetails: 'Vintage pink earth pigment wash with soft broken-in hand',
  },
  {
    id: 'pwlc-003-white-earth',
    name: 'PWLC 003 White Earth Design',
    colorName: 'White Earth',
    hex: '#d5cbb6',
    status: 'coming_soon',
    releaseTag: 'PWLC 003 · COMING SOON',
    dropNumber: 'PWLC 003',
    image: '/assets/aistudio/Washed_Stone_PWLC_Oversized_T-Shirt_5caab4dc.png',
    price: 60.0,
    description:
      'PWLC 003 White Earth Design. Warm unbleached stone white wash on heavyweight 300 GSM jersey, accented with high-density red PWLC chest insignia.',
    washDetails: 'Warm mineral stone white wash with raw organic undertone',
  },
  {
    id: 'pwlc-004-light-blue-earth',
    name: 'PWLC 004 Light Blue Earth Design',
    colorName: 'Light Blue Earth',
    hex: '#91b8da',
    status: 'coming_soon',
    releaseTag: 'PWLC 004 · COMING SOON',
    dropNumber: 'PWLC 004',
    image: '/assets/aistudio/Ice_Blue_PwLc_Oversized_T-Shirt_Mockup_d5af21d5.png',
    price: 60.0,
    description:
      'PWLC 004 Light Blue Earth Design. Soft mineral glacial wash with weathered highlights and signature red PWLC branding on boxy drop-shoulder cut.',
    washDetails: 'Glacial light blue earth mineral fade with micro-texture',
  },
  {
    id: 'pwlc-005-grey-earth',
    name: 'PWLC 005 Grey Acid Earth Design',
    colorName: 'Grey Acid Earth',
    hex: '#5f6064',
    status: 'coming_soon',
    releaseTag: 'PWLC 005 · COMING SOON',
    dropNumber: 'PWLC 005',
    image: '/assets/aistudio/Grey_Acid-Wash_T-Shirt_with_Red_Logo_d2491fdc.png',
    price: 60.0,
    description:
      'PWLC 005 Grey Acid Earth Design. Heavy industrial acid marl with textured grain patina, drop shoulders, and vibrant scarlet red chest signature.',
    washDetails: 'Heavy stone acid marl with textured grain patina',
  },
];

export const PRODUCT_DATA = {
  brand: 'PWLC',
  brandFullName: 'PEOPLE WHO LOVES CLOTHES',
  currency: 'AED',
  currencySymbol: 'AED',
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
    'Signature PWLC red brush script chest graphic with subtext',
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
