'use strict';
// Client-side validation only. No data is sent or stored by this demonstration site.
const form = document.querySelector('#enquiry-form');
const feedback = document.querySelector('#form-feedback');
const experienceName = new URLSearchParams(location.search).get('experience');
if (experienceName) {
  document.querySelector('#query-type').value = 'Booking';
  document.querySelector('#message').value = `Hello, I would like to enquire about ${experienceName}. Please share further details. Thank you!`;
}
const validators = {
  name: value => value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  phone: value => /^\+?[0-9\s().-]{7,20}$/.test(value.trim()) && (value.match(/\d/g)||[]).length >= 7 ? '' : 'Please enter a valid phone number (at least 7 digits).',
  'query-type': value => value ? '' : 'Please select a query type.',
  message: value => value.trim().length >= 20 ? '' : 'Please write at least 20 characters.'
};
function validateField(field) {
  const error = validators[field.id](field.value);
  const output = document.querySelector(`#${field.id}-error`);
  output.textContent = error;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
}
Object.keys(validators).forEach(id => {
  const field = document.getElementById(id);
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {if(field.getAttribute('aria-invalid') === 'true') validateField(field);});
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = Object.keys(validators).map(id => document.getElementById(id));
  const valid = fields.map(validateField).every(Boolean);
  feedback.className = `form-feedback ${valid ? 'is-success' : 'is-error'}`;
  feedback.setAttribute('role', valid ? 'status' : 'alert');
  feedback.textContent = valid
    ? 'Your enquiry is valid. This is a student demonstration, so no message has been sent. Please connect a backend before accepting real enquiries.'
    : 'Please correct the highlighted fields and try again.';
  if (!valid) fields.find(field => field.getAttribute('aria-invalid') === 'true')?.focus();
});
