import { PROFILE, SOCIAL_LINKS, SocialLink } from '../data/psychologistData';

interface FooterSectionProps {
  onSelectSocial: (social: SocialLink) => void;
}

function SocialGlyph({ id }: { id: SocialLink['id'] }) {
  switch (id) {
    case 'instagram':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-8h2.6l.4-3h-3V8.2c0-.9.3-1.5 1.5-1.5h1.6V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10H8v3h2.4v8h3.1Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.2 7.4a2.6 2.6 0 0 0-1.8-1.8C17.8 5.2 12 5.2 12 5.2s-5.8 0-7.4.4a2.6 2.6 0 0 0-1.8 1.8C2.4 9 2.4 12 2.4 12s0 3 .4 4.6a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.4.4 7.4.4s5.8 0 7.4-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.6.4-4.6s0-3-.4-4.6ZM10.1 15V9l5.2 3-5.2 3Z" />
        </svg>
      );
  }
}

export function FooterSection({ onSelectSocial }: FooterSectionProps) {
  return (
    <footer className="bg-[#F7E2C0] text-[#3A2E25] border-t border-[#EAD1A9]">
      <div className="px-6 py-3 text-center border-b border-[#3A2E25]/15">
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#5C4A3C]">
          Atendimento psicológico online
        </p>
      </div>

      <div className="px-6 pt-5 pb-6">
        <p className="text-[11px] font-medium text-[#4A3B30] mb-2.5">
          Me acompanhe nas redes
        </p>

        <div className="flex items-center gap-2.5">
          {SOCIAL_LINKS.map((social) => (
            <button
              key={social.id}
              type="button"
              onClick={() => onSelectSocial(social)}
              aria-label={`${social.label} de ${PROFILE.copyrightName}`}
              className="w-10 h-10 -ml-1 first:ml-0 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A2E25] cursor-pointer group"
            >
              <span className="w-[32px] h-[32px] rounded-full bg-[#FEFCF5] text-[#3A2E25] flex items-center justify-center shadow-[0_1px_4px_rgba(58,46,37,0.1)] transition-transform duration-150 group-hover:scale-105 group-hover:bg-white">
                <SocialGlyph id={social.id} />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div className="text-[10.5px] leading-[1.45] text-[#524236]">
            <p>
              {PROFILE.copyrightYear}© • {PROFILE.copyrightName}
            </p>
            <p>Todos os direitos reservados</p>
          </div>

          <p
            aria-hidden="true"
            className="font-script text-[28px] leading-none text-[#846C58] select-none shrink-0 pr-0.5"
          >
            {PROFILE.copyrightName}
          </p>
        </div>
      </div>
    </footer>
  );
}
