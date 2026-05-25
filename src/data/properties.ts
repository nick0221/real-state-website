export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  floorPlan: string;
  type: 'sale' | 'rent';
  status: 'available' | 'sold' | 'pending';
  description: string;
  features: string[];
  yearBuilt: number;
  lotSize: number;
  featured?: boolean;
}

export interface Agent {
  id: number;
  name: string;
  title: string;
  image: string;
  phone: string;
  email: string;
  propertiesSold: number;
  experience: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Glass Estate",
    address: "42 Bel Air Drive, Beverly Hills, CA",
    price: 12800000,
    beds: 6,
    baths: 7,
    sqft: 8200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "An architectural masterpiece featuring floor-to-ceiling windows, infinity pool, and panoramic city views. Every detail curated for the discerning buyer. The open-concept layout seamlessly blends indoor and outdoor living, with retractable glass walls that disappear into the landscape.",
    features: [
      "Infinity-edge swimming pool",
      "Smart home automation system",
      "Wine cellar with tasting room",
      "Home theater with 4K projection",
      "Private gym and spa",
      "EV charging station",
      "Rooftop terrace with fire pit",
      "Staff quarters",
    ],
    yearBuilt: 2022,
    lotSize: 1.5,
    featured: true,
  },
  {
    id: 2,
    title: "Mediterranean Villa",
    address: "15 Ocean Avenue, Malibu, CA",
    price: 9500000,
    beds: 5,
    baths: 6,
    sqft: 6500,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f6b0052?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "Stunning Mediterranean-style villa with private beach access, terraced gardens, and breathtaking ocean sunsets from every room. Hand-laid tile work, wrought-iron accents, and exposed beam ceilings create an atmosphere of old-world charm.",
    features: [
      "Private beach access",
      "Terraced rose gardens",
      "Saltwater infinity pool",
      "Outdoor kitchen and bar",
      "Mediterranean courtyard",
      "Bocce ball court",
      "Three-car garage",
      "Guest casita",
    ],
    yearBuilt: 2019,
    lotSize: 2.1,
    featured: true,
  },
  {
    id: 3,
    title: "Ultra-Modern Penthouse",
    address: "100 Sunset Tower, Los Angeles, CA",
    price: 6800000,
    beds: 4,
    baths: 5,
    sqft: 4800,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f6b0052?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "pending",
    description:
      "Breathtaking penthouse with wraparound terrace, private rooftop pool, and state-of-the-art smart home technology. Floor-to-ceiling windows frame 360-degree views of the city, mountains, and ocean.",
    features: [
      "Private rooftop infinity pool",
      "Wraparound terrace (2,200 sqft)",
      "Miele appliance package",
      "Custom Italian cabinetry",
      "Steam shower and sauna",
      "Smart lighting and shades",
      "Wine refrigerator",
      "24/7 concierge service",
    ],
    yearBuilt: 2021,
    lotSize: 0.3,
    featured: true,
  },
  {
    id: 4,
    title: "Contemporary Lake House",
    address: "8 Lakeview Drive, Lake Tahoe, CA",
    price: 4200000,
    beds: 4,
    baths: 4,
    sqft: 4200,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "A serene lakefront retreat with floor-to-ceiling windows, private dock, and stunning mountain views. Perfect for year-round living with direct access to hiking trails and water sports.",
    features: [
      "Private boat dock",
      "Stone fireplace",
      "Chef's kitchen with island",
      "Covered lanai with lake views",
      "Hot tub and sauna",
      "Outdoor fire pit",
      "Mudroom and laundry",
      "Two-car heated garage",
    ],
    yearBuilt: 2018,
    lotSize: 0.8,
    featured: false,
  },
  {
    id: 5,
    title: "Hilltop Colonial Estate",
    address: "200 Summit Road, San Francisco, CA",
    price: 15600000,
    beds: 7,
    baths: 8,
    sqft: 10000,
    image: "https://images.unsplash.com/photo-1600566753086-00f18f6b0052?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18f6b0052?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "Grand colonial estate with formal gardens, tennis court, guest house, and sweeping views of the Golden Gate Bridge. Meticulously restored with modern amenities while preserving original architectural details.",
    features: [
      "Professional tennis court",
      "Formal English gardens",
      "Grand ballroom with chandeliers",
      "Library with wet bar",
      "Guest house (2BR/2BA)",
      "Wine cellar (2,000 bottles)",
      "Gated driveway with fountain",
      "Six-car garage + workshop",
    ],
    yearBuilt: 1925,
    lotSize: 3.2,
    featured: true,
  },
  {
    id: 6,
    title: "Chic Urban Loft",
    address: "55 Arts District, Downtown LA, CA",
    price: 8500,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1600607687644-c94bf1e5f7c6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c94bf1e5f7c6?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    floorPlan: "",
    type: "rent",
    status: "available",
    description:
      "Industrial-chic loft in the heart of the Arts District with 20-foot ceilings, exposed brick, and rooftop access. A creative's dream space with gallery-quality walls and abundant natural light.",
    features: [
      "20-foot vaulted ceilings",
      "Exposed brick and steel beams",
      "Polished concrete floors",
      "Chef's kitchen with bar seating",
      "In-unit washer/dryer",
      "Rooftop deck with city views",
      "Secure parking included",
      "Pet-friendly building",
    ],
    yearBuilt: 2016,
    lotSize: 0.1,
    featured: false,
  },
  {
    id: 7,
    title: "Coastal Bungalow",
    address: "42 Beachwalk Lane, Santa Monica, CA",
    price: 3200000,
    beds: 3,
    baths: 2,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "Charming coastal bungalow with ocean breezes, a private courtyard garden, and updated interiors blending modern comfort with beachside living. Steps from the sand and boardwalk.",
    features: [
      "Private courtyard garden",
      "Outdoor shower",
      "Updated kitchen with quartz",
      "Hardwood floors throughout",
      "Skylights in every room",
      "Permitted ADU potential",
      "Two-car garage",
      "Solar panels (owned)",
    ],
    yearBuilt: 1948,
    lotSize: 0.2,
    featured: false,
  },
  {
    id: 8,
    title: "Skyline Condo",
    address: "1200 Figueroa St, Los Angeles, CA",
    price: 6500,
    beds: 1,
    baths: 1,
    sqft: 950,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c94bf1e5f7c6?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    floorPlan: "",
    type: "rent",
    status: "available",
    description:
      "Modern downtown condo with skyline views, premium finishes, and access to rooftop pool, gym, and concierge services. Ideal for the urban professional seeking luxury city living.",
    features: [
      "Panoramic city views",
      "Rooftop infinity pool",
      "Fitness center with yoga studio",
      "Valet parking included",
      "In-unit washer/dryer",
      "Walk-in closet",
      "Smart home technology",
      "Rooftop lounge and BBQ",
    ],
    yearBuilt: 2020,
    lotSize: 0.05,
    featured: false,
  },
  {
    id: 9,
    title: "Wine Country Estate",
    address: "500 Vineyard Road, Napa Valley, CA",
    price: 8900000,
    beds: 5,
    baths: 6,
    sqft: 7200,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f6b0052?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "Stunning Napa Valley estate surrounded by vineyards, with a private tasting room, infinity pool, and sweeping valley views. The main residence is complemented by a caretaker cottage and wine cave.",
    features: [
      "Private vineyard (12 acres)",
      "Wine cave and tasting room",
      "Infinity pool with valley view",
      "Outdoor pizza oven and kitchen",
      "Caretaker's cottage",
      "Tractor barn and equipment",
      "Organic garden and orchard",
      "Private hiking trails",
    ],
    yearBuilt: 2005,
    lotSize: 22.0,
    featured: true,
  },
  {
    id: 10,
    title: "Urban Studio Loft",
    address: "222 Spring Street, Los Angeles, CA",
    price: 3200,
    beds: 0,
    baths: 1,
    sqft: 600,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c94bf1e5f7c6?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    ],
    floorPlan: "",
    type: "rent",
    status: "available",
    description:
      "Bright and airy studio loft in the Historic Core, featuring exposed brick, polished concrete floors, and city views. A perfect urban sanctuary within walking distance of LA's best dining and nightlife.",
    features: [
      "Exposed brick walls",
      "Polished concrete floors",
      "Granite countertops",
      "Stainless steel appliances",
      "Walk-in closet",
      "Bike storage room",
      "Rooftop access",
      "Near metro station",
    ],
    yearBuilt: 1928,
    lotSize: 0.02,
    featured: false,
  },
  {
    id: 11,
    title: "Palm Springs Retreat",
    address: "88 Desert Oasis Drive, Palm Springs, CA",
    price: 2100000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "Mid-century modern retreat with mountain views, saltwater pool, fire pit, and indoor-outdoor living at its finest. Recently renovated by a celebrated architect while preserving iconic desert modernism.",
    features: [
      "Saltwater pool and spa",
      "Mountain panorama views",
      "Fire pit seating area",
      "Original terrazzo floors",
      "Butterfly roof design",
      "Outdoor shower",
      "Citrus orchard",
      "Mid-century furnishings available",
    ],
    yearBuilt: 1957,
    lotSize: 0.5,
    featured: false,
  },
  {
    id: 12,
    title: "Luxury Family Home",
    address: "75 Oak Park Drive, Calabasas, CA",
    price: 5100000,
    beds: 5,
    baths: 4,
    sqft: 5500,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    floorPlan: "",
    type: "sale",
    status: "available",
    description:
      "A meticulously designed family estate with a chef's kitchen, home theater, sports court, and award-winning schools nearby. Every space is crafted for comfortable luxury living and entertaining.",
    features: [
      "Chef's kitchen with butler's pantry",
      "Home theater with stadium seating",
      "Basketball and pickleball court",
      "Resort-style pool with slide",
      "Outdoor cabana and BBQ",
      "Home office with separate entrance",
      "Children's playroom",
      "Three-car garage + RV parking",
    ],
    yearBuilt: 2017,
    lotSize: 1.1,
    featured: false,
  },
];

export const agents: Agent[] = [
  {
    id: 1,
    name: "Isabella Laurent",
    title: "Founder & Luxury Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    phone: "+1 (310) 555-0142",
    email: "isabella@prestigeestates.com",
    propertiesSold: 247,
    experience: 18,
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Senior Property Advisor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    phone: "+1 (310) 555-0187",
    email: "marcus@prestigeestates.com",
    propertiesSold: 183,
    experience: 14,
  },
  {
    id: 3,
    name: "Sophia Williams",
    title: "International Markets Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    phone: "+1 (310) 555-0231",
    email: "sophie@prestigeestates.com",
    propertiesSold: 156,
    experience: 11,
  },
  {
    id: 4,
    name: "James Okafor",
    title: "Commercial & Residential Expert",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    phone: "+1 (310) 555-0355",
    email: "james@prestigeestates.com",
    propertiesSold: 129,
    experience: 9,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Victoria and Henry Ashford",
    role: "Sold their Bel Air estate for $14.2M",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    content:
      "Prestige Estates exceeded every expectation. Their market knowledge and discretion were exceptional. Our property sold in under two weeks at well above asking price. Truly world-class service.",
    rating: 5,
  },
  {
    id: 2,
    name: "Robert Kensington III",
    role: "Purchased a $8.5M Malibu villa",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    content:
      "From first consultation to closing, the team at Prestige Estates demonstrated unparalleled professionalism. They found us a property that perfectly matched our vision and negotiated an exceptional deal.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Martinez",
    role: "Invested in portfolio of 3 properties",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&q=80",
    content:
      "As an international investor, I needed a partner who understood both the market and cross-border complexities. Prestige Estates delivered on every front. Their network and insight are invaluable.",
    rating: 5,
  },
  {
    id: 4,
    name: "David and Sarah Bloom",
    role: "Rented luxury penthouse in Beverly Hills",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=80",
    content:
      "We've worked with many real estate agencies, but none compare to Prestige Estates. They curated an exclusive selection of properties that matched our lifestyle perfectly. The entire process was seamless.",
    rating: 5,
  },
];
