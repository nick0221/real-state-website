export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: 'sale' | 'rent';
  status: 'available' | 'sold' | 'pending';
  description: string;
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
    type: "sale",
    status: "available",
    description:
      "An architectural masterpiece featuring floor-to-ceiling windows, infinity pool, and panoramic city views. Every detail curated for the discerning buyer.",
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
    type: "sale",
    status: "available",
    description:
      "Stunning Mediterranean-style villa with private beach access, terraced gardens, and breathtaking ocean sunsets from every room.",
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
    type: "sale",
    status: "pending",
    description:
      "Breathtaking penthouse with wraparound terrace, private rooftop pool, and state-of-the-art smart home technology.",
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
    type: "sale",
    status: "available",
    description:
      "A serene lakefront retreat with floor-to-ceiling windows, private dock, and stunning mountain views. Perfect for year-round living.",
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
    type: "sale",
    status: "available",
    description:
      "Grand colonial estate with formal gardens, tennis court, guest house, and sweeping views of the Golden Gate Bridge.",
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
    type: "rent",
    status: "available",
    description:
      "Industrial-chic loft in the heart of the Arts District with 20-foot ceilings, exposed brick, and rooftop access.",
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
