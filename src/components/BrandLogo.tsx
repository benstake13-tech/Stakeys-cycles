import { useState } from 'react';
import { officialLogoUrl } from '../lib/imageStorage';

export default function BrandLogo({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <span role="img" aria-label="Stakey's Cycles" className={`${className} inline-flex items-center justify-center rounded-full bg-emerald-950 text-[9px] font-bold text-emerald-400`}>STAKEY'S</span>
    : <img src={officialLogoUrl()} alt="Stakey's Cycles official logo" className={className} onError={() => setFailed(true)} />;
}
