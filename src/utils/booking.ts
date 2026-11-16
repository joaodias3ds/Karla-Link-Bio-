export type SessionFocus = 'crianca' | 'pre-adolescente' | 'pais';

export interface BookingInput {
  name: string;
  contact: string;
  focus: SessionFocus;
  preferredDay: string;
  preferredPeriod: string;
  notes?: string;
}

export interface BookingErrors {
  name?: string;
  contact?: string;
  preferredDay?: string;
}

export interface ContactInput {
  name: string;
  contact: string;
  message: string;
}

export interface ContactErrors {
  name?: string;
  contact?: string;
  message?: string;
}

export const AVAILABLE_PERIODS = [
  'Manhã (08h – 12h)',
  'Tarde (13h – 17h)',
  'Noite (18h – 20h)',
];

export const AVAILABLE_DAYS = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
];

export function isValidContact(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
  if (isEmail) return true;

  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

export function validateBooking(input: BookingInput): BookingErrors {
  const errors: BookingErrors = {};
  if (input.name.trim().length < 2) {
    errors.name = 'Informe o nome do responsável.';
  }
  if (!isValidContact(input.contact)) {
    errors.contact = 'Informe um WhatsApp com DDD ou e-mail válido.';
  }
  if (!input.preferredDay.trim()) {
    errors.preferredDay = 'Selecione um dia de preferência.';
  }
  return errors;
}

export function validateContactMessage(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.trim().length < 2) {
    errors.name = 'Informe seu nome.';
  }
  if (!isValidContact(input.contact)) {
    errors.contact = 'Informe um WhatsApp ou e-mail válido.';
  }
  if (input.message.trim().length < 8) {
    errors.message = 'Escreva uma breve mensagem (mínimo 8 caracteres).';
  }
  return errors;
}

export function formatBookingSummary(input: BookingInput): string {
  const focusLabel =
    input.focus === 'crianca'
      ? 'Terapia Infantil Online (6–10 anos)'
      : input.focus === 'pre-adolescente'
        ? 'Pré-adolescentes Online (11–14 anos)'
        : 'Orientação Parental Online';
  return `${focusLabel} • ${input.preferredDay} (${input.preferredPeriod})`;
}
