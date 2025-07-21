export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  category: ProductCategory
  subcategory?: string
  brand: string
  inStock: boolean
  stockQuantity: number
  images: string[]
  features: string[]
  specifications: ProductSpecification[]
  reviews: ProductReview[]
  rating: number
  reviewCount: number
  tags: string[]
  isFeatured: boolean
  isNew: boolean
  isBestseller: boolean
  colors?: string[]
  sizes?: string[]
  materials?: string[]
  careInstructions: string[]
  shippingInfo: string
  returnPolicy: string
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductReview {
  id: string
  customerName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
}

export type ProductCategory =
  | 'wigs'
  | 'toppers'
  | 'extensions'
  | 'accessories'
  | 'care-products'
  | 'styling-tools'

export const productCategories: { id: ProductCategory; name: string; description: string }[] = [
  {
    id: 'wigs',
    name: 'Wigs',
    description: 'Premium quality wigs for every style and occasion'
  },
  {
    id: 'toppers',
    name: 'Hair Toppers',
    description: 'Natural-looking toppers for volume and coverage'
  },
  {
    id: 'extensions',
    name: 'Hair Extensions',
    description: 'Add length and volume with our premium extensions'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential accessories for wig care and styling'
  },
  {
    id: 'care-products',
    name: 'Care Products',
    description: 'Professional care products for wig maintenance'
  },
  {
    id: 'styling-tools',
    name: 'Styling Tools',
    description: 'Professional tools for styling and maintenance'
  }
]

export const products: Product[] = [
  // PREMIUM HUMAN HAIR WIGS
  {
    id: 'wig-001',
    name: 'Signature Lace Front Bob - Brazilian Virgin Hair',
    description: 'Premium 13x4 HD lace front bob wig crafted from 100% Brazilian virgin hair with natural baby hairs',
    longDescription: 'Our signature lace front bob is meticulously hand-crafted using the finest Brazilian virgin hair. The 13x4 HD Swiss lace creates an invisible hairline that mimics natural hair growth. Each strand is individually hand-tied to create the most realistic appearance. The pre-plucked hairline and bleached knots ensure seamless blending with all skin tones. Perfect for everyday wear or special occasions.',
    price: 895,
    originalPrice: 1095,
    category: 'wigs',
    subcategory: 'Lace Front',
    brand: 'Berenice Signature',
    inStock: true,
    stockQuantity: 8,
    images: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1529626455594-4ff0c44a43e1?w=600&h=600&fit=crop&face'
    ],
    features: [
      '100% Brazilian Virgin Hair',
      '13x4 HD Swiss Lace Front',
      'Pre-plucked Natural Hairline',
      'Bleached Knots',
      'Glueless Application',
      'Heat Resistant up to 200°C',
      '150% Hair Density',
      'Adjustable Straps & Combs'
    ],
    specifications: [
      { name: 'Length', value: '12 inches' },
      { name: 'Density', value: '150%' },
      { name: 'Cap Size', value: 'Medium (22-22.5 inches)' },
      { name: 'Hair Origin', value: 'Brazilian Virgin Hair' },
      { name: 'Texture', value: 'Natural Straight' },
      { name: 'Lace Type', value: '13x4 HD Swiss Lace' },
      { name: 'Cap Construction', value: 'Lace Front with Adjustable Straps' },
      { name: 'Baby Hairs', value: 'Natural Pre-plucked' }
    ],
    reviews: [
      {
        id: 'r1',
        customerName: 'Rachel Thompson',
        rating: 5,
        title: 'Absolutely stunning quality!',
        comment: 'This wig exceeded all my expectations. The lace is completely invisible and the hair quality is exceptional. I\'ve been wearing it for 3 months and it still looks brand new. Worth every penny!',
        date: '2024-12-15',
        verified: true,
        helpful: 28
      },
      {
        id: 'r2',
        customerName: 'Maya Patel',
        rating: 5,
        title: 'Professional salon quality',
        comment: 'As a hairstylist, I\'m very particular about hair quality. This wig is salon-grade and my clients can\'t tell it\'s not my real hair. The lace front is perfectly blended.',
        date: '2024-12-10',
        verified: true,
        helpful: 19
      }
    ],
    rating: 4.9,
    reviewCount: 47,
    tags: ['premium', 'lace-front', 'brazilian-hair', 'glueless', 'natural'],
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['Jet Black (#1)', 'Natural Black (#1B)', 'Dark Brown (#2)', 'Medium Brown (#4)'],
    sizes: ['10"', '12"', '14"', '16"'],
    materials: ['Brazilian Virgin Hair', 'HD Swiss Lace', 'Adjustable Straps'],
    careInstructions: [
      'Wash with sulfate-free shampoo every 10-15 wears',
      'Deep condition weekly with quality hair mask',
      'Air dry on wig stand to maintain shape',
      'Use heat protectant before styling with hot tools',
      'Store on wig stand when not in use',
      'Avoid sleeping in wig to prevent tangling'
    ],
    shippingInfo: 'Free express shipping included. Arrives in 2-3 business days with signature required.',
    returnPolicy: '30-day return policy with original packaging. Custom colored wigs are final sale.'
  },

  {
    id: 'wig-002',
    name: 'Luxury Curly Lace Closure Wig - Peruvian Hair',
    description: 'Exquisite 4x4 lace closure wig with natural curly texture from premium Peruvian virgin hair',
    longDescription: 'Experience the luxury of naturally curly hair with our Peruvian virgin hair lace closure wig. The 4x4 transparent lace closure provides versatile parting options while maintaining a natural scalp appearance. Each curl is carefully preserved to maintain the hair\'s natural bounce and movement.',
    price: 745,
    category: 'wigs',
    subcategory: 'Lace Closure',
    brand: 'Berenice Luxury',
    inStock: true,
    stockQuantity: 12,
    images: [
      'https://images.unsplash.com/photo-1494790108755-2616c667e69c?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&face'
    ],
    features: [
      '100% Peruvian Virgin Hair',
      '4x4 Transparent Lace Closure',
      'Natural Curly Pattern (3A-3B)',
      'Free Part Closure',
      'Machine Weft Construction',
      'Double Drawn Hair',
      '130% Natural Density',
      'Tangle-Free Guarantee'
    ],
    specifications: [
      { name: 'Length', value: '16 inches' },
      { name: 'Density', value: '130%' },
      { name: 'Cap Size', value: 'Average (21.5-22.5 inches)' },
      { name: 'Hair Origin', value: 'Peruvian Virgin Hair' },
      { name: 'Texture', value: 'Natural Curly (3A-3B)' },
      { name: 'Closure Size', value: '4x4 inches' },
      { name: 'Weft Type', value: 'Machine Weft' },
      { name: 'Hair Grade', value: '10A Premium Grade' }
    ],
    reviews: [
      {
        id: 'r3',
        customerName: 'Jasmine Williams',
        rating: 5,
        title: 'Perfect curl pattern!',
        comment: 'The curls are absolutely beautiful and so natural-looking. I love how bouncy and soft the hair feels. This wig has given me so much confidence!',
        date: '2024-12-08',
        verified: true,
        helpful: 22
      }
    ],
    rating: 4.8,
    reviewCount: 34,
    tags: ['curly', 'peruvian-hair', 'lace-closure', 'natural-texture'],
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    colors: ['Natural Black (#1B)', 'Dark Brown (#2)', 'Medium Brown (#4)', 'Chestnut Brown (#6)'],
    sizes: ['14"', '16"', '18"', '20"'],
    materials: ['Peruvian Virgin Hair', 'Transparent Lace', 'Machine Weft'],
    careInstructions: [
      'Detangle gently with wide-tooth comb when wet',
      'Use curl-enhancing products for definition',
      'Plop with microfiber towel to dry',
      'Apply leave-in conditioner regularly',
      'Refresh curls with water and curl cream',
      'Sleep with silk/satin bonnet or pillowcase'
    ],
    shippingInfo: 'Free standard shipping. Express shipping available for £15.',
    returnPolicy: '14-day return policy for hygiene reasons. Ensure original packaging.'
  },

  {
    id: 'wig-003',
    name: 'Classic Straight Full Lace Wig - Indian Remy Hair',
    description: 'Versatile full lace wig with silky straight Indian Remy hair, offering 360-degree styling freedom',
    longDescription: 'Our full lace wig provides ultimate versatility with 360-degree parting capability. Crafted from premium Indian Remy hair known for its strength and natural luster. The full lace construction allows for high ponytails and updos while maintaining a natural appearance from every angle.',
    price: 1295,
    originalPrice: 1495,
    category: 'wigs',
    subcategory: 'Full Lace',
    brand: 'Berenice Elite',
    inStock: true,
    stockQuantity: 5,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&face'
    ],
    features: [
      '100% Indian Remy Hair',
      'Full Lace Construction',
      '360° Parting Capability',
      'Silky Straight Texture',
      'Hand-Tied Throughout',
      'Bleached Knots',
      'Baby Hairs Included',
      'Professional Grade Quality'
    ],
    specifications: [
      { name: 'Length', value: '20 inches' },
      { name: 'Density', value: '150%' },
      { name: 'Cap Size', value: 'Medium (22-22.5 inches)' },
      { name: 'Hair Origin', value: 'Indian Remy Hair' },
      { name: 'Texture', value: 'Silky Straight' },
      { name: 'Lace Type', value: 'Full Swiss Lace' },
      { name: 'Cap Construction', value: 'Hand-tied Full Lace' },
      { name: 'Hair Grade', value: '9A Premium Grade' }
    ],
    reviews: [
      {
        id: 'r4',
        customerName: 'Sophia Chen',
        rating: 5,
        title: 'Ultimate styling freedom!',
        comment: 'I can part this wig anywhere and style it in high ponytails. The hair is incredibly soft and the full lace gives such a natural look. Best investment I\'ve made!',
        date: '2024-12-05',
        verified: true,
        helpful: 31
      }
    ],
    rating: 4.9,
    reviewCount: 28,
    tags: ['full-lace', 'indian-remy', 'versatile', 'premium'],
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    colors: ['Jet Black (#1)', 'Natural Black (#1B)', 'Dark Brown (#2)', 'Medium Brown (#4)', 'Light Brown (#6)'],
    sizes: ['16"', '18"', '20"', '22"', '24"'],
    materials: ['Indian Remy Hair', 'Swiss Full Lace', 'Adjustable Straps'],
    careInstructions: [
      'Brush daily with soft bristle brush',
      'Wash weekly with premium wig shampoo',
      'Apply heat protectant before heat styling',
      'Store on mannequin head when not wearing',
      'Use wide-tooth comb for detangling',
      'Professional maintenance recommended monthly'
    ],
    shippingInfo: 'Free express shipping with insurance. Delivery in 1-2 business days.',
    returnPolicy: '30-day return policy. Professional consultation included.'
  },

  // SYNTHETIC WIGS
  {
    id: 'wig-004',
    name: 'Modern Layered Bob - Heat Friendly Synthetic',
    description: 'Trendy layered bob wig in premium heat-friendly synthetic fiber with natural movement',
    longDescription: 'This contemporary layered bob combines style and convenience with our premium heat-friendly synthetic fiber. The multi-layered cut creates natural movement and volume while the heat-friendly technology allows styling up to 160°C. Perfect for those seeking a low-maintenance yet stylish option.',
    price: 185,
    category: 'wigs',
    subcategory: 'Synthetic',
    brand: 'Berenice Modern',
    inStock: true,
    stockQuantity: 22,
    images: [
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=600&h=600&fit=crop&face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&face'
    ],
    features: [
      'Heat-Friendly Synthetic Fiber',
      'Layered Bob Cut',
      'Ready-to-Wear Style',
      'Lightweight Construction',
      'Natural Scalp Appearance',
      'Adjustable Cap',
      'Style Retention Technology',
      'Color-Fast Formula'
    ],
    specifications: [
      { name: 'Length', value: '10 inches' },
      { name: 'Density', value: '120%' },
      { name: 'Cap Size', value: 'Average (21.5-22.5 inches)' },
      { name: 'Fiber Type', value: 'Heat-Friendly Synthetic' },
      { name: 'Texture', value: 'Layered Straight' },
      { name: 'Heat Limit', value: '160°C (320°F)' },
      { name: 'Cap Type', value: 'Basic Cap with Adjustable Straps' },
      { name: 'Style', value: 'Modern Layered Bob' }
    ],
    reviews: [
      {
        id: 'r5',
        customerName: 'Emma Rodriguez',
        rating: 4,
        title: 'Great everyday wig',
        comment: 'Perfect for work and daily activities. Very comfortable and looks natural. The layers give it such a modern look!',
        date: '2024-12-12',
        verified: true,
        helpful: 15
      }
    ],
    rating: 4.3,
    reviewCount: 67,
    tags: ['synthetic', 'bob', 'heat-friendly', 'low-maintenance'],
    isFeatured: false,
    isNew: true,
    isBestseller: true,
    colors: ['Jet Black', 'Dark Brown', 'Medium Brown', 'Light Brown', 'Dark Blonde', 'Ash Blonde'],
    materials: ['Heat-Friendly Synthetic Fiber', 'Breathable Cap'],
    careInstructions: [
      'Brush gently with wig brush before and after wear',
      'Wash every 8-10 wears with cool water',
      'Use only wig-specific products',
      'Style with heat tools up to 160°C only',
      'Air dry completely before storing',
      'Store on wig stand to maintain shape'
    ],
    shippingInfo: 'Standard shipping included. Express delivery available.',
    returnPolicy: '14-day return policy for synthetic wigs. Must be unworn.'
  },

  // HAIR TOPPERS
  {
    id: 'topper-001',
    name: 'Silk Base Crown Topper - European Hair',
    description: 'Invisible silk base topper for natural volume and crown coverage with European virgin hair',
    longDescription: 'Our premium silk base crown topper features the most advanced base technology that creates the illusion of natural scalp. Made with European virgin hair for superior quality and natural appearance. Perfect for adding volume to thinning crown areas or creating fuller-looking hair without commitment.',
    price: 395,
    category: 'toppers',
    subcategory: 'Crown Coverage',
    brand: 'Berenice Solutions',
    inStock: true,
    stockQuantity: 15,
    images: [
      'https://images.unsplash.com/photo-1550048648-6d7d14565ba0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop'
    ],
    features: [
      'Invisible Silk Base Technology',
      '100% European Virgin Hair',
      'Pressure-Sensitive Clips',
      'Natural Scalp Simulation',
      'Breathable Construction',
      'Custom Color Matching Available',
      'Lightweight Design',
      'Instant Volume Boost'
    ],
    specifications: [
      { name: 'Base Size', value: '5" x 5.5"' },
      { name: 'Length', value: '12 inches' },
      { name: 'Density', value: '120%' },
      { name: 'Hair Origin', value: 'European Virgin Hair' },
      { name: 'Attachment', value: '6 Pressure-Sensitive Clips' },
      { name: 'Base Type', value: 'Silk Top with Lace Perimeter' },
      { name: 'Coverage Area', value: 'Crown/Top Head' },
      { name: 'Hair Grade', value: '8A Premium Grade' }
    ],
    reviews: [
      {
        id: 'r6',
        customerName: 'Catherine Miller',
        rating: 5,
        title: 'Life-changing product!',
        comment: 'This topper has given me back my confidence. The silk base is completely undetectable and blends perfectly with my natural hair. I can\'t believe how natural it looks!',
        date: '2024-12-07',
        verified: true,
        helpful: 26
      }
    ],
    rating: 4.8,
    reviewCount: 42,
    tags: ['topper', 'silk-base', 'crown-coverage', 'european-hair'],
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    colors: ['Jet Black (#1)', 'Natural Black (#1B)', 'Dark Brown (#2)', 'Medium Brown (#4)', 'Light Brown (#6)', 'Dark Blonde (#8)', 'Medium Blonde (#14)'],
    sizes: ['8"', '10"', '12"', '14"', '16"'],
    materials: ['European Virgin Hair', 'Silk Base', 'Lace Perimeter', 'Pressure-Sensitive Clips'],
    careInstructions: [
      'Brush gently before and after each wear',
      'Wash every 15-20 wears with gentle products',
      'Remove clips carefully to avoid damage',
      'Air dry on flat surface',
      'Style with minimal heat',
      'Store in original packaging when not in use'
    ],
    shippingInfo: 'Free discreet shipping. Arrives in unmarked packaging.',
    returnPolicy: '30-day return policy with professional fitting consultation.'
  },

  // HAIR EXTENSIONS
  {
    id: 'ext-001',
    name: 'Luxury Clip-In Extension Set - Remy Human Hair',
    description: 'Professional 8-piece clip-in extension set in premium Remy human hair for instant length and volume',
    longDescription: 'Transform your look instantly with our professional 8-piece clip-in extension set. Made from 100% Remy human hair with intact cuticles for maximum longevity and natural appearance. Each piece features secure pressure-sensitive clips and double-weft construction for added durability.',
    price: 295,
    originalPrice: 345,
    category: 'extensions',
    subcategory: 'Clip-In',
    brand: 'Berenice Extensions',
    inStock: true,
    stockQuantity: 28,
    images: [
      'https://images.unsplash.com/photo-1559395195-5d6c53a0fce4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559395168-8b5e6b950e03?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=600&fit=crop'
    ],
    features: [
      '8-Piece Complete Set',
      '100% Remy Human Hair',
      'Double-Weft Construction',
      'Pressure-Sensitive Clips',
      'Heat Resistant to 200°C',
      'Cuticle-Aligned Hair',
      'Tangle-Free Guarantee',
      'Color-Matched Clips'
    ],
    specifications: [
      { name: 'Pieces', value: '8 wefts (1x8", 2x6", 2x4", 2x3", 1x2")' },
      { name: 'Length', value: '20 inches' },
      { name: 'Weight', value: '160g' },
      { name: 'Hair Origin', value: 'Remy Human Hair' },
      { name: 'Clips', value: '18 clips total' },
      { name: 'Texture', value: 'Natural Straight' },
      { name: 'Hair Grade', value: '7A Premium Grade' },
      { name: 'Weft Type', value: 'Double Machine Weft' }
    ],
    reviews: [
      {
        id: 'r7',
        customerName: 'Isabella Garcia',
        rating: 5,
        title: 'Amazing quality extensions!',
        comment: 'These blend seamlessly with my natural hair. The clips are so secure and comfortable. I\'ve been using them for 6 months and they still look brand new!',
        date: '2024-12-09',
        verified: true,
        helpful: 19
      }
    ],
    rating: 4.7,
    reviewCount: 83,
    tags: ['extensions', 'clip-in', 'remy-hair', 'volume-length'],
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Jet Black (#1)', 'Natural Black (#1B)', 'Dark Brown (#2)', 'Medium Brown (#4)', 'Light Brown (#6)', 'Dark Blonde (#8)', 'Medium Blonde (#14)', 'Light Blonde (#16)', 'Platinum Blonde (#60)'],
    sizes: ['16"', '18"', '20"', '22"', '24"'],
    materials: ['Remy Human Hair', 'Pressure-Sensitive Clips', 'Double Machine Weft'],
    careInstructions: [
      'Brush before and after each use with extension brush',
      'Wash every 15-20 wears with sulfate-free products',
      'Apply heat protectant before using hot tools',
      'Remove before sleeping to prevent tangling',
      'Store in original box or extension hanger',
      'Avoid excessive brushing when wet'
    ],
    shippingInfo: 'Free shipping on orders over £200. Gift packaging available.',
    returnPolicy: '14-day return policy. Extensions must be in original condition.'
  },

  // ACCESSORIES
  {
    id: 'acc-001',
    name: 'Professional Wig Stand with Adjustable Height',
    description: 'Premium adjustable wig stand with cork head for proper wig storage and styling',
    longDescription: 'Maintain your wig investments with our professional-grade adjustable wig stand. Features a natural cork head that holds wigs securely without causing indentations. The sturdy weighted base ensures stability during styling, while the adjustable height accommodates various wig lengths.',
    price: 45,
    category: 'accessories',
    subcategory: 'Storage',
    brand: 'Berenice Professional',
    inStock: true,
    stockQuantity: 35,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=600&h=600&fit=crop'
    ],
    features: [
      'Adjustable Height (20"-26")',
      'Natural Cork Head',
      'Weighted Steel Base',
      'Non-Slip Base Pad',
      'Professional Grade',
      'Collapsible Design',
      'Easy Assembly',
      'Universal Fit'
    ],
    specifications: [
      { name: 'Height Range', value: '20" - 26"' },
      { name: 'Head Circumference', value: '21" - 24"' },
      { name: 'Base Diameter', value: '10 inches' },
      { name: 'Weight', value: '3.2 lbs' },
      { name: 'Material', value: 'Chrome Steel & Cork' },
      { name: 'Base Type', value: 'Weighted with Non-Slip Pad' },
      { name: 'Assembly', value: 'Tool-free Setup' },
      { name: 'Finish', value: 'Chrome Plated' }
    ],
    reviews: [
      {
        id: 'r8',
        customerName: 'Victoria Adams',
        rating: 5,
        title: 'Essential wig accessory!',
        comment: 'Sturdy and well-made. The cork head is gentle on my wigs and the adjustable height is perfect. Great value for the quality!',
        date: '2024-12-11',
        verified: true,
        helpful: 14
      }
    ],
    rating: 4.6,
    reviewCount: 127,
    tags: ['stand', 'storage', 'professional', 'adjustable'],
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    materials: ['Chrome-plated steel', 'Natural cork', 'Non-slip rubber'],
    careInstructions: [
      'Wipe clean with damp cloth',
      'Avoid harsh chemicals on chrome finish',
      'Store in dry place when not in use',
      'Handle cork head gently to prevent cracking'
    ],
    shippingInfo: 'Standard shipping included. Protective packaging for safe delivery.',
    returnPolicy: '30-day return policy if unused and in original packaging.'
  },

  // CARE PRODUCTS
  {
    id: 'care-001',
    name: 'Professional Wig Shampoo & Conditioner Set',
    description: 'Gentle sulfate-free care system specially formulated for human hair and synthetic wigs',
    longDescription: 'Our professional wig care system is specially formulated to cleanse and nourish both human hair and synthetic wigs. The sulfate-free shampoo gently removes buildup while preserving hair integrity, while the lightweight conditioner adds moisture without weighing down the hair.',
    price: 55,
    category: 'care-products',
    subcategory: 'Cleansing',
    brand: 'Berenice Care',
    inStock: true,
    stockQuantity: 42,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1620916297107-e59a17bba096?w=600&h=600&fit=crop'
    ],
    features: [
      'Sulfate-Free Formula',
      'Safe for All Wig Types',
      'pH Balanced (5.5-6.5)',
      'Color Protection',
      'UV Protection',
      'Paraben Free',
      'Gentle Cleansing Agents',
      'Professional Grade'
    ],
    specifications: [
      { name: 'Shampoo Volume', value: '250ml' },
      { name: 'Conditioner Volume', value: '250ml' },
      { name: 'Formula Type', value: 'Sulfate & Paraben Free' },
      { name: 'pH Level', value: '5.5-6.5' },
      { name: 'Hair Type', value: 'All Wig Types' },
      { name: 'Scent', value: 'Light Floral' },
      { name: 'Shelf Life', value: '36 months unopened' },
      { name: 'Origin', value: 'Made in UK' }
    ],
    reviews: [
      {
        id: 'r9',
        customerName: 'Hannah Foster',
        rating: 5,
        title: 'Best wig care products!',
        comment: 'These products keep my wigs looking fresh and new. The shampoo cleans without stripping and the conditioner makes the hair so soft. Will definitely repurchase!',
        date: '2024-12-06',
        verified: true,
        helpful: 22
      }
    ],
    rating: 4.8,
    reviewCount: 96,
    tags: ['shampoo', 'conditioner', 'care', 'sulfate-free'],
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    materials: ['Purified Water', 'Coconut-derived Cleansers', 'Natural Conditioning Agents', 'UV Filters'],
    careInstructions: [
      'Store in cool, dry place',
      'Keep bottles tightly closed',
      'Avoid direct sunlight',
      'Use within 12 months of opening',
      'Shake conditioner before use'
    ],
    shippingInfo: 'Standard shipping. Special packaging to prevent leaks.',
    returnPolicy: '30-day return policy if unopened and sealed.'
  },

  // STYLING TOOLS
  {
    id: 'tool-001',
    name: 'Professional Wig Brush Set - 3 Piece',
    description: 'Complete brush set designed specifically for wig care with loop brush, wide-tooth comb, and detangling brush',
    longDescription: 'This essential 3-piece brush set is specifically designed for wig maintenance. The loop brush gently detangles without pulling, the wide-tooth comb works through wet hair safely, and the specialized detangling brush smooths and styles without damage.',
    price: 35,
    category: 'styling-tools',
    subcategory: 'Brushes',
    brand: 'Berenice Tools',
    inStock: true,
    stockQuantity: 48,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&h=600&fit=crop'
    ],
    features: [
      '3-Piece Professional Set',
      'Loop Brush for Gentle Detangling',
      'Wide-Tooth Comb for Wet Hair',
      'Specialized Wig Brush',
      'Anti-Static Properties',
      'Ergonomic Handles',
      'Suitable for All Wig Types',
      'Travel-Friendly Size'
    ],
    specifications: [
      { name: 'Set Contents', value: 'Loop brush, Wide-tooth comb, Detangling brush' },
      { name: 'Material', value: 'High-quality plastic and nylon' },
      { name: 'Brush Length', value: '8 inches' },
      { name: 'Comb Length', value: '7 inches' },
      { name: 'Loop Brush', value: '6 inches with flexible loops' },
      { name: 'Handle Type', value: 'Ergonomic Non-Slip' },
      { name: 'Color', value: 'Professional Black' },
      { name: 'Weight', value: '150g (set)' }
    ],
    reviews: [
      {
        id: 'r10',
        customerName: 'Lauren Mitchell',
        rating: 4,
        title: 'Great wig care set',
        comment: 'These brushes work so much better than regular brushes on my wigs. The loop brush is genius for detangling without damage. Essential tools!',
        date: '2024-12-04',
        verified: true,
        helpful: 18
      }
    ],
    rating: 4.5,
    reviewCount: 74,
    tags: ['brushes', 'tools', 'detangling', 'professional'],
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    materials: ['High-grade plastic', 'Flexible nylon bristles', 'Non-slip rubber grip'],
    careInstructions: [
      'Clean brushes after each use',
      'Wash with warm soapy water weekly',
      'Air dry completely before storing',
      'Replace when bristles show wear',
      'Store in dry place'
    ],
    shippingInfo: 'Standard shipping included. Compact packaging.',
    returnPolicy: '30-day return policy if unused.'
  }
]

// Helper functions
export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured)
}

export const getBestsellerProducts = () => {
  return products.filter(product => product.isBestseller)
}

export const getNewProducts = () => {
  return products.filter(product => product.isNew)
}

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
