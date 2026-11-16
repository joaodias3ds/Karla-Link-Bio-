import { ChevronRight } from 'lucide-react';
import { LinkCardItem } from '../data/psychologistData';

interface ActionLinkCardProps {
  card: LinkCardItem;
  onSelect: (id: LinkCardItem['id']) => void;
}

function CardIcon({ type }: { type: LinkCardItem['iconType'] }) {
  if (type === 'laptop') {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="16" height="11" rx="1.5" />
        <path d="M2 18.5h20" />
      </svg>
    );
  }

  if (type === 'child') {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="7.5" r="3.2" />
        <path d="M6.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M17.5 8.5c1.1 0 2 .9 2 2 0 1.6-2 3-2 3s-2-1.4-2-3c0-1.1.9-2 2-2Z" />
      </svg>
    );
  }

  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11.5c0 4.1-3.6 7.5-8 7.5-1.3 0-2.6-.3-3.7-.8L4 19.5l1.1-3.4A7.2 7.2 0 0 1 4 11.5C4 7.4 7.6 4 12 4s8 3.4 8 7.5Z" />
      <circle cx="9" cy="11.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ActionLinkCard({ card, onSelect }: ActionLinkCardProps) {
  const fullLabel = `${card.titleLine1} ${card.titleLine2}`;

  if (card.layout === 'photo-left') {
    return (
      <button
        type="button"
        onClick={() => onSelect(card.id)}
        aria-label={fullLabel}
        style={{ backgroundColor: card.bgColor, color: card.textColor }}
        className="group relative w-full h-[88px] rounded-[14px] overflow-hidden text-left border border-[#362F34]/[0.07] shadow-[0_2px_10px_rgba(54,47,52,0.05)] transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#362F34] cursor-pointer"
      >
        <div className="absolute inset-y-0 left-0 w-[55%] overflow-hidden pointer-events-none">
          <img
            src={card.imageSrc}
            alt={card.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.04] opacity-90 transition-transform duration-200 ease-out group-hover:scale-[1.07]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 32%, ${card.bgColor}d9 78%, ${card.bgColor} 100%)`,
            }}
          />
        </div>

        <div className="relative z-10 h-full flex items-center justify-end pr-4 pl-[46%] gap-3">
          <span className="font-serif text-[20px] leading-[1.14] font-medium tracking-[0.005em] text-left">
            {card.titleLine1}
            <br />
            {card.titleLine2}
          </span>
          <ChevronRight
            size={18}
            strokeWidth={1.7}
            className="opacity-75 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(card.id)}
      aria-label={fullLabel}
      style={{ backgroundColor: card.bgColor, color: card.textColor }}
      className="group relative w-full h-[88px] rounded-[14px] overflow-hidden text-left border border-[#362F34]/[0.06] shadow-[0_2px_10px_rgba(54,47,52,0.04)] transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#362F34] cursor-pointer"
    >
      <div className="absolute inset-y-0 right-0 w-[42%] overflow-hidden pointer-events-none">
        <img
          src={card.imageSrc}
          alt={card.imageAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-80 transition-transform duration-200 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${card.bgColor} 0%, ${card.bgColor}eb 30%, ${card.bgColor}33 78%, ${card.bgColor}55 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-3.5">
          <span
            className="w-[46px] h-[46px] rounded-full bg-[#FEFCF5] flex items-center justify-center shrink-0 shadow-[0_1px_5px_rgba(54,47,52,0.08)]"
            style={{ color: card.iconColor }}
          >
            <CardIcon type={card.iconType} />
          </span>
          <span className="font-serif text-[19.5px] leading-[1.14] font-medium tracking-[0.005em]">
            {card.titleLine1}
            <br />
            {card.titleLine2}
          </span>
        </div>

        <ChevronRight
          size={18}
          strokeWidth={1.7}
          className="opacity-80 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
