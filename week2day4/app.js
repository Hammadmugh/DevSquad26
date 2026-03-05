const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.querySelectorAll(".custom-tip");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");


buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (numberOfPeople <= 0) {
    peopleError.classList.remove("hidden");
    return;
  }

    // remove active color from all buttons
    buttons.forEach((b) => {
      b.classList.remove("bg-[hsl(172,67%,45%)]");
      b.classList.add("bg-[hsl(183,100%,15%)]", "text-white");
    });

    // add active color to clicked button
    btn.classList.remove("bg-[hsl(183,100%,15%)]", "text-white");
    btn.classList.add("bg-[hsl(172,67%,45%)]", "text-[hsl(183,100%,15%)]");

  });
});

//Calculate Tip When Click On Tip Percentage Button
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let tipvalue = e.target.innerText;
    tipvalue = tipvalue.substr(0, tipvalue.length - 1);

    if (billAmount.value === "") return;
    if (numberOfPeople.value === "" || numberOfPeople.value == 0) {
  peopleError.classList.remove("hidden");
  numberOfPeople.classList.add("outline-red-500");
  return;
}

    calculateTip(
      parseFloat(billAmount.value),
      parseInt(tipvalue),
      parseInt(numberOfPeople.value)
    );
  });
});

//Calculate Tip When User Give Custom Tip Percentage Input
customTipPercentage.forEach((input) => {
  if (numberOfPeople <= 0) {
    peopleError.classList.remove("hidden");
    return;
  }
  input.addEventListener("input", (e) => {

    buttons.forEach((b) => {
      b.classList.remove("bg-[hsl(172,67%,45%)]", "text-[hsl(183,100%,15%)]");
      b.classList.add("bg-[hsl(183,100%,15%)]", "text-white");
    });

    if (billAmount.value === "") {
      resetEverything();
      return;
    }

    if (numberOfPeople.value === "") numberOfPeople.value = 1;

    calculateTip(
      parseFloat(billAmount.value),
      parseFloat(e.target.value),
      parseInt(numberOfPeople.value)
    );

  });
});

//Calculate Tip
function calculateTip(billAmount, tipPercentage, numberOfPeople) {
  if (numberOfPeople <= 0) {
    peopleError.classList.remove("hidden");
    return;
  }
  let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;
}

const peopleError = document.getElementById("peopleError");

numberOfPeople.addEventListener("input", () => {

  if (numberOfPeople.value == 0) {

    // show error
    peopleError.classList.remove("hidden");

    // red border
    numberOfPeople.classList.remove("outline-[hsl(172,67%,45%)]");
    numberOfPeople.classList.add("outline-red-500");

  } else {

    // hide error
    peopleError.classList.add("hidden");

    // restore border
    numberOfPeople.classList.remove("outline-red-500");
    numberOfPeople.classList.add("outline-[hsl(172,67%,45%)]");

  }

});

//Reset Everything
resetButton.addEventListener("click", resetEverything);
function resetEverything() {
  billTipAmount.innerHTML = "$0.00";
  billTotalPerPerson.innerHTML = "$0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercentage.forEach((input) => {
    input.value = "";
  });
}