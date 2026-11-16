import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FaqItem } from '../data/psychologistData';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section aria-labelledby="duvidas-heading" className="px-6 pt-7 pb-8 bg-[#FEFCF5]">
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <h2
          id="duvidas-heading"
          className="font-serif italic text-[32px] leading-tight text-[#362F34] font-normal"
        >
          Dúvidas
        </h2>
        <span className="text-[11.5px] text-[#6E6269]">
          Atendimento infantil e pré-adolescente
        </span>
      </div>

      <div className="divide-y divide-[#E7DDD0] border-t border-b border-[#E7DDD0]">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          return (
            <div key={item.id} className={isOpen ? 'bg-[#FAE7E8]/30 transition-colors' : ''}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full min-h-[48px] py-3.5 px-1 flex items-center justify-between gap-4 text-left text-[#362F34] hover:text-[#1F1A1D] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#362F34]"
              >
                <span className="text-[13.5px] leading-snug font-medium">
                  {item.question}
                </span>
                <Plus
                  size={17}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className={`shrink-0 text-[#5D5057] transition-transform duration-150 ${
                    isOpen ? 'rotate-45' : 'rotate-0'
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="pb-4 px-1 pr-6 text-[13px] leading-[1.6] text-[#52474E]"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
