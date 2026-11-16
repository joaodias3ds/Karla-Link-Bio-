import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  FAQ_ITEMS,
  LINK_CARDS,
  ModalKind,
  PROFILE,
  SocialLink,
} from './data/psychologistData';
import { ActionLinkCard } from './components/ActionLinkCard';
import { FaqAccordion } from './components/FaqAccordion';
import { FooterSection } from './components/FooterSection';
import { ServiceModal } from './components/ServiceModal';
import { SessionFocus } from './utils/booking';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalKind>(null);
  const [activeSocial, setActiveSocial] = useState<SocialLink | null>(null);
  const [bookingFocus, setBookingFocus] = useState<SessionFocus>('crianca');

  const handleCloseModal = () => {
    setActiveModal(null);
    setActiveSocial(null);
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center sm:py-8 sm:px-4"
      style={{
        background:
          'linear-gradient(155deg, #FEFCF5 0%, #F7E2C038 38%, #F0EBF270 72%, #FAE7E848 100%)',
      }}
    >
      <main className="w-full max-w-[430px] bg-[#FEFCF5] sm:rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(54,47,52,0.10)] sm:border sm:border-[#EAE0D2] flex flex-col">
        {/* 1. Hero Header */}
        <section className="relative bg-[#FEFCF5] pt-5 pb-7 overflow-hidden min-h-[415px] flex items-stretch">
          {/* Right portrait seamlessly blended into Chantilly */}
          <div className="absolute top-3 right-0 bottom-0 w-[56%] pointer-events-none select-none overflow-hidden">
            <img
              src={PROFILE.heroImage}
              alt={`${PROFILE.firstName} ${PROFILE.lastName}, ${PROFILE.role}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top scale-[1.03]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #FEFCF5 0%, rgba(254,252,245,0.95) 16%, rgba(254,252,245,0) 44%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-16"
              style={{
                background:
                  'linear-gradient(0deg, #FEFCF5 0%, rgba(254,252,245,0) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-10"
              style={{
                background:
                  'linear-gradient(180deg, #FEFCF5 0%, rgba(254,252,245,0.75) 40%, rgba(254,252,245,0) 100%)',
              }}
            />
          </div>

          {/* Left typography lockup */}
          <div className="relative z-10 w-[57%] pl-6 pr-2 flex flex-col justify-between pt-2 pb-4">
            <div>
              <span
                aria-hidden="true"
                className="block font-script text-[52px] leading-[0.8] text-[#D4C3AE] select-none ml-2 mb-4"
              >
                {PROFILE.monogram}
              </span>

              <h1 className="font-serif text-[41px] leading-[0.98] tracking-[-0.01em] text-[#362F34] font-normal">
                {PROFILE.firstName}
                <br />
                {PROFILE.lastName}
              </h1>

              <p className="font-serif text-[20px] leading-snug text-[#4E434A] mt-1.5">
                {PROFILE.role}
              </p>
              <p className="text-[11.5px] font-medium text-[#75646E] mt-0.5">
                {PROFILE.specialty}
              </p>
            </div>

            <p className="text-[13px] leading-[1.48] text-[#4E434A] mt-7 max-w-[172px]">
              {PROFILE.heroTaglinePrefix}
              <strong className="font-semibold text-[#362F34]">
                {PROFILE.heroTaglineBold1}
              </strong>
              {PROFILE.heroTaglineMiddle}
              <strong className="font-semibold text-[#362F34]">
                {PROFILE.heroTaglineBold2}
              </strong>
              {PROFILE.heroTaglineSuffix}
            </p>
          </div>
        </section>

        {/* 2. Link-in-Bio Action Cards */}
        <section aria-label="Links principais" className="px-5 space-y-3 bg-[#FEFCF5]">
          {LINK_CARDS.map((card) => (
            <ActionLinkCard
              key={card.id}
              card={card}
              onSelect={(id) => {
                setActiveSocial(null);
                setBookingFocus(id === 'infantil' ? 'pre-adolescente' : 'crianca');
                setActiveModal(id);
              }}
            />
          ))}
        </section>

        {/* 3. Quote / Manifesto Box */}
        <section className="px-5 pt-7 pb-6 bg-[#FEFCF5]">
          <div className="rounded-[18px] border border-[#E5D5C0] px-6 py-5 bg-[#FEFCF5] shadow-[0_2px_12px_rgba(247,226,192,0.18)]">
            <p className="text-[13.5px] leading-[1.6] text-[#4C4248]">
              {PROFILE.quotePrefix}
              <strong className="font-semibold text-[#362F34]">
                {PROFILE.quoteBold}
              </strong>
              {PROFILE.quoteSuffix}
            </p>
          </div>
        </section>

        {/* 4. Sobre Mim Section (Haze lavender-pastel curved card) */}
        <section
          aria-labelledby="sobre-mim-heading"
          className="relative bg-[#F0EBF2] rounded-tl-[124px] overflow-hidden min-h-[410px] flex items-end"
        >
          {/* Seated Portrait Right blended cleanly into Haze */}
          <div className="absolute inset-y-0 right-0 w-[68%] pointer-events-none select-none">
            <img
              src={PROFILE.sobreImage}
              alt={`${PROFILE.firstName} ${PROFILE.lastName} no consultório`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #F0EBF2 0%, #F0EBF2 26%, rgba(240,235,242,0.9) 42%, rgba(240,235,242,0.22) 64%, rgba(240,235,242,0) 82%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  'linear-gradient(0deg, rgba(240,235,242,0.65) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Left Editorial Overlay */}
          <div className="relative z-10 w-[66%] pl-6 pr-2 pt-32 pb-7">
            <h2
              id="sobre-mim-heading"
              className="font-serif text-[30px] leading-tight text-[#362E3B] font-normal"
            >
              {PROFILE.sobreTitle}
            </h2>

            <p className="mt-2.5 text-[12px] leading-[1.58] text-[#493F4F]">
              {PROFILE.sobreBody}
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveSocial(null);
                setActiveModal('abordagem');
              }}
              className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#FEFCF5] hover:bg-white text-[#362E3B] border border-[#DDD4E2] text-[13px] font-medium px-4 py-2 min-h-[40px] shadow-[0_2px_8px_rgba(54,46,59,0.06)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#362E3B]"
            >
              <span>{PROFILE.sobreButtonLabel}</span>
              <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* 5. Dúvidas (FAQ Accordion) */}
        <FaqAccordion items={FAQ_ITEMS} />

        {/* 6. Trust Metrics & Footer */}
        <FooterSection
          onSelectSocial={(social) => {
            setActiveModal(null);
            setActiveSocial(social);
          }}
        />
      </main>

      <ServiceModal
        activeModal={activeModal}
        activeSocial={activeSocial}
        defaultFocus={bookingFocus}
        onClose={handleCloseModal}
        onSwitchToBooking={(defaultFocus = 'crianca') => {
          setActiveSocial(null);
          setBookingFocus(defaultFocus);
          setActiveModal('agendar');
        }}
      />
    </div>
  );
}
