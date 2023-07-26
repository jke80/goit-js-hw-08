import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEl: document.querySelector('.feedback-form input'),
  textAreaEl: document.querySelector('.feedback-form textarea'),
};
const FORM_KEY = 'feedback-form-state';

setFormData();

const throttleFunc = throttle(onInputFunc, 500);

refs.formEl.addEventListener('input', throttleFunc);

function onInputFunc() {
  const email = refs.inputEl.value;
  const message = refs.textAreaEl.value;

  const formData = {
    email,
    message,
  };

  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

refs.formEl.addEventListener('submit', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();

  if (localStorage.getItem(FORM_KEY)) {
    console.log(JSON.parse(localStorage.getItem(FORM_KEY)));
    localStorage.removeItem(FORM_KEY);
  } else console.log('localStorage is empty');

  refs.formEl.reset();
}

function setFormData() {
  const formData = JSON.parse(localStorage.getItem(FORM_KEY));
  refs.inputEl.value = formData?.email || '';
  refs.textAreaEl.value = formData?.message || '';
}
