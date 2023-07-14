import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('input'),
    message: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateFormData();

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(formData);

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
}

function populateFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);

  if (parsedData) {
    refs.email.value = formData.email || '';
    refs.message.value = formData.message || '';
  }
}
