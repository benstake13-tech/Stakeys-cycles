import type { VehicleCategory } from '../types/backend';

export interface VehicleOption {
  id: VehicleCategory;
  label: string;
  blurb: string;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: 'cycle', label: 'Bicycle', blurb: 'Road, hybrid, MTB, BMX or folding' },
  { id: 'ebike', label: 'E-bike', blurb: 'Pedal-assist and electric bikes' },
  { id: 'electric_scooter', label: 'E-scooter', blurb: 'Electric kick scooters' },
  { id: 'cargo', label: 'Cargo bike', blurb: 'Cargo and family bikes' },
];

export interface ServiceOption {
  id: string;
  title: string;
  price: number;
  blurb: string;
  categories: VehicleCategory[];
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'callout-diagnostic',
    title: 'Call-out, diagnostic & quote',
    price: 0,
    blurb: 'We come to you, assess the fault and give you a fixed quote before any work.',
    categories: ['cycle', 'ebike', 'electric_scooter', 'cargo'],
  },
  {
    id: 'cycle-tune',
    title: 'Standard tune-up',
    price: 45,
    blurb: 'Brakes, gears, tyres and a safety check to keep you rolling.',
    categories: ['cycle', 'ebike', 'cargo'],
  },
  {
    id: 'full-service',
    title: 'Full service & overhaul',
    price: 85,
    blurb: 'Deep clean, strip and rebuild of bearings, drivetrain and brakes.',
    categories: ['cycle', 'ebike', 'cargo'],
  },
  {
    id: 'puncture',
    title: 'Puncture repair / tube fit',
    price: 20,
    blurb: 'Inner tube replaced on the spot (wheel in bike).',
    categories: ['cycle', 'ebike', 'cargo'],
  },
  {
    id: 'scooter-service',
    title: 'E-scooter full service',
    price: 60,
    blurb: 'Safety check, brake adjustment and electrical connection inspection.',
    categories: ['electric_scooter'],
  },
  {
    id: 'ebike-diagnostic',
    title: 'E-bike / e-scooter electrical diagnostic',
    price: 10,
    blurb: 'Motor, battery and controller fault-finding with the right tools.',
    categories: ['ebike', 'electric_scooter'],
  },
  {
    id: 'not-sure',
    title: 'Not sure — help me choose',
    price: 0,
    blurb: 'Tell us the symptoms and we will work out what it needs.',
    categories: ['cycle', 'ebike', 'electric_scooter', 'cargo'],
  },
];

export function servicesForCategory(category: VehicleCategory): ServiceOption[] {
  return SERVICE_OPTIONS.filter((s) => s.categories.includes(category));
}

export interface IssueCategory {
  id: string;
  title: string;
  items: { id: string; label: string }[];
}

export const ISSUE_CATEGORIES: IssueCategory[] = [
  {
    id: 'brakes',
    title: 'Brakes',
    items: [
      { id: 'brakes-squeaky', label: 'Squeaky or noisy brakes' },
      { id: 'brakes-rubbing', label: 'Brakes rubbing' },
      { id: 'brakes-weak', label: 'Weak braking / spongy lever' },
      { id: 'brakes-fluid-leak', label: 'Hydraulic fluid leaking' },
    ],
  },
  {
    id: 'drivetrain',
    title: 'Gears & drivetrain',
    items: [
      { id: 'gears-slipping', label: 'Gears slipping or jumping' },
      { id: 'gears-chain-drop', label: 'Chain dropping off' },
      { id: 'gears-noisy', label: 'Noisy, clicking or grinding' },
      { id: 'gears-pedals-stiff', label: 'Pedals stiff or rough' },
    ],
  },
  {
    id: 'wheels',
    title: 'Wheels & tyres',
    items: [
      { id: 'wheels-flat-puncture', label: 'Flat tyre / puncture' },
      { id: 'wheels-wobbly', label: 'Wheel wobbling / untrue' },
      { id: 'wheels-broken-spoke', label: 'Broken or loose spoke' },
      { id: 'wheels-hub-loose', label: 'Hub clicking or loose' },
    ],
  },
  {
    id: 'ebike',
    title: 'Electrical (e-bike & e-scooter)',
    items: [
      { id: 'ebike-no-power', label: 'No power / will not switch on' },
      { id: 'ebike-battery-range', label: 'Battery not holding charge' },
      { id: 'ebike-motor-cutout', label: 'Motor cutting out' },
      { id: 'ebike-throttle', label: 'Throttle or display not working' },
    ],
  },
  {
    id: 'general',
    title: 'General',
    items: [
      { id: 'general-full-service', label: 'Full service / health check' },
      { id: 'general-noise', label: 'Strange noise I cannot place' },
      { id: 'general-assembly', label: 'New bike assembly from a box' },
      { id: 'general-other', label: 'Something else' },
    ],
  },
];

export const ISSUE_LABELS: Record<string, string> = Object.fromEntries(
  ISSUE_CATEGORIES.flatMap((c) => c.items.map((i) => [i.id, i.label]))
);

export const TIME_SLOTS: string[] = [
  'Morning (09:00 – 12:00)',
  'Afternoon (12:00 – 15:00)',
  'Late afternoon (15:00 – 18:00)',
  'Evening (18:00 – 20:00)',
  'Flexible — any time',
];
