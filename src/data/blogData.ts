export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  author: string
  publishDate: string
  readTime: number
  tags: string[]
  featured: boolean
  imageUrl?: string
}

export type BlogCategory = 'membership' | 'bespoke-wigs' | 'ready-made' | 'education' | 'care-tips' | 'styling'

export const blogCategories: { id: BlogCategory; name: string; description: string }[] = [
  {
    id: 'membership',
    name: 'Membership',
    description: 'Updates and benefits for our member community'
  },
  {
    id: 'bespoke-wigs',
    name: 'Bespoke Wigs & Toppers',
    description: 'Custom-made hairpiece insights and stories'
  },
  {
    id: 'ready-made',
    name: 'Ready-Made Collection',
    description: 'Our curated selection of premium wigs and toppers'
  },
  {
    id: 'education',
    name: 'Education & Training',
    description: 'Professional courses and learning resources'
  },
  {
    id: 'care-tips',
    name: 'Care & Maintenance',
    description: 'Expert tips for maintaining your hairpieces'
  },
  {
    id: 'styling',
    name: 'Styling Guide',
    description: 'Creative styling ideas and techniques'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Measuring Your Head for a Perfect Wig Fit',
    excerpt: 'Learn the professional techniques our experts use to ensure your custom wig fits perfectly every time.',
    content: `Getting the perfect fit for your wig starts with accurate measurements. In this comprehensive guide, we'll walk you through the exact process our master craftspeople use at Berenice London.

## Why Accurate Measurements Matter

A properly fitted wig not only looks more natural but also feels more comfortable and secure. Poor measurements can lead to slipping, discomfort, or an unnatural appearance.

## Essential Tools You'll Need

- A flexible measuring tape
- A mirror
- A pen and paper
- A friend to help (optional but recommended)

## Step-by-Step Measurement Process

### 1. Circumference Measurement
Place the measuring tape around your head, about 1/8 inch above your ears and across your forehead. This gives you the overall head circumference.

### 2. Front to Back Measurement
Measure from your natural hairline at the forehead to the nape of your neck, going over the crown of your head.

### 3. Ear to Ear Measurement
Measure from the top of one ear, over the crown, to the top of the other ear.

### 4. Temple to Temple
Measure across your forehead from temple to temple, about 1 inch above your eyebrows.

## Tips for Accuracy

- Take measurements when your hair is flat against your head
- Don't pull the tape too tight or too loose
- Take each measurement twice to ensure accuracy
- Have someone help you for the most precise results

## What to Do With Your Measurements

Once you have all your measurements, our team will use these to create your custom pattern. We'll also discuss your lifestyle, styling preferences, and any specific needs you might have.

Remember, at Berenice London, we're here to guide you through every step of the process. Book a consultation with our experts to ensure your measurements are perfect and discuss your custom wig options.`,
    category: 'education',
    author: 'Sarah Mitchell',
    publishDate: '2024-01-15',
    readTime: 5,
    tags: ['measurements', 'fitting', 'custom-wigs', 'how-to'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Washing Your Hairpiece: A Complete Care Guide',
    excerpt: 'Proper washing techniques to maintain the beauty and longevity of your premium hairpiece.',
    content: `Your hairpiece is an investment in your confidence and appearance. Proper care, especially washing, is essential to maintain its beauty and extend its lifespan.

## How Often to Wash

The frequency of washing depends on several factors:
- How often you wear your hairpiece
- Your lifestyle and activities
- Environmental factors
- Hair type (synthetic vs. human hair)

Generally, wash your hairpiece every 6-8 wears for human hair pieces, and every 10-12 wears for synthetic ones.

## What You'll Need

- Specialized wig shampoo (never use regular hair shampoo)
- Wig conditioner
- A wide-tooth comb
- A wig stand or mannequin head
- Clean towels
- Cool water

## Step-by-Step Washing Process

### Preparation
1. Gently brush your hairpiece to remove tangles
2. Fill a basin with cool water
3. Add a small amount of wig shampoo

### Washing
1. Immerse the hairpiece in the water
2. Gently swish for 2-3 minutes
3. Don't rub or scrub the hair
4. Rinse thoroughly with cool water

### Conditioning
1. Apply wig conditioner from mid-length to ends
2. Leave for 2-3 minutes
3. Rinse thoroughly

### Drying
1. Gently squeeze out excess water (don't wring)
2. Pat dry with a clean towel
3. Place on a wig stand to air dry
4. Never use heat unless the piece is specifically designed for it

## Pro Tips

- Always wash in cool water to prevent damage
- Use products specifically designed for wigs
- Be gentle throughout the process
- Store properly when not in use

Following these steps will help ensure your Berenice London hairpiece maintains its premium quality and appearance for years to come.`,
    category: 'care-tips',
    author: 'Emma Thompson',
    publishDate: '2024-01-10',
    readTime: 4,
    tags: ['hair-care', 'washing', 'maintenance', 'hairpiece'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'New Premium Membership Benefits: What You Need to Know',
    excerpt: 'Discover the exciting new benefits we\'ve added to our Premium and Elite membership tiers.',
    content: `We're thrilled to announce exciting new benefits for our Premium and Elite members, effective immediately. These enhancements reflect our commitment to providing exceptional value and service to our community.

## New Premium Membership Benefits

### Monthly Styling Consultations
Premium members now receive monthly virtual styling consultations with our expert team. Perfect for seasonal updates or special occasion styling.

### Exclusive Product Access
Get early access to new arrivals and limited-edition pieces before they're available to the general public.

### Enhanced Discount Structure
- 15% off all services (increased from 10%)
- 20% off ready-made collection
- Free shipping on all orders

## Elite Membership Enhancements

### Personal Stylist Assignment
Each Elite member now gets a dedicated personal stylist for ongoing support and customized recommendations.

### Quarterly In-Person Sessions
Enjoy quarterly in-person styling and maintenance sessions at our London studio.

### VIP Event Access
Exclusive invitations to styling workshops, fashion shows, and member-only events.

## How to Upgrade

Current Basic members can upgrade to Premium or Elite at any time through their member dashboard. Contact our team for personalized upgrade recommendations based on your needs.

## Coming Soon

We're also working on:
- Mobile app for easier booking and communication
- Virtual reality wig try-on technology
- Expanded educational content library

Thank you for being part of the Berenice London community. Your membership makes all these improvements possible.`,
    category: 'membership',
    author: 'Berenice London Team',
    publishDate: '2024-01-08',
    readTime: 3,
    tags: ['membership', 'benefits', 'premium', 'elite'],
    featured: false
  },
  {
    id: '4',
    title: 'The Art of Bespoke Wig Creation: Behind the Scenes',
    excerpt: 'Take a journey into our workshop and discover the meticulous craftsmanship behind every custom piece.',
    content: `Creating a bespoke wig is both an art and a science. Each piece that leaves our London workshop represents hundreds of hours of skilled craftsmanship and attention to detail.

## The Design Process

Every bespoke piece begins with a comprehensive consultation. We discuss:
- Your lifestyle and daily routine
- Color preferences and skin tone
- Desired length and style
- Specific requirements or concerns

## Hair Selection

We source only the finest materials:
- Premium European hair for the most natural look
- Ethically sourced materials
- Multiple color matching for perfect blends
- Quality testing for durability and appearance

## The Crafting Process

### Foundation Creation
The wig cap is hand-crafted to your exact measurements, ensuring a perfect fit that's both comfortable and secure.

### Hair Insertion
Each hair is individually hand-tied using traditional techniques passed down through generations of master craftspeople.

### Styling and Finishing
The final styling brings your vision to life, with attention to natural growth patterns and movement.

## Quality Assurance

Before delivery, every piece undergoes rigorous quality checks:
- Fit verification
- Color accuracy
- Movement and naturalness
- Durability testing

## The Result

The result is a truly unique piece that not only meets but exceeds your expectations. A bespoke wig from Berenice London isn't just a hairpiece—it's a transformation that restores confidence and enhances your natural beauty.

Ready to begin your bespoke journey? Book a consultation with our master craftspeople today.`,
    category: 'bespoke-wigs',
    author: 'Master Craftsman James Wilson',
    publishDate: '2024-01-05',
    readTime: 6,
    tags: ['bespoke', 'craftsmanship', 'custom-wigs', 'process'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Spring 2024 Ready-Made Collection Preview',
    excerpt: 'Get an exclusive first look at our stunning new ready-made pieces for the upcoming season.',
    content: `Spring brings new beginnings, and our Spring 2024 Ready-Made Collection embodies fresh sophistication and effortless elegance.

## Collection Highlights

### Natural Textures
This season emphasizes natural movement and texture, with pieces that complement rather than mask your natural beauty.

### Color Palette
- Warm honey blondes
- Rich chocolate browns
- Sophisticated salt-and-pepper grays
- Bold copper reds for the adventurous

### Trending Styles

#### The "London Bob"
A chic, shoulder-length cut with subtle layers that works for any occasion.

#### "Garden Party Waves"
Romantic, flowing waves perfect for spring and summer events.

#### "Executive Elegance"
Professional styles that command respect in any boardroom.

## Technical Innovations

### Improved Cap Construction
Our new cap design offers:
- Better breathability for warmer weather
- Enhanced comfort for all-day wear
- More secure fit with adjustable sizing

### Advanced Hair Processing
New treatment methods ensure:
- Longer-lasting color
- Improved texture retention
- Enhanced shine and movement

## Availability

The collection launches February 15th, with Premium and Elite members getting early access starting February 1st.

Each piece comes with:
- Professional styling guide
- Care instruction kit
- 6-month warranty
- Complimentary initial styling session

Visit our showroom or book a virtual consultation to see these beautiful pieces and find your perfect match for spring.`,
    category: 'ready-made',
    author: 'Design Team Lead Maria Rodriguez',
    publishDate: '2024-01-03',
    readTime: 4,
    tags: ['spring-2024', 'ready-made', 'collection', 'new-arrivals'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0e501ba2fe0?w=800&h=400&fit=crop'
  },
  {
    id: '6',
    title: '5 Essential Styling Tools Every Wig Owner Should Have',
    excerpt: 'Build your styling toolkit with these professional-grade tools recommended by our expert stylists.',
    content: `The right tools make all the difference in maintaining and styling your wig. Here are the five essential items every wig owner should have in their toolkit.

## 1. Wide-Tooth Comb

### Why You Need It
A wide-tooth comb is gentle on wig fibers and prevents unnecessary tension that can cause shedding or damage.

### How to Use
- Always start combing from the ends
- Work your way up to the roots gradually
- Use gentle, downward motions

### Our Recommendation
Look for combs made from seamless materials to prevent snagging.

## 2. Wig Brush with Ball-Tipped Bristles

### Benefits
- Reduces static and flyaways
- Distributes natural oils evenly
- Gentle on both synthetic and human hair

### Best Practices
- Brush when the wig is dry
- Use long, smooth strokes
- Clean your brush regularly

## 3. Wig Stand or Mannequin Head

### Essential for
- Proper storage between wears
- Styling and maintenance
- Air drying after washing

### Storage Tips
- Choose a stand that matches your head size
- Store in a cool, dry place
- Cover with a silk scarf to prevent dust

## 4. Heat Protectant Spray

### When to Use
Before any heat styling on human hair wigs (never use heat on synthetic unless specifically designed for it).

### Protection Benefits
- Prevents heat damage
- Maintains hair integrity
- Extends wig lifespan

## 5. Specialized Wig Shampoo and Conditioner

### Why Regular Products Don't Work
Regular hair products can:
- Strip color from wig fibers
- Build up on the cap
- Reduce the wig's lifespan

### Choosing the Right Products
- Look for sulfate-free formulas
- Choose products designed for your wig type
- Consider professional-grade options

## Bonus Tool: Silk Scarf

### Multiple Uses
- Sleeping protection
- Storage covering
- Gentle drying aid

## Investment in Longevity

Quality tools are an investment in your wig's longevity and appearance. At Berenice London, we offer a complete styling toolkit designed specifically for our pieces.

Ready to upgrade your wig care routine? Contact our team for personalized tool recommendations based on your specific needs and wig type.`,
    category: 'styling',
    author: 'Senior Stylist Rachel Green',
    publishDate: '2023-12-28',
    readTime: 5,
    tags: ['styling-tools', 'wig-care', 'maintenance', 'professional-tips'],
    featured: false
  }
]
