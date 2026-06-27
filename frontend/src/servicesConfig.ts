// ── Static config for the public Services gallery page ───────────────────
// Images are served from /public folder (Vite static assets).
// This file is the source of truth for the public-facing portfolio browser.
// The Admin panel uses the MongoDB backend separately.

export interface GalleryImage {
  image: string;   // path relative to /public
  title: string;
  description?: string;
}

export interface SubService {
  title: string;
  coverImage: string;
  description: string;
  features?: string[];
  gallery: GalleryImage[];
}

export interface ParentService {
  title: string;
  coverImage: string;
  subServices: SubService[];
}

export const servicesConfig: ParentService[] = [
  /* ═══════════════════════════════════════════════════════════════
     1. INTERIORS
  ═══════════════════════════════════════════════════════════════ */
  {
    title: 'Interiors',
    coverImage: '/InteriorDesigning/cover.jpg',
    subServices: [
      {
        title: 'Bedrooms',
        coverImage: '/InteriorDesigning/Bedrooms/cover.jpeg',
        description: 'Luxurious and personalised bedroom interiors crafted for comfort, elegance, and restful living. From master suites to cosy child rooms, every space tells its own story.',
        features: ['Custom Headboards', 'Mood Lighting', 'Built-in Storage', 'Premium Finishes'],
        gallery: [
          { image: '/InteriorDesigning/Bedrooms/Master bedroom.jpeg', title: 'Master Bedroom', description: 'Luxurious master bedroom with custom headboard and modern lighting.' },
          { image: '/InteriorDesigning/Bedrooms/Guest bedroom.jpeg', title: 'Guest Bedroom', description: 'Cozy and inviting guest room designed for premium comfort.' },
          { image: '/InteriorDesigning/Bedrooms/Small Bedroom.jpg', title: 'Small Bedroom', description: 'Space-optimized bedroom design maximizing utility and style.' },
          { image: '/InteriorDesigning/Bedrooms/Study room.jpeg', title: 'Study Room', description: 'Productive and peaceful study space with custom shelving.' },
          { image: '/InteriorDesigning/Bedrooms/child bedroom.jpeg', title: 'Child Bedroom', description: 'Playful yet organized bedroom space customized for kids.' },
        ],
      },
      {
        title: 'Art Deco',
        coverImage: '/InteriorDesigning/Art Deco/Cover.jpeg',
        description: 'Bold geometric patterns, rich colours, and opulent materials define our Art Deco interiors. A timeless fusion of luxury and modernist design principles.',
        features: ['Geometric Patterns', 'Gold Accents', 'Rich Textures', 'Statement Lighting'],
        gallery: [
          { image: '/InteriorDesigning/Art Deco/Cover.jpeg', title: 'Art Deco Interior', description: 'Classic Art Deco design with bold geometric patterns and luxurious finishes.' },
        ],
      },
      {
        title: 'Classic Interior',
        coverImage: '/InteriorDesigning/Classic Interior/Cover.jpeg',
        description: 'Timeless elegance with traditional craftsmanship. Classic interiors feature ornate detailing, rich woods, and a warm, welcoming ambiance.',
        features: ['Ornate Mouldings', 'Rich Wood Finishes', 'Antique Accents', 'Warm Palettes'],
        gallery: [
          { image: '/InteriorDesigning/Classic Interior/Cover.jpeg', title: 'Classic Interior', description: 'Timeless classical interior with rich ornamental detailing.' },
        ],
      },
      {
        title: 'Club House Designing',
        coverImage: '/InteriorDesigning/Club House Designing/Cover.jpeg',
        description: 'Sophisticated community and leisure spaces that combine comfort with premium aesthetics. Perfect for residential complexes and corporate campuses.',
        features: ['Premium Lounges', 'Event-Ready Layout', 'Acoustic Design', 'Signature Lighting'],
        gallery: [
          { image: '/InteriorDesigning/Club House Designing/Modern Club house.jpeg', title: 'Modern Club House', description: 'Sleek and contemporary community and club lounge interiors.' },
          { image: '/InteriorDesigning/Club House Designing/Rustic lodge club house design.jpeg', title: 'Rustic Lodge Club House', description: 'Warm timber and stone accents for a cozy club atmosphere.' },
          { image: '/InteriorDesigning/Club House Designing/colonial club house design.jpeg', title: 'Colonial Club House', description: 'Elegant and grand club house design with classical architecture.' },
        ],
      },
      {
        title: 'Contemporary Interior',
        coverImage: '/InteriorDesigning/Contemporary Interior/Cover.jpeg',
        description: 'Clean lines, open spaces and a neutral palette define contemporary interiors. Functional art that adapts to modern living without sacrificing beauty.',
        features: ['Open Plan Living', 'Neutral Palettes', 'Natural Materials', 'Minimal Clutter'],
        gallery: [
          { image: '/InteriorDesigning/Contemporary Interior/Cover.jpeg', title: 'Contemporary Interior', description: 'Modern open-plan living with clean lines and natural materials.' },
        ],
      },
      {
        title: 'Grand Lobby Designs',
        coverImage: '/InteriorDesigning/Grand Lobby Designs/Cover.jpeg',
        description: 'Make a grand first impression with statement lobby designs. Expansive entrances crafted to set the tone for the entire building.',
        features: ['Statement Entrances', 'Branded Environments', 'Artistic Partitions', 'Premium Flooring'],
        gallery: [
          { image: '/InteriorDesigning/Grand Lobby Designs/modern hotel lobby design.jpeg', title: 'Modern Hotel Lobby', description: 'Spacious and welcoming entrance design for hotels and high-rise buildings.' },
          { image: '/InteriorDesigning/Grand Lobby Designs/partition type design.jpeg', title: 'Partition Type Design', description: 'Artistic partition integration for aesthetic zoning inside lobbies.' },
        ],
      },
      {
        title: 'Hollywood Glam Interior',
        coverImage: '/InteriorDesigning/Hollywood Glam Interior/Cover.jpeg',
        description: 'Dazzling, glamorous interiors inspired by old Hollywood. Think mirrored surfaces, velvet upholstery, and dramatic statement pieces.',
        features: ['Mirrored Accents', 'Velvet Upholstery', 'Crystal Chandeliers', 'Bold Contrasts'],
        gallery: [
          { image: '/InteriorDesigning/Hollywood Glam Interior/Cover.jpeg', title: 'Hollywood Glam Interior', description: 'Dramatic, shimmering interior with plush finishes.' },
        ],
      },
      {
        title: 'Home & Furniture Collection',
        coverImage: '/InteriorDesigning/Home & Furniture Collection/Cover.jpeg',
        description: 'Bespoke furniture pieces tailored to your exact aesthetic and dimensions. Handcrafted sofas, tables, cabinets, and custom joinery.',
        features: ['Custom Joinery', 'Premium Leathers & Fabrics', 'Ergonomic Crafting', 'Statement Tables'],
        gallery: [
          { image: '/InteriorDesigning/Home & Furniture Collection/Center Coffee Table Design.jpeg', title: 'Center Coffee Table', description: 'Bespoke central coffee table with luxury materials.' },
          { image: '/InteriorDesigning/Home & Furniture Collection/Living Dining Room partition design.jpeg', title: 'Living Dining Partition', description: 'Aesthetic room divider separating living and dining zones.' },
          { image: '/InteriorDesigning/Home & Furniture Collection/Shoe rack design.jpeg', title: 'Custom Shoe Rack', description: 'Organized, ventilated, and concealed shoe storage furniture.' },
          { image: '/InteriorDesigning/Home & Furniture Collection/Tv Cabinet design.jpeg', title: 'TV Cabinet Console', description: 'Modern entertainment center with hidden cable management.' },
        ],
      },
      {
        title: 'Industrial Interior',
        coverImage: '/InteriorDesigning/Industrial Interior/Cover.jpeg',
        description: 'Exposed brick, steel beams, and raw concrete textures blended into sophisticated urban living spaces.',
        features: ['Exposed Brick', 'Metal Accents', 'Reclaimed Wood', 'Open Ducting'],
        gallery: [
          { image: '/InteriorDesigning/Industrial Interior/Cover.jpeg', title: 'Industrial Interior', description: 'Urban loft style featuring raw steel and weathered brick textures.' },
        ],
      },
      {
        title: 'Luxury Hotel Style',
        coverImage: '/InteriorDesigning/Luxury Hotel Style/Cover.jpeg',
        description: 'Bring five-star resort elegance into residential projects. Opulent suites, spa bathrooms, and grand dining areas.',
        features: ['Resort Amenities', 'Spa Bathrooms', 'Opulent Lighting', 'Custom Drapery'],
        gallery: [
          { image: '/InteriorDesigning/Luxury Hotel Style/Cover.jpeg', title: 'Luxury Hotel Suite', description: 'Five-star hotel suite atmosphere with high-end furnishings.' },
        ],
      },
      {
        title: 'Luxury Modern Interior',
        coverImage: '/InteriorDesigning/Luxury Modern Interior/Cover.jpeg',
        description: 'High-end contemporary design highlighting premium marble, rich wood veneers, and integrated smart home systems.',
        features: ['Marble Surfaces', 'Smart Automation', 'Custom Millwork', 'Designer Lighting'],
        gallery: [
          { image: '/InteriorDesigning/Luxury Modern Interior/Luxury Modern Interior1.jpeg', title: 'Luxury Modern Living', description: 'Spacious living room with marble feature walls.' },
          { image: '/InteriorDesigning/Luxury Modern Interior/Luxury Modern Interior2.jpeg', title: 'Luxury Modern Lounge', description: 'Warm ambient lighting and tailored seating.' },
          { image: '/InteriorDesigning/Luxury Modern Interior/Luxury Modern Interior3.jpeg', title: 'Luxury Modern Suite', description: 'Refined modern suite showcasing high craftsmanship.' },
        ],
      },
      {
        title: 'Mid-Century Modern',
        coverImage: '/InteriorDesigning/Mid-Century Modern/Cover.jpeg',
        description: 'Retro 1950s functionality meets organic shapes. Teak wood, tapered legs, and iconic furniture silhouettes.',
        features: ['Teak Woodwork', 'Organic Silhouettes', 'Bold Accent Colors', 'Tapered Furniture Legs'],
        gallery: [
          { image: '/InteriorDesigning/Mid-Century Modern/Mid-Century Modern1.jpeg', title: 'Mid-Century Living', description: 'Iconic mid-century furniture and warm teak tones.' },
          { image: '/InteriorDesigning/Mid-Century Modern/Mid-Century Modern2.jpeg', title: 'Mid-Century Dining', description: 'Clean lines and retro dining setup.' },
          { image: '/InteriorDesigning/Mid-Century Modern/Mid-Century Modern3.jpeg', title: 'Mid-Century Nook', description: 'Cozy lounge nook with vintage aesthetics.' },
        ],
      },
      {
        title: 'Minimalist Interior',
        coverImage: '/InteriorDesigning/Minimalist Interior/Cover.jpeg',
        description: 'Essentialism in architectural form. Uncluttered environments emphasizing spatial geometry, light, and silence.',
        features: ['Concealed Storage', 'Monochromatic Palette', 'Seamless Surfaces', 'Natural Light Focus'],
        gallery: [
          { image: '/InteriorDesigning/Minimalist Interior/Minimalist Interior1.jpeg', title: 'Minimalist Hallway', description: 'Pure geometric lines and serene light filtering.' },
          { image: '/InteriorDesigning/Minimalist Interior/Minimalist Interior2.jpeg', title: 'Minimalist Living', description: 'Uncluttered space focusing on texture and form.' },
          { image: '/InteriorDesigning/Minimalist Interior/Minimalist Interior3.jpeg', title: 'Minimalist Bedroom', description: 'Restful minimalist bedroom free of distraction.' },
        ],
      },
      {
        title: 'Modern Interior Design',
        coverImage: '/InteriorDesigning/Modern Interior Design/Cover.jpeg',
        description: 'Sleek, current, and functional design tailored for urban lifestyle standards.',
        features: ['Sleek Profiles', 'Functional Zoning', 'Glass Accents', 'Integrated Storage'],
        gallery: [
          { image: '/InteriorDesigning/Modern Interior Design/Modern Interior Design1.jpeg', title: 'Modern Living Space', description: 'Clean functional layout with modern decor.' },
          { image: '/InteriorDesigning/Modern Interior Design/Modern Interior Design2.jpeg', title: 'Modern Lounge', description: 'Comfortable and contemporary seating environment.' },
        ],
      },
      {
        title: 'Modern Kitchen Designing',
        coverImage: '/InteriorDesigning/Modern Kitchen designing/Cover.jpeg',
        description: 'State-of-the-art modular kitchens featuring handleless cabinetry, stone countertops, and smart appliances.',
        features: ['Modular Storage', 'Quartz Countertops', 'Built-in Appliances', 'Ergonomic Work Triangle'],
        gallery: [
          { image: '/InteriorDesigning/Modern Kitchen designing/L-Shaped Modular Kitchen Layout.jpeg', title: 'L-Shaped Kitchen', description: 'Efficient L-shaped counter flow for compact and open spaces.' },
          { image: '/InteriorDesigning/Modern Kitchen designing/Open  Kitchen Layout.jpeg', title: 'Open Concept Kitchen', description: 'Seamless kitchen transition into the living/dining area.' },
          { image: '/InteriorDesigning/Modern Kitchen designing/Parallel Shaped Modular Kitchen Layout.jpeg', title: 'Parallel Modular Kitchen', description: 'Dual counter layout optimizing chef movement and prep space.' },
          { image: '/InteriorDesigning/Modern Kitchen designing/Straight Modular Kitchen Layout.jpeg', title: 'Straight Kitchen', description: 'Sleek single-wall kitchen layout ideal for modern apartments.' },
          { image: '/InteriorDesigning/Modern Kitchen designing/U-Shaped Modular Kitchen Layout.jpeg', title: 'U-Shaped Modular Kitchen', description: 'Maximum counter space and storage wrap-around kitchen design.' },
        ],
      },
      {
        title: 'Scandinavian Design',
        coverImage: '/InteriorDesigning/Scandinavian Design/Cover.jpeg',
        description: 'Nordic simplicity at its finest. Functional, cosy and beautifully understated design celebrating natural materials, light and hygge.',
        features: ['Hygge Aesthetics', 'Natural Wood', 'Soft Textiles', 'Neutral Tones'],
        gallery: [
          { image: '/InteriorDesigning/Scandinavian Design/Scandinavian Design1.jpeg', title: 'Nordic Living', description: 'Nordic simplicity with natural wood and neutral tones.' },
          { image: '/InteriorDesigning/Scandinavian Design/Scandinavian Design2.jpeg', title: 'Scandinavian Lounge', description: 'Cozy textiles and airy natural lighting.' },
          { image: '/InteriorDesigning/Scandinavian Design/Scandinavian Design3.jpeg', title: 'Nordic Nook', description: 'Understated hygge lounge area.' },
        ],
      },
      {
        title: 'Traditional Indian Interior',
        coverImage: '/InteriorDesigning/Traditional Indian Interior/Cover.jpeg',
        description: 'Rich cultural heritage expressed through vibrant colours, intricate carvings, and traditional craftsmanship. A celebration of India\'s design legacy.',
        features: ['Handcrafted Woodwork', 'Vibrant Textiles', 'Brass Accents', 'Ethnic Patterns'],
        gallery: [
          { image: '/InteriorDesigning/Traditional Indian Interior/Traditional Indian Interior1.jpeg', title: 'Heritage Living Room', description: 'Rich Indian heritage with handcrafted woodwork and brass accents.' },
          { image: '/InteriorDesigning/Traditional Indian Interior/Traditional Indian Interior2.jpeg', title: 'Courtyard Seating', description: 'Traditional jhula and ethnic textile decor.' },
          { image: '/InteriorDesigning/Traditional Indian Interior/Traditional Indian Interior3.jpeg', title: 'Ornate Foyer', description: 'Intricate wood carving and traditional motif accents.' },
          { image: '/InteriorDesigning/Traditional Indian Interior/Traditional Indian Interior4.jpeg', title: 'Classic Ethnic Lounge', description: 'Warm color palettes celebrating traditional art.' },
        ],
      },
      {
        title: 'Victorian Interior',
        coverImage: '/InteriorDesigning/Victorian Interior/Cover.jpeg',
        description: 'Grand, ornate and richly decorated. Victorian interiors are characterized by dark wood, heavy fabrics, elaborate patterns, and a sense of aristocratic luxury.',
        features: ['Dark Rich Woods', 'Heavy Drapery', 'Ornate Patterns', 'Marble Fireplaces'],
        gallery: [
          { image: '/InteriorDesigning/Victorian Interior/Victorian Interior1.jpeg', title: 'Victorian Parlor', description: 'Grand ornate Victorian style with dark woods and elaborate detailing.' },
          { image: '/InteriorDesigning/Victorian Interior/Victorian Interior2.jpeg', title: 'Victorian Study', description: 'Rich wood paneling and classic leather seating.' },
          { image: '/InteriorDesigning/Victorian Interior/Victorian Interior3.jpeg', title: 'Victorian Suite', description: 'Ornate fireplace and velvet drapery.' },
          { image: '/InteriorDesigning/Victorian Interior/Victorian Interior4.jpeg', title: 'Victorian Dining', description: 'Aristocratic dining hall setting.' },
          { image: '/InteriorDesigning/Victorian Interior/Victorian Interior5.jpeg', title: 'Victorian Foyer', description: 'Stately entryway with classic chandeliers.' },
        ],
      },
      {
        title: 'Wardrobe Design',
        coverImage: '/InteriorDesigning/wardrobe design/Cover.jpeg',
        description: 'Custom wardrobe solutions that combine storage capacity with stunning aesthetics. Walk-in closets, sliding systems, and swing door designs tailored to your space.',
        features: ['Walk-in Closets', 'Sliding Systems', 'Built-in Lighting', 'Custom Organizers'],
        gallery: [
          { image: '/InteriorDesigning/wardrobe design/sliding door wardrobe.jpeg', title: 'Sliding Door Wardrobe', description: 'Space-saving sliding doors with high gloss reflective surfaces.' },
          { image: '/InteriorDesigning/wardrobe design/swing door wardrobe.jpeg', title: 'Swing Door Wardrobe', description: 'Classic hinged door wardrobes with premium hardware handles.' },
          { image: '/InteriorDesigning/wardrobe design/walk-in wardrobe.jpeg', title: 'Walk-in Wardrobe', description: 'Luxurious walk-in closet space with customizable shelving modules.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     2. EXTERIOR & LANDSCAPING
  ═══════════════════════════════════════════════════════════════ */
  {
    title: 'Exterior & Landscaping',
    coverImage: '/Exterrior & Landscaping/cover.jpg',
    subServices: [
      {
        title: '3D Wall Painting',
        coverImage: '/Exterrior & Landscaping/3D Wall painting/Cover.jpeg',
        description: 'Transform blank walls into breathtaking three-dimensional masterpieces. Our artists create optical illusions, murals, and geometric artworks that redefine spaces.',
        features: ['Optical Illusions', 'Custom Murals', 'Geometric Art', 'Trompe-l\'oeil'],
        gallery: [
          { image: '/Exterrior & Landscaping/3D Wall painting/Gold Geometric Wall Design.jpeg', title: 'Gold Geometric Wall Design', description: 'Intricate golden geometric wall patterns for modern spaces.' },
          { image: '/Exterrior & Landscaping/3D Wall painting/Trompe l oeil wall painting.jpeg', title: 'Trompe l\'oeil Wall Painting', description: 'Realistic 3D optical illusion murals transforming plain surfaces.' },
          { image: '/Exterrior & Landscaping/3D Wall painting/raditional Chinese Welcoming Pine Wall.jpeg', title: 'Traditional Chinese Pine Wall', description: 'Beautiful traditional welcoming pine tree mural.' },
          { image: '/Exterrior & Landscaping/3D Wall painting/East Asian Landscape Art.jpeg', title: 'East Asian Landscape Art', description: 'Scenic mountain and water paintings adding organic depth.' },
        ],
      },
      {
        title: 'Cricket Boxes',
        coverImage: '/Exterrior & Landscaping/Cricket Boxes/Cover.jpeg',
        description: 'Premium cricket practice nets and enclosed boxes designed for serious players. Durable netting, professional-grade pitches, and safety-certified structures.',
        features: ['Professional Netting', 'Artificial Turf', 'Safety Certified', 'Weather Resistant'],
        gallery: [
          { image: '/Exterrior & Landscaping/Cricket Boxes/batting cricket box.jpeg', title: 'Batting Cricket Box', description: 'Premium caged netting for batting practice.' },
          { image: '/Exterrior & Landscaping/Cricket Boxes/bowling cricket box.jpeg', title: 'Bowling Cricket Box', description: 'Enclosed cricket net box with durable artificial turf.' },
        ],
      },
      {
        title: 'EPDM Flooring',
        coverImage: '/Exterrior & Landscaping/Epdm Flooring/Cover.jpeg',
        description: 'High-performance rubber flooring for playgrounds, gyms, and sports areas. Shock-absorbing, slip-resistant, and available in vibrant custom colours.',
        features: ['Shock Absorbing', 'Slip Resistant', 'Custom Colours', 'UV Stable'],
        gallery: [
          { image: '/Exterrior & Landscaping/Epdm Flooring/EDPM rubber flooring.jpeg', title: 'EPDM Rubber Flooring', description: 'Shock-absorbing playground and sports safety flooring.' },
        ],
      },
      {
        title: 'Gabion Walls',
        coverImage: '/Exterrior & Landscaping/Gabion Walls/Cover.jpeg',
        description: 'Natural stone and wire mesh retaining solutions. Gabion walls offer erosion control, slope stabilisation and an organic aesthetic for landscapes.',
        features: ['Erosion Control', 'Slope Stabilization', 'Natural Stone Fill', 'Eco-Friendly'],
        gallery: [
          { image: '/Exterrior & Landscaping/Gabion Walls/gabion baskets.jpeg', title: 'Gabion Baskets', description: 'Rock-filled wire mesh baskets for sturdy retaining walls.' },
          { image: '/Exterrior & Landscaping/Gabion Walls/gabion matresses.jpeg', title: 'Gabion Mattresses', description: 'Flat wire baskets for erosion control and slope stabilization.' },
        ],
      },
      {
        title: 'Garden & Landscaping',
        coverImage: '/Exterrior & Landscaping/Garden&Landscaping/Cover.jpeg',
        description: 'Complete garden design and landscaping from concept to completion. Japanese, Mediterranean, English, Tropical and more — each garden uniquely yours.',
        features: ['Custom Design', 'Seasonal Planting', 'Water Features', 'Sustainable Plants'],
        gallery: [
          { image: '/Exterrior & Landscaping/Garden&Landscaping/English garden1.jpeg', title: 'English Garden', description: 'Classic informal landscape with colorful flower beds and paths.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/English Garden2.jpeg', title: 'English Garden 2', description: 'Romantic cottage garden with climbing roses and herbaceous borders.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Japanese Garden 1.jpeg', title: 'Japanese Garden', description: 'Tranquil gardens featuring water elements, rocks, and bridges.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Japanese Garde 2.jpeg', title: 'Japanese Garden 2', description: 'Zen rock garden with moss, raked gravel and stone lanterns.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Mediterranean garden.jpeg', title: 'Mediterranean Garden', description: 'Drought-tolerant, warm textured garden designs.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Mediterranean Garden2.jpeg', title: 'Mediterranean Garden 2', description: 'Sun-drenched terrace with terracotta pots and olive trees.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Mediterranean Garden3.jpeg', title: 'Mediterranean Garden 3', description: 'Lavender and rosemary borders with stone pathways.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Tropical garden1.jpeg', title: 'Tropical Garden', description: 'Lush green foliage and exotic broadleaf plantings.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Tropical Garden2.jpeg', title: 'Tropical Garden 2', description: 'Palm trees and bold tropical foliage for a paradise feel.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Tropical Garden3.jpeg', title: 'Tropical Garden 3', description: 'Jungle-inspired planting with water features and timber decking.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/formal landscaping 1.jpeg', title: 'Formal Landscaping', description: 'Symmetrical patterns and neatly trimmed topiary designs.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/formal landscaping 2.jpeg', title: 'Formal Landscaping 2', description: 'Clipped hedges and geometric beds in the French parterre style.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/modern landscaping.jpeg', title: 'Modern Landscaping', description: 'Clean lines, hardscaping focus, and architectural flora.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Desert Xeriscape Garden1.jpeg', title: 'Desert Xeriscape Garden', description: 'Water-wise desert landscape with cacti and succulents.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Desert Xeriscape Garden2.jpeg', title: 'Desert Xeriscape 2', description: 'Gravel mulch and drought-tolerant plants for arid climates.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Desert Xeriscape Garden3.jpeg', title: 'Desert Xeriscape 3', description: 'Sculptural agave and boulders in a xeriscape setting.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Informal Garden1.jpg', title: 'Informal Garden', description: 'Relaxed cottage-style planting with naturalistic drifts.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Informal Garden2.webp', title: 'Informal Garden 2', description: 'Meandering paths through wildflower meadows and shrubs.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Minimalist Garden1.jpeg', title: 'Minimalist Garden', description: 'Clean geometric spaces with restrained planting and gravel.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Minimalist Garden2.jpeg', title: 'Minimalist Garden 2', description: 'Sculptural topiary and symmetry in a minimalist setting.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Minimalist Garden3.jpeg', title: 'Minimalist Garden 3', description: 'Zen-inspired minimalist landscape with stone and grass.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Roof top Garden1.jpg', title: 'Rooftop Garden', description: 'Lush green rooftop retreat above the city skyline.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Roof top Garden2.jpeg', title: 'Rooftop Garden 2', description: 'Urban rooftop terrace with raised planter beds.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/Roof top Garden3.jpg', title: 'Rooftop Garden 3', description: 'Sky-garden with outdoor seating and panoramic views.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/vertical garden1.jpeg', title: 'Vertical Garden', description: 'Living wall installations for compact outdoor spaces.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/vertical garden2.jpeg', title: 'Vertical Garden 2', description: 'Lush green wall cascades of ferns and trailing plants.' },
          { image: '/Exterrior & Landscaping/Garden&Landscaping/vertical garden3.jpeg', title: 'Vertical Garden 3', description: 'Modular planter system for indoor and outdoor vertical gardens.' },
        ],
      },
      {
        title: 'Gym',
        coverImage: '/Exterrior & Landscaping/Gym/Cover.jpeg',
        description: 'Professional gym installations for homes, residential communities and corporate spaces. Indoor and outdoor fitness areas with durable flooring and weatherproof equipment.',
        features: ['Rubber Flooring', 'Weatherproof Equipment', 'Mirrors & Lighting', 'Custom Layout'],
        gallery: [
          { image: '/Exterrior & Landscaping/Gym/Indoor gym.jpeg', title: 'Indoor Gym', description: 'Durable rubber flooring and optimal spacing for indoor workout gear.' },
          { image: '/Exterrior & Landscaping/Gym/outdoor gym.jpeg', title: 'Outdoor Gym', description: 'Weatherproof fitness installations for parks and yards.' },
        ],
      },
      {
        title: 'Irrigation',
        coverImage: '/Exterrior & Landscaping/Irrigation/Cover.jpeg',
        description: 'Smart, water-efficient irrigation systems for gardens, sports fields, and large landscapes. We design drip, sprinkler, and micro-spray systems that conserve water while keeping your landscape lush.',
        features: ['Drip Irrigation', 'Smart Controllers', 'Water Conservation', 'Low Maintenance'],
        gallery: [
          { image: '/Exterrior & Landscaping/Irrigation/Landscaper Drip Irrigation and Micro Spray.jpeg', title: 'Drip Irrigation & Micro Spray', description: 'Eco-friendly target watering systems saving water.' },
          { image: '/Exterrior & Landscaping/Irrigation/Soaker hoses.jpeg', title: 'Soaker Hoses', description: 'Porous pipes offering deep root hydration.' },
          { image: '/Exterrior & Landscaping/Irrigation/micro sprinklers.jpeg', title: 'Micro Sprinklers', description: 'Fine spray systems perfect for flowerbeds and groundcover.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     3. SWIMMING POOLS & FOUNTAINS
  ═══════════════════════════════════════════════════════════════ */
  {
    title: 'Swimming Pools & Fountains',
    coverImage: '/Swimming pools &Fountains/Swiming Pools/Cover.jpeg',
    subServices: [
      {
        title: 'Swimming Pools',
        coverImage: '/Swimming pools &Fountains/Swiming Pools/Cover.jpeg',
        description: 'From rooftop infinity pools to private indoor sanctuaries, we design and build premium swimming pools with the finest materials and engineering.',
        features: ['Infinity Edge', 'Mosaic Tiling', 'LED Lighting', 'Filtration Systems'],
        gallery: [
          { image: '/Swimming pools &Fountains/Swiming Pools/Infinity pools.jpeg', title: 'Infinity Pools', description: 'Stunning zero-edge swimming pools merging with the horizon.' },
          { image: '/Swimming pools &Fountains/Swiming Pools/Indoor pool.jpeg', title: 'Indoor Pool', description: 'Year-round climatized indoor pool designs with wellness options.' },
          { image: '/Swimming pools &Fountains/Swiming Pools/Rooftop swimming pool.jpeg', title: 'Rooftop Swimming Pool', description: 'Premium architectural rooftop pools with structural reinforcements.' },
          { image: '/Swimming pools &Fountains/Swiming Pools/On-ground pool.jpeg', title: 'On-Ground Pool', description: 'Semi-permanent surface swimming pools with luxury wood decks.' },
        ],
      },
      {
        title: 'Water Fountains',
        coverImage: '/Swimming pools &Fountains/Fountains/Cover.jpeg',
        description: 'Ornamental water fountains and architectural water features bringing life and tranquility to luxury estates and public spaces.',
        features: ['Musical Fountains', 'Dancing Jets', 'Illuminated Cascades', 'Interactive Dry Decks'],
        gallery: [
          { image: '/Swimming pools &Fountains/Fountains/Arch Fountain1.jpeg', title: 'Arch Fountain', description: 'Laminar arching water jets creating elegant watery tunnels.' },
          { image: '/Swimming pools &Fountains/Fountains/Dancing (Musical) Fountain1.jpeg', title: 'Musical Fountain', description: 'Choreographed water jets moving to music and light rhythms.' },
          { image: '/Swimming pools &Fountains/Fountains/Dry Deck (Interactive) Fountain1.jpeg', title: 'Dry Deck Fountain', description: 'Interactive ground-level fountain jets safe for foot traffic.' },
          { image: '/Swimming pools &Fountains/Fountains/Floating Fountain1.jpeg', title: 'Floating Fountain', description: 'Aerating lake and pond fountains with vivid LED lighting.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     4. PLAYSTATION
  ═══════════════════════════════════════════════════════════════ */
  {
    title: 'Playstation',
    coverImage: '/Play Station/Indoor &outdoor Playstation/Soft Play zone.jpeg',
    subServices: [
      {
        title: 'Indoor & Outdoor Playstation',
        coverImage: '/Play Station/Indoor &outdoor Playstation/Soft Play zone.jpeg',
        description: 'Safe and exciting play environments for children. From indoor soft play zones and climbing walls to outdoor parks and grass tunnels — we build memorable play experiences.',
        features: ['Safety Certified', 'Age-Appropriate', 'Durable Materials', 'Custom Themes'],
        gallery: [
          { image: '/Play Station/Indoor &outdoor Playstation/Soft Play zone.jpeg', title: 'Soft Play Zone', description: 'Safe indoor foam obstacle and play area for small children.' },
          { image: '/Play Station/Indoor &outdoor Playstation/Indoor climbing walls.jpeg', title: 'Indoor Climbing Walls', description: 'Fun adventure walls fitted with safety harness lines.' },
          { image: '/Play Station/Indoor &outdoor Playstation/Indoor trampoline parksz.jpeg', title: 'Indoor Trampoline Park', description: 'Wall-to-wall integrated trampoline layouts.' },
          { image: '/Play Station/Indoor &outdoor Playstation/Child Park.jpeg', title: 'Child Park', description: 'Complete swings, slides, and outdoor play park design.' },
          { image: '/Play Station/Indoor &outdoor Playstation/Outdoor Childs  Park.jpeg', title: 'Outdoor Childs Park', description: 'Premium community outdoor kids amusement layout.' },
          { image: '/Play Station/Indoor &outdoor Playstation/Grass tunnel.jpeg', title: 'Grass Tunnel', description: 'Creative organic tunnels for active toddler play.' },
        ],
      },
      {
        title: 'Jungle Gym',
        coverImage: '/Play Station/Jungle Gym/Climbing club jungle gym.webp',
        description: 'Heavy-duty wooden and metal jungle gyms designed for backyard adventures, schools, and community parks.',
        features: ['Climbing Nets', 'Rope Ladders', 'Slide Attachments', 'Weatherproof Timber'],
        gallery: [
          { image: '/Play Station/Jungle Gym/Climbing club jungle gym.webp', title: 'Climbing Club Jungle Gym', description: 'Multi-tiered climbing structure with nets and swings.' },
          { image: '/Play Station/Jungle Gym/jungel gym1.jpg', title: 'Classic Jungle Gym', description: 'Sturdy wooden frame play structure.' },
          { image: '/Play Station/Jungle Gym/jungle gym2.webp', title: 'Adventure Play Gym', description: 'Expanded play complex with monkey bars.' },
        ],
      },
      {
        title: 'Multi Playstation',
        coverImage: '/Play Station/Multy Playstation/Multi playstation.jpg',
        description: 'Custom integrated multi-activity play stations offering combined slides, towers, and interactive play panels.',
        features: ['Integrated Towers', 'Spiral Slides', 'Activity Panels', 'High-Capacity Layouts'],
        gallery: [
          { image: '/Play Station/Multy Playstation/Kids Playstation.jpg', title: 'Kids Playstation', description: 'Vibrant outdoor composite multi-play structure.' },
          { image: '/Play Station/Multy Playstation/Multi playstation.jpg', title: 'Multi Playstation Center', description: 'Large community park play tower complex.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     5. CONSTRUCTION
  ═══════════════════════════════════════════════════════════════ */
  {
    title: 'Construction',
    coverImage: '/Construction/cover.jpeg',
    subServices: [
      {
        title: 'Modern House Construction',
        coverImage: '/Construction/Modern House Construction.jpg',
        description: 'End-to-end architectural construction solutions for contemporary homes, villas, and modern residential estates.',
        features: ['Turnkey Execution', 'Structural Warranty', 'Premium Materials', 'Architectural Alignment'],
        gallery: [
          { image: '/Construction/Modern House Construction.jpg', title: 'Modern Villa Construction', description: 'Precision concrete and steel construction for modern luxury residences.' },
          { image: '/Construction/Duplex House construction.avif', title: 'Duplex House Construction', description: 'Multi-level structural engineering and elevation finishing.' },
          { image: '/Construction/Building Construction.avif', title: 'Building Construction', description: 'Commercial and residential structural framing and civil works.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     6. SERVICES & MAINTENANCE
  ═══════════════════════════════════════════════════════════════ */
  {
    title: 'Services & Maintenance',
    coverImage: '/services & maintenance/Fountain servicing1.jpeg',
    subServices: [
      {
        title: 'EPDM Flooring Maintenance',
        coverImage: '/services & maintenance/Edpm flooring maintenance 1.jpeg',
        description: 'Professional maintenance and repair services for EPDM rubber flooring in playgrounds, gyms, and sports areas. Keeping your surfaces safe, vibrant, and long-lasting.',
        features: ['Surface Repair', 'Colour Restoration', 'Sealing & Coating', 'Safety Inspection'],
        gallery: [
          { image: '/services & maintenance/Edpm flooring maintenance 1.jpeg', title: 'EPDM Flooring Maintenance 1', description: 'Professional repair and restoration of EPDM rubber flooring surfaces.' },
          { image: '/services & maintenance/Edpm flooring maintenance 2.jpeg', title: 'EPDM Flooring Maintenance 2', description: 'Colour restoration and sealing for long-lasting EPDM flooring.' },
        ],
      },
      {
        title: 'Fountain Servicing',
        coverImage: '/services & maintenance/Fountain servicing1.jpeg',
        description: 'Complete servicing and maintenance of water fountains and decorative water features. We ensure pumps, filters, and structures remain in perfect condition year-round.',
        features: ['Pump Servicing', 'Filter Cleaning', 'Leak Repairs', 'Water Treatment'],
        gallery: [
          { image: '/services & maintenance/Fountain servicing1.jpeg', title: 'Fountain Servicing 1', description: 'Complete pump and filtration servicing for water fountains.' },
          { image: '/services & maintenance/Fountain servicing2.jpeg', title: 'Fountain Servicing 2', description: 'Structural inspection and leak repairs for decorative water features.' },
          { image: '/services & maintenance/Fountain servicing3.jpeg', title: 'Fountain Servicing 3', description: 'Water treatment and maintenance for clean, pristine fountains.' },
        ],
      },
      {
        title: 'Interior Servicing',
        coverImage: '/services & maintenance/interior servicing 1.jpeg',
        description: 'Comprehensive interior maintenance services to keep your spaces looking their best. From touch-up painting and woodwork repairs to deep cleaning and fixture servicing.',
        features: ['Touch-up Painting', 'Woodwork Repair', 'Fixture Servicing', 'Deep Cleaning'],
        gallery: [
          { image: '/services & maintenance/interior servicing 1.jpeg', title: 'Interior Servicing 1', description: 'Comprehensive interior maintenance keeping spaces pristine.' },
          { image: '/services & maintenance/Interior servicing 2.jpeg', title: 'Interior Servicing 2', description: 'Touch-up painting and woodwork repairs for interiors.' },
          { image: '/services & maintenance/Interior servicing 3.jpeg', title: 'Interior Servicing 3', description: 'Fixture servicing and deep cleaning for premium spaces.' },
          { image: '/services & maintenance/interior servicing 4.jpeg', title: 'Interior Servicing 4', description: 'Full interior upkeep and restoration services.' },
        ],
      },
      {
        title: 'Landscape Servicing',
        coverImage: '/services & maintenance/landscape servicing 1.jpeg',
        description: 'Regular landscape maintenance to keep gardens, lawns, and outdoor spaces in peak condition. Trimming, pruning, fertilizing, and seasonal care for your landscape.',
        features: ['Lawn Mowing', 'Pruning & Trimming', 'Fertilizing', 'Seasonal Care'],
        gallery: [
          { image: '/services & maintenance/landscape servicing 1.jpeg', title: 'Landscape Servicing 1', description: 'Regular garden and lawn maintenance for pristine outdoor spaces.' },
          { image: '/services & maintenance/landscape servicing 2.jpeg', title: 'Landscape Servicing 2', description: 'Pruning, trimming and fertilizing for healthy landscapes.' },
        ],
      },
      {
        title: 'Playstation Servicing',
        coverImage: '/services & maintenance/playstation servicing1.jpeg',
        description: 'Safety inspections, equipment repairs, and surface maintenance for playgrounds and recreational facilities. Ensuring every play area remains safe and enjoyable.',
        features: ['Safety Inspection', 'Equipment Repair', 'Surface Resurfacing', 'Compliance Checks'],
        gallery: [
          { image: '/services & maintenance/playstation servicing1.jpeg', title: 'Playstation Servicing 1', description: 'Safety inspections and equipment repairs for play areas.' },
          { image: '/services & maintenance/playstation servicing2.jpeg', title: 'Playstation Servicing 2', description: 'Surface resurfacing and compliance checks for recreational facilities.' },
        ],
      },
      {
        title: 'Swimming Pool Servicing',
        coverImage: '/services & maintenance/swimming pool servicing1.jpeg',
        description: 'Full-service swimming pool maintenance including water chemistry balancing, filter cleaning, tile scrubbing, and equipment inspections for crystal-clear pools all year.',
        features: ['Water Chemistry', 'Filter Cleaning', 'Tile Scrubbing', 'Equipment Inspection'],
        gallery: [
          { image: '/services & maintenance/swimming pool servicing1.jpeg', title: 'Swimming Pool Servicing 1', description: 'Water chemistry balancing and filter cleaning for crystal-clear pools.' },
          { image: '/services & maintenance/swimming pool servicing2.jpeg', title: 'Swimming Pool Servicing 2', description: 'Tile scrubbing and equipment inspection for pool maintenance.' },
        ],
      },
    ],
  },
];
