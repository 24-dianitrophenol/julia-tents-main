export type TentCategory = 'camping' | 'event' | 'safari' | 'dome' | 'canopy';

export interface Tent {
  id: string;
  name: string;
  category: TentCategory;
  tagline: string;
  description: string;
  pricePerDay: number;
  salePrice?: number;
  capacity: number;
  size: string;
  material: string;
  waterproofIndex: string;
  frameType: string;
  badge?: string;
  image: string;
  gallery: string[];
  features: string[];
  setupTime?: string;
}

export const tents: Tent[] = [
  {
    id: 'automatic-pop-up-camping-tent',
    name: 'Automatic pop-up dome camping tent',
    category: 'camping',
    tagline: '3-4 person quick hydraulic setup tent — ready in seconds',
    description:
      'Popular automatic hydraulic pop-up tent as featured on Jumia Uganda. Built with high-density 210D Oxford silver-coated waterproof fabric, dual zippered doors with anti-mosquito mesh, and robust fiberglass poles. Ideal for weekend getaways, outdoor picnics, and student camping in Uganda.',
    pricePerDay: 45000,
    salePrice: 165000,
    capacity: 4,
    size: '2.15m x 2.15m x 1.42m',
    material: '210D Oxford fabric with UV silver coating',
    waterproofIndex: '2000mm - 3000mm',
    frameType: 'Automatic hydraulic fiberglass skeleton',
    badge: 'Best seller',
    setupTime: '30 seconds',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Instant hydraulic pop-up mechanism',
      'Double door and double window ventilation',
      'High density mosquito mesh lining',
      'Silver-coated UV protection factor UPF 50+',
      'Includes 8 ground pegs and 4 wind ropes',
      'Compact oxford carrying bag',
    ],
  },
  {
    id: 'heavy-duty-hexagonal-dome-tent',
    name: 'Heavy duty 6-person hexagonal tent',
    category: 'dome',
    tagline: 'Spacious 6-sided double-layer dome tent with high headroom',
    description:
      'Spacious hexagonal camping tent listed on Jiji and Jumia for family expeditions and team retreats. The 6-sided geometric structure withstands high winds with ease, while the extended rainfly and breathable inner tent keep interior humidity low in tropical weather.',
    pricePerDay: 95000,
    salePrice: 320000,
    capacity: 6,
    size: '3.0m x 3.0m x 1.85m',
    material: '190T Polyester taffeta + 210D Oxford floor',
    waterproofIndex: '3000mm PU coating',
    frameType: '8.5mm aviation-grade flexible poles',
    badge: 'Popular for groups',
    setupTime: '5 minutes',
    image: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Comfortably sleeps up to 6 adults',
      'Full coverage waterproof rainfly',
      'Top skylight mesh for stargazing',
      'Dual vestibules for gear storage',
      'Reinforced corners with seam sealing tape',
      'Heavy-duty steel stakes included',
    ],
  },
  {
    id: '100-seater-wedding-event-tent',
    name: '100-seater heavy duty wedding & church tent',
    category: 'event',
    tagline: 'Galvanized steel frame A-tent for weddings, parties, and church functions',
    description:
      'Uganda standard 100-seater event tent manufactured with commercial-grade 650g/m² flame-retardant PVC blockout canvas and 1.5-inch heavy-gauge galvanized steel tubing. Features arched church-style side windows and full front/back curtains for weather protection.',
    pricePerDay: 350000,
    salePrice: 4800000,
    capacity: 100,
    size: '7.0m x 15.0m (105 m²)',
    material: '650g/m² PVC blockout tarpaulin (100% waterproof)',
    waterproofIndex: '100% waterproof & UV stabilized',
    frameType: '38mm x 1.5mm galvanized anti-rust steel tubes',
    badge: 'Event favorite',
    setupTime: '2 hours (crew provided)',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Accommodates 100 seated guests with tables',
      'High-grade waterproof and flame-retardant PVC',
      'Arched French church decorative window walls',
      'Free delivery, assembly, and takedown within Kampala & Wakiso',
      'Anchored with heavy ground pegs or concrete weights',
      'Lighting hooks and drapery mounting points',
    ],
  },
  {
    id: '50-seater-event-party-tent',
    name: '50-seater event & corporate gathering tent',
    category: 'event',
    tagline: 'Medium-sized frame tent for graduation parties, introductions, and meetings',
    description:
      'Versatile 50-seater party tent suited for traditional marriage introductions (kwanjula), birthday parties, corporate catering, and funeral wakes. Constructed with durable white PVC tarpaulin and quick-locking tubular steel joints for reliable all-weather protection.',
    pricePerDay: 180000,
    salePrice: 2800000,
    capacity: 50,
    size: '5.0m x 10.0m (50 m²)',
    material: '550g/m² waterproof PVC fabric',
    waterproofIndex: '100% waterproof',
    frameType: '32mm powder-coated steel structure',
    badge: 'Top for parties',
    setupTime: '1 hour (crew provided)',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Holds 50 seated guests with dining tables',
      'Reinforced corner joints with locking wingbolts',
      'Removable sidewalls with decorative arched windows',
      'Clean white finish suited for ribbons and flowers',
      'Complete installation and takedown included',
    ],
  },
  {
    id: '3x3m-foldable-gazebo-canopy',
    name: '3x3m foldable gazebo canopy tent',
    category: 'canopy',
    tagline: 'Retractable pop-up gazebo with optional free custom branding',
    description:
      'Heavy-duty 3m x 3m foldable steel gazebo widely used across Uganda for brand promotions, street exhibitions, market stalls, and backyard carports. Sets up in under 60 seconds without tools and packs down into an easy-to-wheel storage bag.',
    pricePerDay: 75000,
    salePrice: 650000,
    capacity: 12,
    size: '3.0m x 3.0m x 3.2m peak',
    material: '800D High-density waterproof Oxford with PVC backing',
    waterproofIndex: '3000mm waterproof & UV50+',
    frameType: 'Reinforced square steel frame with hammer-tone finish',
    badge: 'Free branding',
    setupTime: '1 minute',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      '3-level adjustable leg heights',
      'Smooth push-button locking sliders',
      'Free logo and branding printing for bulk orders',
      'Waterproof cross-stitched seams',
      'Includes heavy-duty wheel carry bag',
      'Sandbags and tie-down ropes included',
    ],
  },

  {
    id: 'pagoda-high-peak-marquee',
    name: '5x5m pagoda high peak marquee tent',
    category: 'canopy',
    tagline: 'Aesthetic high-pointed pagoda tent for VIP lounges and product launches',
    description:
      'Elegant high-peak pagoda marquee tent manufactured with an extruded anodized aluminum alloy frame and tensioned 850g white blockout PVC roof. Perfect for VIP cocktail areas, high-end wedding receptions, motor shows, and corporate activations.',
    pricePerDay: 180000,
    salePrice: 2400000,
    capacity: 25,
    size: '5.0m x 5.0m x 5.2m peak',
    material: '850g/m² premium glossy white PVC',
    waterproofIndex: '100% waterproof, wind load 80 km/h',
    frameType: '6061/T6 heavy-duty aluminum alloy profiles',
    badge: 'Premium VIP',
    setupTime: '45 minutes',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Striking architectural pagoda high-peak roof',
      'Rust-proof aluminum frame with galvanized steel connectors',
      'Removable sliding sidewalls with panoramic clear panels',
      'Modular design — can be linked together with rain gutters',
      'Full installation crew and safety anchoring included',
    ],
  },
  {
    id: 'luxury-safari-canvas-lodge',
    name: 'Safari canvas luxury lodge tent',
    category: 'safari',
    tagline: 'Heavy-duty 420g canvas lodge tent with veranda for eco-resorts & glamping',
    description:
      'Authentic East African safari lodge tent engineered for wilderness retreats, eco-lodges, farm stays, and luxury bush camping. Built from 420g/m² waterproof ripstop cotton-poly canvas with treated anti-mildew coating, shade-fly over-roof, and a spacious front veranda.',
    pricePerDay: 280000,
    salePrice: 3800000,
    capacity: 6,
    size: '6.0m x 4.0m x 2.8m center height',
    material: '420g/m² Ripstop poly-cotton canvas + 550g PVC bucket floor',
    waterproofIndex: '5000mm hydrostatic head',
    frameType: '32mm heavy-gauge galvanized steel frame',
    badge: 'Safari classic',
    setupTime: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Spacious master bedroom plus covered front veranda',
      'Heavy-duty mosquito mesh windows with canvas storm flaps',
      'Stove jack chimney outlet ready for outdoor heating',
      'Sewn-in 550g PVC tub groundsheet prevents water ingress',
      'UV-resistant tropical shade fly for cool temperature control',
    ],
  },
  {
    id: 'luxury-bell-glamping-tent',
    name: 'Luxury glamping bell tent (5-meter)',
    category: 'safari',
    tagline: 'Yurt-style breathable 320g cotton canvas bell tent with zip-off floor',
    description:
      'Romantic 5-meter bell glamping tent with a single center pole for simple setup. Features 320g breathable waterproof cotton canvas that stays cool in sunshine and warm during chilly nights. Comes complete with fairy string lights, plush floor rugs, and cozy cushions.',
    pricePerDay: 160000,
    salePrice: 1950000,
    capacity: 6,
    size: '5.0m diameter x 3.0m center height',
    material: '320g/m² 100% natural cotton canvas',
    waterproofIndex: '3000mm waterproof & breathable',
    frameType: '38mm steel center pole and A-frame door pole',
    badge: 'Luxury retreat',
    setupTime: '20 minutes',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Heavy-duty 540g zipped-in PVC groundsheet',
      'Sides roll up 360 degrees for summer breeze',
      '4 roof air vents with insect screen protection',
      'Includes LED warm string lights and decorative bunting',
      'Sturdy guy ropes with grooved aluminum sliders',
    ],
  },
  {
    id: '200-seater-cathedral-wedding-marquee',
    name: '200-seater cathedral wedding marquee tent',
    category: 'event',
    tagline: 'Clear-span aluminum marquee with luxury white draping & lighting capacity',
    description:
      'Grand 200-seater clear-span wedding marquee tent engineered without internal center poles to allow 100% usable floor space. Fully compatible with chandelier lighting, air conditioning, and elevated banquet staging for high-profile Uganda celebrations.',
    pricePerDay: 750000,
    salePrice: 9200000,
    capacity: 200,
    size: '10.0m x 20.0m (200 m²)',

    material: '850g/m² double PVC-coated blockout polyester',
    waterproofIndex: '100% waterproof, DIN4102 B1 flame retardant',
    frameType: 'Hard pressed extruded aluminum alloy 6061-T6',
    badge: 'Grand weddings',
    setupTime: '4 hours (crew provided)',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Accommodates 200 seated guests or 350 standing',
      'Clear-span design with zero interior pillars',
      'Optional satin silk ceiling draping and crystal chandeliers',
      'High wind resistance tested up to 100 km/h',
      'Engineered anchoring for grass, paved, or asphalt grounds',
    ],
  },
  {
    id: 'ultralight-backpacking-tent',
    name: '2-person ultralight trekking & mountain tent',
    category: 'camping',
    tagline: 'Compact 1.8kg double-wall tent for Rwenzori hikes and backpacking',
    description:
      'Ultra-compact backpacking tent designed for trekking Mount Rwenzori, Mount Elgon, and remote safari trails. Built with 20D silicone-coated ripstop nylon, 7001 aluminum alloy poles, and taped waterproof seams to withstand extreme mountain downpours.',
    pricePerDay: 30000,
    salePrice: 165000,
    capacity: 2,
    size: '2.10m x 1.35m x 1.10m',
    material: '20D Silicon coated ripstop nylon PU4000mm',
    waterproofIndex: '4000mm waterproof rating',
    frameType: '7001 aviation aluminum poles',
    badge: 'Ultralight 1.8kg',
    setupTime: '3 minutes',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Ultralight weight only 1.8 kg including pegs',
      'Freestanding double-wall condensation control design',
      'Dual vestibules for hiking boots and backpacks',
      'High-strength 7001 aluminum alloy frame',
      'Packs down to small 40cm x 13cm cylinder',
    ],
  },
  {
    id: 'military-relief-frame-tent',
    name: '8-10 person disaster relief & military frame tent',
    category: 'dome',
    tagline: 'Heavy-duty galvanized steel tube canvas tent for field camps and clinics',
    description:
      'Heavy-duty humanitarian and military camp tent constructed from olive green water-repellent duck canvas with hot-dip galvanized steel framing. Widely deployed across East Africa for field medical clinics, temporary housing, and remote mining sites.',
    pricePerDay: 120000,
    salePrice: 1750000,
    capacity: 10,
    size: '4.8m x 4.8m x 2.6m ridge height',
    material: '500g/m² heavy waterproof military canvas',
    waterproofIndex: '4000mm hydrostatic head',
    frameType: '38mm x 1.2mm hot-dip galvanized steel pipes',
    badge: 'Heavy duty',
    setupTime: '30 minutes',
    image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Accommodates 8-10 field cots with center corridor',
      'Flame-retardant and rot-proof canvas treatment',
      'Four ventilation windows with internal roll-up flaps',
      'Reinforced eaves and peak grommets with steel guy cables',
      'Extreme durability in tropical heat and torrential rain',
    ],
  },
  {
    id: 'overland-car-side-awning-tent',
    name: 'Overland car side awning & annex tent',
    category: 'camping',
    tagline: 'Pull-out vehicle roof awning tent with full mosquito enclosure room',
    description:
      'Safari overland pull-out vehicle side awning featuring an attachable 4-wall waterproof room with floor. Mounts directly to 4x4 roof racks, safari Land Cruisers, and SUVs for instant shelter during game park safaris and cross-country road trips.',
    pricePerDay: 90000,
    salePrice: 1250000,
    capacity: 4,
    size: '2.5m out x 2.0m along vehicle x 2.0m height',

    material: '420D Heavy ripstop Oxford with waterproof PU coating',
    waterproofIndex: '3000mm waterproof & UV50+',
    frameType: 'Telescopic aluminum twist-lock poles',
    badge: '4x4 overlanding',
    setupTime: '2 minutes',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Mounts to any roof rack or crossbars',
      'Telescopic twist-lock aluminum legs for easy height adjustment',
      'Fully enclosed annex room with mosquito netting and zipper door',
      'Heavy-duty PVC travel cover with heavy zip',
      'Includes mounting brackets, guy ropes, and steel stakes',
    ],
  },
];

export const categoryLabels: Record<TentCategory, string> = {
  camping: 'Camping tents',
  event: 'Event & wedding tents',
  safari: 'Safari & glamping',
  dome: 'Dome & relief tents',
  canopy: 'Canopy & gazebos',
};

export const categoryDescriptions: Record<TentCategory, string> = {
  camping: 'Instant pop-up and ultralight camping tents for outdoor adventures',
  event: 'Heavy-duty PVC tents for weddings, church functions, and parties',
  safari: 'Luxury canvas lodge and bell tents for safari retreats and glamping',
  dome: 'Spacious hexagonal domes and field disaster relief tents',
  canopy: 'Branded pop-up gazebos and pagoda marquees for exhibitions',
};

export function formatUGX(amount: number): string {
  return 'USh ' + amount.toLocaleString('en-UG');
}
