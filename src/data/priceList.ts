export interface PriceItem {
  name: string;
  description: string;
  price: string;
  note?: string;
}

export interface PriceGroup {
  title: string;
  items: PriceItem[];
}

export interface PriceSection {
  id: string;
  title: string;
  intro?: string;
  groups: PriceGroup[];
}

export const PRICE_NOTES: string[] = [
  'Labour only. All prices are estimates for labour only — parts (inner tubes, cables, brake pads, chains, motors, batteries) are always additional.',
  'More complex jobs (internal hub gears, hydraulic brake bleeds, e-bike diagnostics) command higher prices due to specialist knowledge and time.',
  'Electrified components (motor, battery, controller) often need specific diagnostic tools and expertise, leading to higher labour rates.',
  'A general workshop hourly rate is typically £45 – £65 per hour.',
];

export const PRICE_SECTIONS: PriceSection[] = [
  {
    id: 'bicycle',
    title: 'Bicycle Repair Price List',
    intro: 'Ballpark UK labour-only prices.',
    groups: [
      {
        title: 'Standard Repairs',
        items: [
          {
            name: 'Puncture Repair / Tube Fit',
            description: 'Replace inner tube (wheel in bike).',
            price: 'Standard £20 · Electric £30',
            note: 'Not including fat tyre bikes. Fat tyre bikes £45.',
          },
          {
            name: 'Tyre Fit',
            description: 'Fit new tyre.',
            price: '£10',
            note: 'Tyre not included.',
          },
          {
            name: 'Wheel True',
            description: 'Correct minor lateral/radial wobbles.',
            price: '£15 – £40',
          },
          {
            name: 'Hub Service',
            description: 'Clean and regrease bearings (cup & cone).',
            price: '£40',
          },
          {
            name: 'Cassette / Freewheel Fit',
            description: 'Remove old, fit new cassette or freewheel.',
            price: '£20',
            note: 'New parts not included.',
          },
        ],
      },
      {
        title: 'Brakes (Rim & Disc)',
        items: [
          {
            name: 'Brake Adjustment',
            description: 'Adjust cable tension & pad alignment (per brake).',
            price: '£10',
          },
          {
            name: 'Pad Fit & Adjust',
            description: 'Fit new pads and adjust (per brake).',
            price: '£10 – £20',
          },
          {
            name: 'Cable Replacement',
            description: 'Replace inner/outer brake cable (per brake).',
            price: '£20',
          },
          {
            name: 'Hydraulic Brake Bleed',
            description: 'Bleed system and replace fluid (per brake).',
            price: '£25',
            note: 'Or £40 for the set.',
          },
          {
            name: 'Caliper / Lever Fit',
            description: 'Install new brake caliper or lever (per unit).',
            price: '£20',
          },
        ],
      },
      {
        title: 'Drivetrain & Gears',
        items: [
          {
            name: 'Gear Adjustment',
            description: 'Index gears for smooth shifting (per derailleur).',
            price: '£10',
          },
          {
            name: 'Cable Replacement',
            description: 'Replace inner/outer gear cable (per derailleur).',
            price: '£15',
          },
          {
            name: 'Chain Fit',
            description: 'Remove old, fit new chain.',
            price: '£20',
            note: 'Chain not included.',
          },
          {
            name: 'Cassette / Chainring Fit',
            description: 'Replace worn cassette or chainring.',
            price: '£15 – £25',
          },
          {
            name: 'Derailleur Hanger Align.',
            description: 'Straighten bent rear derailleur hanger.',
            price: '£10 – £20',
            note: 'The hanger is built to break to protect your frame, so this will likely need replacing.',
          },
          {
            name: 'Derailleur Fit',
            description: 'Install new front or rear derailleur.',
            price: '£15',
          },
          {
            name: 'Bottom Bracket Fit / Service',
            description: 'Replace or service bottom bracket.',
            price: '£40',
          },
          {
            name: 'Crankset Fit',
            description: 'Install new crankset.',
            price: '£30',
          },
          {
            name: 'Internal Hub Gear Service',
            description: 'Complex service for enclosed gears (e.g. Shimano Nexus, Rohloff).',
            price: '£60 – £90+',
          },
        ],
      },
      {
        title: 'Steering & Bearings',
        items: [
          {
            name: 'Headset Adjustment',
            description: 'Tighten loose headset.',
            price: '£8 – £15',
          },
          {
            name: 'Headset Fit / Service',
            description: 'Replace or service headset bearings.',
            price: '£20',
          },
          {
            name: 'Handlebar / Stem Fit',
            description: 'Install new bars or stem.',
            price: '£10',
          },
          {
            name: 'Bar Tape Wrap',
            description: 'Re-wrap handlebars with new tape.',
            price: '£10',
          },
        ],
      },
      {
        title: 'Accessories & Miscellaneous',
        items: [
          {
            name: 'Accessory Fit',
            description: 'Fit basic accessories (lights, computer, bottle cage).',
            price: '£5 per item',
          },
          {
            name: 'Rack / Fender Fit',
            description: 'Install pannier rack or mudguards.',
            price: '£20',
          },
          {
            name: 'Bike Build from Box',
            description: 'Assemble and safety-check a new bike bought online.',
            price: '£60 adult · £30 child’s',
            note: 'Child’s price applies to bikes without gears.',
          },
          {
            name: 'Dropper Post Fit / Service',
            description: 'Install or service a hydraulic dropper seat post.',
            price: '£25',
          },
        ],
      },
    ],
  },
  {
    id: 'escooter',
    title: 'E-Scooter Repair Price List',
    intro:
      'Ballpark UK labour-only prices. E-scooter repairs share many mechanical parts with bicycles but add specific electrical and software diagnostics.',
    groups: [
      {
        title: 'Standard Service & Diagnostics',
        items: [
          {
            name: 'Basic Health Check',
            description: 'Inspect tyres, brakes, folding mechanism and general safety.',
            price: '£10',
            note: 'Free with other services.',
          },
          {
            name: 'Full Service',
            description:
              'Basic check plus a deeper clean, detailed brake adjustment and electrical connection check.',
            price: '£60',
          },
          {
            name: 'Diagnostic Fee',
            description:
              'Troubleshooting electrical faults (motor, battery, controller issues).',
            price: '£10',
            note: 'Often waived if the repair proceeds.',
          },
        ],
      },
      {
        title: 'Wheels & Tyres',
        items: [
          {
            name: 'Puncture Repair / Tube Fit (Motor Wheel)',
            description:
              'Replace inner tube in a wheel with an integrated motor (more complex).',
            price: '£35',
          },
          {
            name: 'Motor Wheel Replacement',
            description: 'Install a new motor wheel.',
            price: '£40',
            note: 'Motor not included.',
          },
        ],
      },
      {
        title: 'Brakes',
        items: [
          {
            name: 'Brake Adjustment',
            description: 'Adjust mechanical or electronic brake cable/lever.',
            price: '£15',
          },
          {
            name: 'Brake Pad Replacement',
            description: 'Replace disc brake pads (per brake).',
            price: '£40',
          },
          {
            name: 'Brake Cable Replacement',
            description: 'Replace inner/outer brake cable.',
            price: '£25',
          },
          {
            name: 'Hydraulic Brake Bleed',
            description: 'For scooters with hydraulic brakes (per brake).',
            price: '£25 per brake',
            note: 'Or £40 for the set.',
          },
        ],
      },
      {
        title: 'Electrical & Electronics',
        items: [
          {
            name: 'Battery Replacement',
            description: 'Install a new battery pack.',
            price: '£40',
            note: 'Battery not included.',
          },
          {
            name: 'Controller Replacement',
            description: 'Install a new motor controller.',
            price: '£40 – £70',
            note: 'Controller not included.',
          },
          {
            name: 'Throttle / Display Replacement',
            description: 'Install a new throttle or display unit.',
            price: '£30',
            note: 'Throttle not included.',
          },
          {
            name: 'Motor Cable Repair / Replacement',
            description: 'Repair damaged motor wiring or replace cable.',
            price: '£5 per coloured cable',
          },
        ],
      },
      {
        title: 'Frame & Folding Mechanism',
        items: [
          {
            name: 'Folding Mechanism Repair',
            description: 'Adjust or replace components of the folding latch.',
            price: '£10',
          },
          {
            name: 'Stem Straightening / Replacement',
            description: 'Correct a bent stem or install a new one.',
            price: '£25 – £50',
          },
          {
            name: 'Kickstand Replacement',
            description: 'Fit a new kickstand.',
            price: '£15 – £30',
          },
        ],
      },
    ],
  },
];
