interface LogoMarkProps {
  className?: string;
}

/**
 * CBK ring emblem: bold CBK between a split outer ring and lime inner arcs,
 * with the K's upper arm in lime. Keep in sync with public/favicon.svg
 * (a simplified version without the inner arcs, for tiny sizes).
 */
export function LogoMark({ className = 'h-10 w-10' }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" className={className}>
      <rect width="200" height="200" rx="44" fill="#0c0d10" />
      <g fill="none" strokeLinecap="round">
        <path d="M17.3 69.9A88 88 0 0 1 182.7 69.9" stroke="#f3f4f6" strokeWidth="12" />
        <path d="M17.3 130.1A88 88 0 0 0 182.7 130.1" stroke="#f3f4f6" strokeWidth="12" />
        <path d="M35.9 63A74 74 0 0 1 164.1 63" stroke="#b9f26b" strokeWidth="5" />
        <path d="M35.9 137A74 74 0 0 0 164.1 137" stroke="#b9f26b" strokeWidth="5" />
      </g>
      <g fill="none" strokeWidth="10" strokeLinejoin="round">
        <path d="M66 83H35A17 17 0 0 0 35 117H66" stroke="#f3f4f6" />
        <path d="M79 78V122M79 83H112A8.5 8.5 0 0 1 112 100H79M79 100H113A8.5 8.5 0 0 1 113 117H79" stroke="#f3f4f6" />
        <path d="M139 78V122M142 100L186 120" stroke="#f3f4f6" />
        <path d="M186 80L142 100" stroke="#b9f26b" />
      </g>
    </svg>
  );
}
