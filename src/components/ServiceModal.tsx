import { useEffect, useState, FormEvent } from 'react';
import { Calendar, CheckCircle2, Copy, Check, MessageCircle, Sparkles, Video, X } from 'lucide-react';
import { ModalKind, PROFILE, SocialLink } from '../data/psychologistData';
import {
  AVAILABLE_DAYS,
  AVAILABLE_PERIODS,
  BookingErrors,
  ContactErrors,
  formatBookingSummary,
  SessionFocus,
  validateBooking,
  validateContactMessage,
} from '../utils/booking';

interface ServiceModalProps {
  activeModal: ModalKind;
  activeSocial: SocialLink | null;
  defaultFocus?: SessionFocus;
  onClose: () => void;
  onSwitchToBooking: (defaultFocus?: SessionFocus) => void;
}

const QUICK_TOPICS = [
  'Quero saber valores e horários disponíveis',
  'Gostaria de agendar a entrevista inicial com os pais',
  'Tenho dúvidas sobre o atendimento infantil online',
];

export function ServiceModal({
  activeModal,
  activeSocial,
  defaultFocus = 'crianca',
  onClose,
  onSwitchToBooking,
}: ServiceModalProps) {
  const isOpen = activeModal !== null || activeSocial !== null;

  const [focus, setFocus] = useState<SessionFocus>(defaultFocus);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [preferredDay, setPreferredDay] = useState(AVAILABLE_DAYS[0]);
  const [preferredPeriod, setPreferredPeriod] = useState(AVAILABLE_PERIODS[1]);
  const [notes, setNotes] = useState('');
  const [bookingErrors, setBookingErrors] = useState<BookingErrors>({});
  const [bookingSubmitted, setBookingSubmitted] = useState<string | null>(null);

  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [copiedContact, setCopiedContact] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    setFocus(defaultFocus);
    setBookingErrors({});
    setBookingSubmitted(null);
    setContactErrors({});
    setContactSubmitted(false);
    setCopiedContact(false);
  }, [activeModal, activeSocial, defaultFocus]);

  if (!isOpen) return null;

  const handleBookingSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      name,
      contact,
      focus,
      preferredDay,
      preferredPeriod,
      notes,
    };
    const errors = validateBooking(payload);
    setBookingErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setBookingSubmitted(formatBookingSummary(payload));
  };

  const handleContactSubmit = (event: FormEvent) => {
    event.preventDefault();
    const errors = validateContactMessage({
      name: contactName,
      contact: contactInfo,
      message: contactMessage,
    });
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setContactSubmitted(true);
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.whatsappDisplay);
      setCopiedContact(true);
      setTimeout(() => setCopiedContact(false), 2000);
    } catch {
      setCopiedContact(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#362F34]/40 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[440px] max-h-[88vh] overflow-y-auto rounded-t-[24px] sm:rounded-[22px] bg-[#FEFCF5] text-[#362F34] shadow-2xl border border-[#EAE0D0] p-6"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EFE6D8]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7A6B72]">
              {PROFILE.firstName} {PROFILE.lastName} · {PROFILE.crp}
            </p>
            <h3 id="modal-title" className="font-serif text-[26px] leading-tight text-[#362F34] mt-0.5">
              {activeSocial
                ? activeSocial.label
                : activeModal === 'agendar'
                  ? 'Agende sua sessão'
                  : activeModal === 'online'
                    ? 'Psicoterapia Online'
                    : activeModal === 'infantil'
                      ? 'Crianças e Pré-adolescentes'
                      : activeModal === 'abordagem'
                        ? 'Minha abordagem'
                        : 'Fale comigo'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="w-10 h-10 -mr-2 -mt-1 rounded-full flex items-center justify-center text-[#6A5D63] hover:bg-[#F0EBF2] transition-colors duration-150 cursor-pointer"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        {activeModal === 'agendar' && (
          <div className="pt-4">
            {bookingSubmitted ? (
              <div className="py-4 text-center space-y-3">
                <CheckCircle2 size={38} className="mx-auto text-[#4E6B5C]" aria-hidden="true" />
                <h4 className="font-serif text-[24px] text-[#362F34]">
                  Solicitação enviada
                </h4>
                <p className="text-[13.5px] leading-relaxed text-[#574C52]">
                  Obrigada, <strong>{name}</strong>. Recebi sua solicitação para{' '}
                  <strong>{bookingSubmitted}</strong> e confirmarei rapidamente pelo{' '}
                  <strong>{contact}</strong>.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full min-h-[44px] rounded-full bg-[#F7E2C0] hover:bg-[#F2D5A6] text-[#3A2E25] text-[13.5px] font-medium px-6 py-2.5 transition-colors duration-150 cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} noValidate className="space-y-3.5">
                <div className="flex items-center gap-2 text-[12px] text-[#5C4E55] bg-[#E9F7F0] rounded-xl px-3 py-2">
                  <Video size={14} className="shrink-0 text-[#3E5E4E]" aria-hidden="true" />
                  <span>Atendimento 100% online · Agendamento rápido</span>
                </div>

                <div>
                  <span className="block text-[12px] font-medium text-[#54494F] mb-1.5">
                    Para quem é o atendimento?
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'crianca' as const, label: 'Criança' },
                      { id: 'pre-adolescente' as const, label: 'Pré-adolescente' },
                      { id: 'pais' as const, label: 'Pais' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFocus(opt.id)}
                        className={`min-h-[40px] rounded-xl px-2 py-1.5 text-[12px] font-medium border transition-colors duration-150 cursor-pointer ${
                          focus === opt.id
                            ? 'bg-[#F0EBF2] text-[#362E3B] border-[#BFAFC9]'
                            : 'bg-white text-[#574C52] border-[#E5DDD2] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label htmlFor="booking-name" className="block text-[12px] font-medium text-[#54494F] mb-1">
                      Nome do responsável
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Seu nome"
                      className="w-full min-h-[42px] rounded-xl border border-[#DFD5C8] bg-white px-3.5 text-[13.5px] text-[#362F34] placeholder:text-[#9C9096] focus:outline-2 focus:outline-[#B89F80]"
                    />
                    {bookingErrors.name && (
                      <p className="mt-1 text-[11.5px] text-[#A4433B]">{bookingErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="booking-contact" className="block text-[12px] font-medium text-[#54494F] mb-1">
                      WhatsApp ou E-mail
                    </label>
                    <input
                      id="booking-contact"
                      type="text"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full min-h-[42px] rounded-xl border border-[#DFD5C8] bg-white px-3.5 text-[13.5px] text-[#362F34] placeholder:text-[#9C9096] focus:outline-2 focus:outline-[#B89F80]"
                    />
                    {bookingErrors.contact && (
                      <p className="mt-1 text-[11.5px] text-[#A4433B]">{bookingErrors.contact}</p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-[12px] font-medium text-[#54494F] mb-1.5">
                    Melhor dia (toque rápido)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setPreferredDay(day)}
                        className={`min-h-[36px] px-3 rounded-full text-[12px] font-medium border transition-colors duration-150 cursor-pointer ${
                          preferredDay === day
                            ? 'bg-[#FAE7E8] text-[#3D2C30] border-[#DDB8BC]'
                            : 'bg-white text-[#574C52] border-[#E5DDD2] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-[12px] font-medium text-[#54494F] mb-1.5">
                    Período
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {AVAILABLE_PERIODS.map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setPreferredPeriod(period)}
                        className={`min-h-[38px] px-2 rounded-xl text-[11.5px] font-medium border transition-colors duration-150 cursor-pointer ${
                          preferredPeriod === period
                            ? 'bg-[#F7E2C0] text-[#3A2E25] border-[#DFBE8C]'
                            : 'bg-white text-[#574C52] border-[#E5DDD2] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {period.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-notes" className="block text-[12px] font-medium text-[#54494F] mb-1">
                    Idade e observação (opcional)
                  </label>
                  <input
                    id="booking-notes"
                    type="text"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Ex: 9 anos, dificuldade com ansiedade escolar"
                    className="w-full min-h-[42px] rounded-xl border border-[#DFD5C8] bg-white px-3.5 text-[13px] text-[#362F34] placeholder:text-[#9C9096] focus:outline-2 focus:outline-[#B89F80]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[46px] rounded-full bg-[#F7E2C0] hover:bg-[#F2D5A6] text-[#3A2E25] text-[14px] font-medium flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
                >
                  <Calendar size={16} aria-hidden="true" />
                  Confirmar solicitação
                </button>
              </form>
            )}
          </div>
        )}

        {activeModal === 'online' && (
          <div className="pt-5 space-y-4 text-[13.5px] leading-[1.65] text-[#4C4248]">
            <p>
              A <strong>psicoterapia online para crianças e pré-adolescentes</strong> acontece em um ambiente digital seguro, leve e interativo, respeitando o ritmo de cada faixa etária.
            </p>
            <div className="rounded-2xl border border-[#E5DCE8] bg-[#F0EBF2]/70 p-4 space-y-2 text-[13px]">
              <p><strong>Como funciona:</strong> Recursos lúdicos, jogos, desenhos e conversa acolhedora por vídeo</p>
              <p><strong>Duração:</strong> 45 a 50 minutos semanais</p>
              <p><strong>Família:</strong> Entrevista inicial e devolutivas periódicas com os responsáveis</p>
            </div>
            <button
              type="button"
              onClick={() => onSwitchToBooking('crianca')}
              className="w-full min-h-[46px] rounded-full bg-[#F0EBF2] hover:bg-[#E5DCE8] text-[#362E3B] text-[14px] font-medium transition-colors duration-150 cursor-pointer"
            >
              Agendar sessão online
            </button>
          </div>
        )}

        {activeModal === 'infantil' && (
          <div className="pt-5 space-y-4 text-[13.5px] leading-[1.65] text-[#4C4248]">
            <p>
              Na infância e pré-adolescência, as emoções aparecem no comportamento, nas brincadeiras e nas relações. O espaço terapêutico ajuda a criança a nomear o que sente com segurança.
            </p>
            <div className="rounded-2xl border border-[#EED3D5] bg-[#FAE7E8]/70 p-4 space-y-2 text-[13px]">
              <p><strong>Crianças (6 a 10 anos):</strong> Medos, timidez, regulação emocional, rotina e adaptação escolar</p>
              <p><strong>Pré-adolescentes (11 a 14 anos):</strong> Autoestima, ansiedade, amizades e mudanças dessa fase</p>
              <p><strong>Orientação parental:</strong> Apoio direto a mães, pais e cuidadores</p>
            </div>
            <button
              type="button"
              onClick={() => onSwitchToBooking('pre-adolescente')}
              className="w-full min-h-[46px] rounded-full bg-[#FAE7E8] hover:bg-[#F5D6D8] text-[#3D2C30] text-[14px] font-medium transition-colors duration-150 cursor-pointer"
            >
              Agendar entrevista inicial
            </button>
          </div>
        )}

        {activeModal === 'abordagem' && (
          <div className="pt-5 space-y-4 text-[13.5px] leading-[1.65] text-[#4C4248]">
            <p>
              Meu cuidado clínico une o acolhimento da <strong>psicologia humanista</strong> com estratégias lúdicas e práticas da <strong>terapia cognitivo-comportamental (TCC)</strong> adaptadas para crianças e pré-adolescentes.
            </p>
            <p>
              Através do brincar, de histórias e de conversas respeitosas, a criança aprende a reconhecer sentimentos, lidar com frustrações e construir autoconfiança — sempre em parceria com a família.
            </p>
            <div className="rounded-2xl border border-[#D4EADF] bg-[#E9F7F0]/80 p-4 text-[12.5px] space-y-1 text-[#283A31]">
              <p><strong>Karla Eduarda</strong> · Psicóloga Clínica ({PROFILE.crp})</p>
              <p>Especialista em crianças e pré-adolescentes • Atendimento online desde 2023</p>
            </div>
            <button
              type="button"
              onClick={() => onSwitchToBooking('crianca')}
              className="w-full min-h-[46px] rounded-full bg-[#F7E2C0] hover:bg-[#F2D5A6] text-[#3A2E25] text-[14px] font-medium flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
            >
              <Sparkles size={15} aria-hidden="true" />
              Agendar primeira sessão
            </button>
          </div>
        )}

        {activeModal === 'contato' && (
          <div className="pt-4 space-y-3.5">
            <div className="rounded-2xl border border-[#D2E8DC] bg-[#E9F7F0]/75 p-3.5 flex items-center justify-between gap-3">
              <div className="text-[13px]">
                <p className="text-[#4B6B5A] text-[11px] uppercase tracking-wider">WhatsApp de atendimento</p>
                <p className="font-medium text-[#283A31] tabular-nums">{PROFILE.whatsappDisplay}</p>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#FEFCF5] border border-[#CFE4D8] text-[12.5px] font-medium text-[#283A31] hover:bg-white inline-flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
              >
                {copiedContact ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copiedContact ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            {contactSubmitted ? (
              <div className="py-4 text-center space-y-3">
                <CheckCircle2 size={36} className="mx-auto text-[#3E5E4E]" aria-hidden="true" />
                <h4 className="font-serif text-[23px] text-[#362F34]">Mensagem enviada</h4>
                <p className="text-[13.5px] text-[#574C52]">
                  Obrigada pelo contato, <strong>{contactName}</strong>. Responderei rapidamente para{' '}
                  <strong>{contactInfo}</strong>.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full min-h-[44px] rounded-full bg-[#E9F7F0] text-[#283A31] text-[13.5px] font-medium cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate className="space-y-3">
                <div>
                  <span className="block text-[11.5px] text-[#6A5D63] mb-1.5">
                    Atalhos rápidos de mensagem
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setContactMessage(topic)}
                        className="text-left text-[11.5px] px-3 py-1.5 rounded-full bg-[#F0EBF2] hover:bg-[#E6DFEA] text-[#362E3B] transition-colors duration-150 cursor-pointer"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-name" className="block text-[12px] font-medium text-[#54494F] mb-1">
                    Seu nome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    placeholder="Nome do responsável"
                    className="w-full min-h-[42px] rounded-xl border border-[#DFD5C8] bg-white px-3.5 text-[13.5px] text-[#362F34] placeholder:text-[#9C9096] focus:outline-2 focus:outline-[#B89F80]"
                  />
                  {contactErrors.name && (
                    <p className="mt-1 text-[11.5px] text-[#A4433B]">{contactErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-info" className="block text-[12px] font-medium text-[#54494F] mb-1">
                    WhatsApp ou E-mail
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    value={contactInfo}
                    onChange={(event) => setContactInfo(event.target.value)}
                    placeholder="(11) 99999-9999 ou e-mail"
                    className="w-full min-h-[42px] rounded-xl border border-[#DFD5C8] bg-white px-3.5 text-[13.5px] text-[#362F34] placeholder:text-[#9C9096] focus:outline-2 focus:outline-[#B89F80]"
                  />
                  {contactErrors.contact && (
                    <p className="mt-1 text-[11.5px] text-[#A4433B]">{contactErrors.contact}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-[12px] font-medium text-[#54494F] mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={2}
                    value={contactMessage}
                    onChange={(event) => setContactMessage(event.target.value)}
                    placeholder="Conte brevemente a idade e como posso ajudar."
                    className="w-full rounded-xl border border-[#DFD5C8] bg-white p-3 text-[13.5px] text-[#362F34] placeholder:text-[#9C9096] focus:outline-2 focus:outline-[#B89F80]"
                  />
                  {contactErrors.message && (
                    <p className="mt-1 text-[11.5px] text-[#A4433B]">{contactErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[46px] rounded-full bg-[#E9F7F0] hover:bg-[#D7EFE3] text-[#283A31] text-[14px] font-medium flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>
        )}

        {activeSocial && (
          <div className="pt-5 space-y-4 text-[13.5px] leading-relaxed text-[#4C4248]">
            <p>
              Acompanhe conteúdos sobre desenvolvimento infantil, emoções na pré-adolescência e acolhimento familiar no{' '}
              <strong>{activeSocial.label}</strong>:
            </p>
            <div className="rounded-2xl border border-[#EAD9BF] bg-[#F7E2C0]/50 p-4">
              <p className="text-[11px] uppercase tracking-wider text-[#6D5642]">Perfil oficial</p>
              <p className="font-serif text-[22px] text-[#362F34] mt-0.5">{activeSocial.handle}</p>
            </div>
            <div className="flex gap-2.5">
              <a
                href={activeSocial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] rounded-full bg-[#F7E2C0] hover:bg-[#F2D5A6] text-[#3A2E25] text-[13.5px] font-medium flex items-center justify-center transition-colors duration-150"
              >
                Abrir {activeSocial.label}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 rounded-full border border-[#DFD5C8] text-[#4C4248] text-[13.5px] font-medium hover:bg-[#F0EBF2] transition-colors duration-150 cursor-pointer"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
