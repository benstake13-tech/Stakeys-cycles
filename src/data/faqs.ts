export interface Faq {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: Faq[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'repairs',
    title: 'Repairs & Service',
    items: [
      {
        q: 'Do you offer repair services?',
        a: 'Yes, absolutely! We provide comprehensive repair and maintenance services for a wide range of bicycles and other wheeled vehicles.',
      },
      {
        q: 'What is the typical turnaround time for repairs?',
        a: 'Most minor repairs are completed within a couple of hours. However, the exact turnaround time depends on the complexity of the job, the current volume of work, and the availability of any necessary parts. We will provide you with a more precise time estimate when you drop off your bike.',
      },
      {
        q: 'Do you offer tune-ups or full overhauls?',
        a: 'Yes, we offer both standard tune-ups to keep your bike running smoothly and full, in-depth overhauls for bikes that need more extensive work and restoration.',
      },
      {
        q: 'Can I bring in a bike not purchased from your shop for repairs?',
        a: 'Definitely! We are happy to service any bike, regardless of where it was purchased.',
      },
      {
        q: 'Do you work on e-bikes and scooters?',
        a: 'Yes, we are equipped to perform repairs and service on both e-bikes and e-scooters.',
      },
      {
        q: 'What is your labour rate for repairs, and how is the cost determined?',
        a: 'Our labour rates are determined on a per-job basis rather than a fixed hourly rate, which ensures you are only charged for the specific work your bike requires. When you bring your bike in, we will assess the necessary work and provide you with a detailed estimate before any work begins.',
      },
    ],
  },
  {
    id: 'parts',
    title: 'Parts & Accessories',
    items: [
      {
        q: 'Do you sell parts for specific bike types (e.g. BMX, road, mountain)?',
        a: 'We stock a variety of common parts and accessories for different bike types. Availability depends on our current inventory. It is best to contact us or check our stock if you are looking for a highly specific item.',
      },
      {
        q: "Can you order a specific part if it's not in stock?",
        a: 'Yes, we are happy to special order parts for you if we do not currently have them in stock. We will provide an estimated delivery time and price when placing the order.',
      },
      {
        q: 'Do you offer custom builds?',
        a: 'No, we do not currently offer full custom bike building services.',
      },
    ],
  },
  {
    id: 'general',
    title: 'General Information',
    items: [
      {
        q: 'What are your shop hours?',
        a: 'We offer a 24-hour service for dropping off and picking up repairs. However, the actual repair and maintenance work is performed between 8:00 AM and 8:00 PM.',
      },
      {
        q: 'Where are you located?',
        a: 'We are a mobile, call-out-only service based in Salford. We come to you — just provide your postcode and we will calculate a simple call-out fee.',
      },
      {
        q: 'What types of payment do you accept?',
        a: 'We accept payments via bank transfer and cash.',
      },
      {
        q: 'Do you offer bike rentals?',
        a: 'No, we do not currently offer bike rentals.',
      },
      {
        q: 'Do you offer pick-up and delivery service for repairs?',
        a: 'Yes, we offer a convenient pick-up and delivery service. A charge is applied per mile travelled. Please contact us for a quote based on your location.',
      },
    ],
  },
];

export interface HazardGuidance {
  q: string;
  a: string;
}

/** "Riding conditions" guidance from the original site. */
export const RIDING_HAZARDS: HazardGuidance[] = [
  {
    q: 'I often cycle along canals or rivers. What specific damage should I worry about?',
    a: 'The biggest risk from canals and deep water is to your bearings (in the wheel hubs, bottom bracket and headset) and the chain. Submerging your bike, even briefly, can force water into these sealed areas. This water washes away grease and causes rapid corrosion and pitting, leading to a grinding feel, play and eventual failure. If your bike is submerged past the axles, have your bearings inspected, cleaned and re-greased by a professional immediately.',
  },
  {
    q: 'Does riding in the rain or through puddles cause permanent damage?',
    a: 'Occasional rain is fine, as bikes are designed to be weather-resistant. However, frequent exposure to water without cleaning can lead to rust on the chain, cassette and steel cables; worn-out brake pads; and contaminated lubricants. After any wet ride, wipe down your chain and apply fresh lubricant, and periodically clean your drivetrain to remove grit and grime.',
  },
  {
    q: 'What risk do I face cycling on dirty, salty or sandy roads?',
    a: 'Salt (from winter gritting or sea air) is highly corrosive to all metal components, especially frames, nuts, bolts and the drivetrain. Sand and grit are abrasive, acting like sandpaper on your chain, gear teeth and brake pads, causing them to wear out very quickly. After riding on salty or very dirty roads, give your bike a thorough rinse with fresh water and re-lubricate your chain.',
  },
  {
    q: 'What about urban hazards, like potholes and storm drains?',
    a: 'Potholes, kerbs and large debris pose a risk of immediate structural damage. The impact can bend or crack your wheel rims, ruin your tyres or even crack an aluminium or carbon frame. Storm grates with parallel bars can trap narrow road bike tyres, leading to an instant crash and potential frame damage. Ride with caution, scan the road ahead, and know the correct technique for hopping or unweighting your bike over hazards.',
  },
  {
    q: 'Can keeping my bike in a damp garage or outdoors damage it?',
    a: 'Yes. A damp, unheated environment (like a wet shed or garage) will accelerate rust on all steel components. Leaving your bike outside exposes tyres, grips and saddles to UV damage (sunlight), causing them to degrade, crack and dry out much faster than normal. Store your bike indoors, or cover it if left in a damp or sunny area.',
  },
];

export interface BikeTypeRow {
  type: string;
  bestFor: string;
  suitability: string;
  features: string;
}

export const BIKE_TYPE_GUIDE: BikeTypeRow[] = [
  {
    type: 'Road Bike',
    bestFor: 'Smooth tarmac, paved paths, long-distance cycling for speed.',
    suitability: 'Excellent: paved roads, short commutes.',
    features: 'Lightweight frame, thin slick tyres, drop handlebars (aero position).',
  },
  {
    type: 'Mountain Bike (MTB)',
    bestFor: 'Rough trails, dirt roads, technical terrain, steep climbs/descents.',
    suitability:
      'Excellent: off-road, rocky, muddy or root-filled trails. Poor: long-distance road cycling (slow and inefficient).',
    features:
      'Wide knobby tyres for grip, flat handlebars, suspension (hardtail or full-suspension), powerful disc brakes.',
  },
  {
    type: 'Gravel Bike',
    bestFor:
      'Mixed-surface riding: pavement, gravel roads, hard-packed dirt, forest service roads.',
    suitability:
      'Excellent: versatility, light touring and rougher commutes. Good: road riding (slower than a true road bike).',
    features:
      'Drop handlebars, slightly wider tyres than a road bike (35mm+), durable frame, often has mounting points for luggage.',
  },
  {
    type: 'Hybrid Bike',
    bestFor:
      'City commuting, canal towpaths, family rides, light exercise on pavement and easy dirt/gravel.',
    suitability:
      'Excellent: commuting and general fitness on varied but mostly flat surfaces.',
    features:
      'Upright riding position, flat handlebars, mid-width tyres (30–45mm), sometimes front suspension.',
  },
  {
    type: 'Cyclocross (CX) Bike',
    bestFor: 'Short, intense rides/races on grass, mud, sand and pavement.',
    suitability:
      'Excellent: highly capable in mud and wet conditions. Good: as a winter training bike.',
    features:
      'Similar to a road bike but with huge tyre clearance for mud, knobby tyres and strong brakes.',
  },
  {
    type: 'Folding Bike',
    bestFor:
      'Mixed travel (bike + train/bus), very short city commutes, apartment living with limited storage.',
    suitability:
      'Excellent: urban multi-modal commuting. Poor: long distance, rough terrain or high-speed cycling.',
    features: 'Small wheels (usually 16" or 20"), hinges to fold down to a compact size.',
  },
];
