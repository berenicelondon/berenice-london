export interface GalleryItem {
  id: string
  title: string
  description: string
  category: GalleryCategory
  beforeImage: string
  afterImage: string
  clientTestimonial?: string
  clientName?: string
  serviceType: string
  featured: boolean
  tags: string[]
}

export type GalleryCategory = 'bespoke-wigs' | 'ready-made' | 'styling' | 'color-matching' | 'hair-loss' | 'special-occasion'

export const galleryCategories: { id: GalleryCategory; name: string; description: string }[] = [
  {
    id: 'bespoke-wigs',
    name: 'Bespoke Wigs',
    description: 'Custom-made transformations crafted to perfection'
  },
  {
    id: 'ready-made',
    name: 'Ready-Made Collection',
    description: 'Stunning results with our curated collection'
  },
  {
    id: 'styling',
    name: 'Styling & Cuts',
    description: 'Expert styling and cutting services'
  },
  {
    id: 'color-matching',
    name: 'Color Matching',
    description: 'Perfect color matches for natural beauty'
  },
  {
    id: 'hair-loss',
    name: 'Hair Loss Solutions',
    description: 'Compassionate solutions for hair loss concerns'
  },
  {
    id: 'special-occasion',
    name: 'Special Occasions',
    description: 'Glamorous looks for life\'s special moments'
  }
]

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Complete Hair Transformation',
    description: 'A beautiful bespoke wig transformation that restored confidence and natural beauty.',
    category: 'bespoke-wigs',
    beforeImage: 'https://images.unsplash.com/photo-1494790108755-2616c667e69c?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&face',
    clientTestimonial: 'I never thought I could look this good again. The team at Berenice London gave me back my confidence.',
    clientName: 'Sarah M.',
    serviceType: 'Bespoke Wig',
    featured: true,
    tags: ['hair-loss', 'confidence', 'natural-look']
  },
  {
    id: '2',
    title: 'Elegant Length Extension',
    description: 'Seamless integration of length and volume for a stunning everyday look.',
    category: 'ready-made',
    beforeImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop&face',
    clientTestimonial: 'The quality is incredible - no one can tell it\'s not my natural hair!',
    clientName: 'Emma L.',
    serviceType: 'Ready-Made Topper',
    featured: true,
    tags: ['volume', 'length', 'natural']
  },
  {
    id: '3',
    title: 'Color Correction Masterpiece',
    description: 'Expert color matching that blends seamlessly with natural hair.',
    category: 'color-matching',
    beforeImage: 'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop&face',
    clientTestimonial: 'The color match is absolutely perfect. Even my hairdresser was amazed!',
    clientName: 'Rachel K.',
    serviceType: 'Color Matching Service',
    featured: false,
    tags: ['color', 'natural-blend', 'seamless']
  },
  {
    id: '4',
    title: 'Chemotherapy Support',
    description: 'Compassionate care and beautiful results during a challenging time.',
    category: 'hair-loss',
    beforeImage: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&face',
    clientTestimonial: 'During my treatment, Berenice London helped me feel beautiful and strong.',
    clientName: 'Maria C.',
    serviceType: 'Medical Hair Loss Support',
    featured: true,
    tags: ['medical', 'support', 'comfort']
  },
  {
    id: '5',
    title: 'Wedding Day Glamour',
    description: 'A stunning bridal transformation for the most important day.',
    category: 'special-occasion',
    beforeImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop&face',
    clientTestimonial: 'I felt like a princess on my wedding day. Thank you for making my dreams come true!',
    clientName: 'Jennifer B.',
    serviceType: 'Bridal Hair Solutions',
    featured: true,
    tags: ['wedding', 'bridal', 'special-occasion']
  },
  {
    id: '6',
    title: 'Professional Styling',
    description: 'Sophisticated styling for the modern professional woman.',
    category: 'styling',
    beforeImage: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1494790108755-2616c667e69c?w=600&h=600&fit=crop&face',
    clientTestimonial: 'Perfect for my corporate image - professional yet elegant.',
    clientName: 'Diana R.',
    serviceType: 'Professional Styling',
    featured: false,
    tags: ['professional', 'corporate', 'sleek']
  },
  {
    id: '7',
    title: 'Alopecia Transformation',
    description: 'A life-changing transformation for a client with alopecia.',
    category: 'hair-loss',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=600&fit=crop&face',
    clientTestimonial: 'For the first time in years, I look in the mirror and smile.',
    clientName: 'Amanda T.',
    serviceType: 'Alopecia Solutions',
    featured: true,
    tags: ['alopecia', 'medical', 'confidence']
  },
  {
    id: '8',
    title: 'Vintage Hollywood Glamour',
    description: 'Classic Hollywood-inspired styling for a special photoshoot.',
    category: 'special-occasion',
    beforeImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop&face',
    afterImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop&face',
    clientTestimonial: 'I felt like a movie star! The attention to detail was incredible.',
    clientName: 'Victoria S.',
    serviceType: 'Photoshoot Styling',
    featured: false,
    tags: ['vintage', 'glamour', 'photoshoot']
  }
]
