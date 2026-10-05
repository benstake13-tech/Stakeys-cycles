export interface PriceItem {
  name: string;
  description: string;
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
  'Every job is quoted individually — get in touch and we will give you a clear, fixed price before any work begins.',
  'Quotes are for labour only. Parts (inner tubes, cables, brake pads, chains, motors, batteries and so on) are additional and confirmed with you up front.',
  'We keep costs down by using quality second-hand and reconditioned parts wherever we can.',
  'More complex jobs — internal hub gears, hydraulic brake bleeds and e-bike or e-scooter diagnostics — are quoted on the specialist time involved.',
];

export const PRICE_SECTIONS: PriceSection[] = [
  {
    id: 'bicycle',
    title: 'Bicycle Repair Services',
    intro: 'The repairs we carry out on bikes of every kind — ask for a quote on any of them.',
    groups: [
      {
        title: 'Standard Repairs',
        items: [
          {
            name: 'Puncture Repair / Tube Fit',
            description: 'Replace inner tube (wheel in bike), including electric and fat-tyre bikes.',
          },
          {
            name: 'Tyre Fit',
            description: 'Fit new tyre.',
          },
          {
            name: 'Wheel True',
            description: 'Correct minor lateral/radial wobbles.',
          },
          {
            name: 'Hub Service',
            description: 'Clean and regrease bearings (cup & cone).',
          },
          {
            name: 'Cassette / Freewheel Fit',
            description: 'Remove old, fit new cassette or freewheel.',
          },
        ],
      },
      {
        title: 'Brakes (Rim & Disc)',
        items: [
          {
            name: 'Brake Adjustment',
            description: 'Adjust cable tension & pad alignment (per brake).',
          },
          {
            name: 'Pad Fit & Adjust',
            description: 'Fit new pads and adjust (per brake).',
          },
          {
            name: 'Cable Replacement',
            description: 'Replace inner/outer brake cable (per brake).',
          },
          {
            name: 'Hydraulic Brake Bleed',
            description: 'Bleed system and replace fluid (per brake, or the full set).',
          },
          {
            name: 'Caliper / Lever Fit',
            description: 'Install new brake caliper or lever (per unit).',
          },
        ],
      },
      {
        title: 'Drivetrain & Gears',
        items: [
          {
            name: 'Gear Adjustment',
            description: 'Index gears for smooth shifting (per derailleur).',
          },
          {
            name: 'Cable Replacement',
            description: 'Replace inner/outer gear cable (per derailleur).',
          },
          {
            name: 'Chain Fit',
            description: 'Remove old, fit new chain.',
          },
          {
            name: 'Cassette / Chainring Fit',
            description: 'Replace worn cassette or chainring.',
          },
          {
            name: 'Derailleur Hanger Align.',
            description: 'Straighten bent rear derailleur hanger.',
          },
          {
            name: 'Derailleur Fit',
            description: 'Install new front or rear derailleur.',
          },
          {
            name: 'Bottom Bracket Fit / Service',
            description: 'Replace or service bottom bracket.',
          },
          {
            name: 'Crankset Fit',
            description: 'Install new crankset.',
          },
          {
            name: 'Internal Hub Gear Service',
            description: 'Complex service for enclosed gears (e.g. Shimano Nexus, Rohloff).',
          },
        ],
      },
      {
        title: 'Steering & Bearings',
        items: [
          {
            name: 'Headset Adjustment',
            description: 'Tighten loose headset.',
          },
          {
            name: 'Headset Fit / Service',
            description: 'Replace or service headset bearings.',
          },
          {
            name: 'Handlebar / Stem Fit',
            description: 'Install new bars or stem.',
          },
          {
            name: 'Bar Tape Wrap',
            description: 'Re-wrap handlebars with new tape.',
          },
        ],
      },
      {
        title: 'Accessories & Miscellaneous',
        items: [
          {
            name: 'Accessory Fit',
            description: 'Fit basic accessories (lights, computer, bottle cage).',
          },
          {
            name: 'Rack / Fender Fit',
            description: 'Install pannier rack or mudguards.',
          },
          {
            name: 'Bike Build from Box',
            description: 'Assemble and safety-check a new bike bought online.',
          },
          {
            name: 'Dropper Post Fit / Service',
            description: 'Install or service a hydraulic dropper seat post.',
          },
        ],
      },
    ],
  },
  {
    id: 'escooter',
    title: 'E-Scooter Repair Services',
    intro:
      'E-scooter repairs share many mechanical parts with bicycles but add specific electrical and software diagnostics — ask for a quote.',
    groups: [
      {
        title: 'Standard Service & Diagnostics',
        items: [
          {
            name: 'Basic Health Check',
            description: 'Inspect tyres, brakes, folding mechanism and general safety.',
          },
          {
            name: 'Full Service',
            description:
              'Basic check plus a deeper clean, detailed brake adjustment and electrical connection check.',
          },
          {
            name: 'Diagnostic Fee',
            description:
              'Troubleshooting electrical faults (motor, battery, controller issues).',
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
          },
          {
            name: 'Motor Wheel Replacement',
            description: 'Install a new motor wheel.',
          },
        ],
      },
      {
        title: 'Brakes',
        items: [
          {
            name: 'Brake Adjustment',
            description: 'Adjust mechanical or electronic brake cable/lever.',
          },
          {
            name: 'Brake Pad Replacement',
            description: 'Replace disc brake pads (per brake).',
          },
          {
            name: 'Brake Cable Replacement',
            description: 'Replace inner/outer brake cable.',
          },
          {
            name: 'Hydraulic Brake Bleed',
            description: 'For scooters with hydraulic brakes (per brake, or the full set).',
          },
        ],
      },
      {
        title: 'Electrical & Electronics',
        items: [
          {
            name: 'Battery Replacement',
            description: 'Install a new battery pack.',
          },
          {
            name: 'Controller Replacement',
            description: 'Install a new motor controller.',
          },
          {
            name: 'Throttle / Display Replacement',
            description: 'Install a new throttle or display unit.',
          },
          {
            name: 'Motor Cable Repair / Replacement',
            description: 'Repair damaged motor wiring or replace cable.',
          },
        ],
      },
      {
        title: 'Frame & Folding Mechanism',
        items: [
          {
            name: 'Folding Mechanism Repair',
            description: 'Adjust or replace components of the folding latch.',
          },
          {
            name: 'Stem Straightening / Replacement',
            description: 'Correct a bent stem or install a new one.',
          },
          {
            name: 'Kickstand Replacement',
            description: 'Fit a new kickstand.',
          },
        ],
      },
    ],
  },
];
