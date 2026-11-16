import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBookingSummary,
  isValidContact,
  validateBooking,
  validateContactMessage,
} from './booking';

test('isValidContact accepts Brazilian phone numbers and valid emails', () => {
  assert.equal(isValidContact('(11) 98432-7104'), true);
  assert.equal(isValidContact('11984327104'), true);
  assert.equal(isValidContact('responsavel@exemplo.com.br'), true);
  assert.equal(isValidContact('12345'), false);
  assert.equal(isValidContact('email-invalido'), false);
  assert.equal(isValidContact('   '), false);
});

test('validateBooking returns errors for empty or invalid booking inputs', () => {
  const errors = validateBooking({
    name: 'A',
    contact: '123',
    focus: 'crianca',
    preferredDay: '',
    preferredPeriod: 'Manhã (08h – 12h)',
  });

  assert.ok(errors.name);
  assert.ok(errors.contact);
  assert.ok(errors.preferredDay);
});

test('validateBooking passes with valid booking details', () => {
  const errors = validateBooking({
    name: 'Fernanda Souza',
    contact: '(11) 99123-4567',
    focus: 'pre-adolescente',
    preferredDay: 'Quarta',
    preferredPeriod: 'Tarde (13h – 17h)',
  });

  assert.deepEqual(errors, {});
});

test('validateContactMessage requires name, valid contact, and minimum message length', () => {
  const invalid = validateContactMessage({
    name: '',
    contact: 'invalido',
    message: 'Oi',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.contact);
  assert.ok(invalid.message);

  const valid = validateContactMessage({
    name: 'Patricia Lima',
    contact: 'patricia@email.com',
    message: 'Gostaria de saber os horários disponíveis para atendimento infantil online.',
  });
  assert.deepEqual(valid, {});
});

test('formatBookingSummary formats child/pre-teen focus, day, and period cleanly', () => {
  const summary = formatBookingSummary({
    name: 'Camila',
    contact: '11988887777',
    focus: 'crianca',
    preferredDay: 'Quinta',
    preferredPeriod: 'Tarde (13h – 17h)',
  });
  assert.equal(summary, 'Terapia Infantil Online (6–10 anos) • Quinta (Tarde (13h – 17h))');
});
