const placeInput = document.getElementById('form__input-place');
const chargeInput = document.getElementById('form__input-total');
const submitButton = document.getElementById('form__button-submit');
var mainContent = document.getElementById('main');
var prompt = document.getElementById('main__prompt');
var card = document.querySelector('card');
var charges = JSON.parse(localStorage.getItem('charges')) || []

placeInput.addEventListener('keyup', enableSubmitButton);
chargeInput.addEventListener('keyup', enableSubmitButton);
submitButton.addEventListener('click', saveCharge);
mainContent.addEventListener('click', clickHandler);
window.addEventListener('load', mapLocalStorage(charges));


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
    urgent: false 
  })
  charges.push(newCharge);
  appendCard(newCharge);
  newCharge.saveToStorage(charges);
  clearInputs();
  return newCharge;
}

function appendCard(charge) {
  prompt.classList.add('hidden');
  const urgent = "https://image.flaticon.com/icons/svg/64/64005.svg"
  const nonUrgent = "https://image.flaticon.com/icons/svg/149/149222.svg"
  const urgencyLink = charge.urgent ? urgent : nonUrgent
  const urgencyClass  = charge.urgent ? "urgent" : "card"
  main.insertAdjacentHTML('afterbegin', 
  `<article data-id=${charge.id} id="card" class="card ${urgencyClass}">
    <img class="card__button card__button-delete" src="https://image.flaticon.com/icons/svg/61/61795.svg" alt="delete button"/>
    <img class="card__button card__button-urgency" src="${urgencyLink}" alt="urgency button"/>
    <h3>${charge.place}</h3>
    <h4>$${charge.charge}</h4>
  </article>`);
}

function clearInputs() {
  placeInput.value = '';
  chargeInput.value = '';
  enableSubmitButton();
}

function clickHandler(event) {
  deleteCard(event);
  updateUrgency(event);
}

function deleteCard() {
  if (event.target.closest('.card__button-delete')) {
    const targetCard = event.target.closest('.card');
    const targetedCardID = targetCard.dataset.id;
    const targetedCardIndex = charges.findIndex(charge => charge.id == targetedCardID);
    const selectCard = charges.find(charge => charge.id == targetedCardID);
    selectCard.deleteFromLocalStorage(targetedCardIndex)
    targetCard.remove();
    event.preventDefault();
    if(charges.length === 0) {
      prompt.classList.remove('hidden');
    }
  }
}

function updateUrgency() {
  if (event.target.closest('.card__button-urgency')) {
    const targetCard = event.target.closest('.card');
    const targetedCardID = targetCard.dataset.id;
    const targetedCardIndex = charges.findIndex(charge => charge.id == targetedCardID);
    const selectCard = charges.find(charge => charge.id == targetedCardID);
    selectCard.updateUrgencyStorage(targetedCardIndex)
    mainContent.innerHTML = '';
    mapLocalStorage(charges)
  }      
}

function mapLocalStorage(listOfCharges) {
  let newList = listOfCharges.map(obj => {
    const retreivedCharge = new Charge(obj);
    appendCard(retreivedCharge);
    return retreivedCharge
  })
  charges = newList
  return charges
}
