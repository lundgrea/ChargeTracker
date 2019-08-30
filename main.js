const placeInput = document.getElementById('form__input-place')
const chargeInput = document.getElementById('form__input-total')
const submitButton = document.getElementById('form__button-submit')
var mainContent = document.getElementById('main')
var prompt = document.getElementById('main__prompt')
var card = document.querySelector('card')
var charges = JSON.parse(localStorage.getItem('charges')) || []

placeInput.addEventListener('keyup', enableSubmitButton)
chargeInput.addEventListener('keyup', enableSubmitButton)
submitButton.addEventListener('click', saveCharge)
mainContent.addEventListener('click', clickHandler)
window.addEventListener('load', mapLocalStorage(charges))

function enableSubmitButton() {
  if (placeInput.value !== '' && chargeInput.value !== '') {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function saveCharge() {
  event.preventDefault();
  var newCharge = new Charge({
    id: Date.now(),
    place: placeInput.value,
    charge: chargeInput.value,
    star: false 
  })
  charges.push(newCharge);
  appendCard(newCharge)
  newCharge.saveToStorage(charges)
  clearInputs()
  return newCharge
}

function appendCard() {
  
}

function clearInputs() {
  placeInput.value = '';
  chargeInput.value = '';
  enableSubmitButton();
}

function clickHandler() {

}

function mapLocalStorage(listOfCharges) {
  console.log(listOfCharges)
}