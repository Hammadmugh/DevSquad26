const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

// Check if a year is leap
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Validate input fields
function validate() {
  let isValid = true;

  const inputs = document.querySelectorAll("input");

  // Required field check
  inputs.forEach((input) => {
    const parent = input.parentElement;
    const small = parent.querySelector("small");

    if (!input.value) {
      input.style.borderColor = "red";
      small.innerText = "This field is required.";
      isValid = false;
    } else {
      input.style.borderColor = "black";
      small.innerText = "";
    }
  });

  const day = parseInt(dayInp.value);
  const month = parseInt(monthInp.value);
  const year = parseInt(yearInp.value);

  const today = new Date();
  const currentYear = today.getFullYear();

  // Year validation
  if (year > currentYear) {
    yearInp.style.borderColor = "red";
    yearInp.parentElement.querySelector("small").innerText =
      "Year cannot be greater than current year.";
    isValid = false;
  }

  if(year < 1){
    yearInp.style.borderColor = "red";
    yearInp.parentElement.querySelector("small").innerText =
      "Must be a valid year.";
    isValid = false;
  }

  // Month validation
  if (month < 1 || month > 12) {
    monthInp.style.borderColor = "red";
    monthInp.parentElement.querySelector("small").innerText =
      "Must be a valid month.";
    isValid = false;
  }

  // Day validation
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) months[1] = 29;

  if (day < 1 || day > months[month - 1]) {
    dayInp.style.borderColor = "red";
    dayInp.parentElement.querySelector("small").innerText =
      `Must be a valid day.`;
    isValid = false;
  }

  return isValid;
}

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();

  if (!validate()) return;

  const inputDay = parseInt(dayInp.value);
  const inputMonth = parseInt(monthInp.value);
  const inputYear = parseInt(yearInp.value);

  const today = new Date();

  // Current date
  let currentDay = today.getDate();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  // Days in each month (current year)
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(currentYear)) months[1] = 29;

  // Borrow days if needed
  if (inputDay > currentDay) {
    currentMonth--;
    currentDay += months[currentMonth - 1];
  }

  // Borrow months if needed
  if (inputMonth > currentMonth) {
    currentYear--;
    currentMonth += 12;
  }

  // Calculate final difference
  const finalDay = currentDay - inputDay;
  const finalMonth = currentMonth - inputMonth;
  const finalYear = currentYear - inputYear;

  // Show result
  dayOtp.innerHTML = finalDay;
  monthOtp.innerHTML = finalMonth;
  yearOtp.innerHTML = finalYear;
}

// Add submit listener
form.addEventListener("submit", handleSubmit);