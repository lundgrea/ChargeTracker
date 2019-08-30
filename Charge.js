class Charge {
  constructor(obj) {
    this.id = obj.id;
    this.place = obj.place;
    this.charge = obj.charge;
    this.urgent = obj.urgent || false;
  }

  saveToStorage(newCharges) {
    var allCharges = JSON.stringify(newCharges);
    localStorage.setItem('charges', allCharges);
  }

  deleteFromLocalStorage(index) {
    charges.splice(index, 1);
    this.saveToStorage(charges);
  }

  updateUrgencyStorage(index) {
    charges[index].urgent = !charges[index].urgent
    this.saveToStorage(charges)
  }
}