"use strict";

const dayInput = document.querySelector(".day");
const monthInput = document.querySelector(".month");
const yearInput = document.querySelector(".year");

const parentEl = document.querySelectorAll(".parent-el");

const dayText = document.querySelector(".day-text");
const monthText = document.querySelector(".month-text");
const yearText = document.querySelector(".year-text");

const dayBox = document.querySelector(".day-box");
const monthBox = document.querySelector(".month-box");
const yearBox = document.querySelector(".year-box");

const button = document.querySelector(".show-results-btn");

const daysHTML = document.querySelector(".dash-day");
const monthsHTML = document.querySelector(".dash-month");
const yearsHTML = document.querySelector(".dash-year");

let isAppendedDay = false;
let isAppendedMonth = false;
let isAppendedYear = false;
let paragraph;
let dayParagraph = null;
let monthParagraph = null;
let yearParagraph = null;
let dayIsValid = 0;
let monthIsValid = 0;
let yearIsValid = 0;

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function validateInputValue(value, minValue, maxValue) {
  return value >= minValue && value <= maxValue;
}

function invalidDay(day, month, year) {
  const isLeapYear = leapYear(year);
  if (!isLeapYear && month == 2 && day >= 29) {
    return true;
  } else if ([4, 6, 9, 11].includes(month) && day > 30) {
    return true;
  } else {
    return !validateInputValue(day, 1, 31);
  }
}

const calculateAge = function () {
  const dayOfBirth = document.querySelector(".day-box").value;
  const monthOfBirth = document.querySelector(".month-box").value;
  const yearOfBirth = document.querySelector(".year-box").value;

  // Calculating the actual age
  const now = new Date();
  const birthDate = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);

  const ageInMs = now - birthDate;
  const ageDate = new Date(ageInMs);

  const years = ageDate.getUTCFullYear() - 1970;
  const months = ageDate.getUTCMonth();
  const days = ageDate.getUTCDate();

  function results() {
    daysHTML.textContent = days;
    monthsHTML.textContent = months;
    yearsHTML.textContent = years;
  }

  function noResults() {
    daysHTML.textContent = "- -";
    monthsHTML.textContent = "- -";
    yearsHTML.textContent = "- -";
  }

  function init(inputText, inputBox, inputField, paragraph) {
    inputText.style.color = "";
    inputBox.style.border = "";
    if (paragraph) {
      inputField.removeChild(paragraph);
      paragraph = null;
    }
  }

  // DAY FIELD
  if (
    dayOfBirth === "" ||
    !validateInputValue(dayOfBirth, 1, 31) ||
    invalidDay(dayOfBirth, monthOfBirth, yearOfBirth)
  ) {
    dayIsValid = 0;
    dayText.style.color = "red";
    dayBox.style.border = "1px solid red";
    if (!isAppendedDay) {
      dayParagraph = document.createElement("p");
      isAppendedDay = true;
      noResults();
    }
    dayParagraph.textContent = `${
      dayOfBirth === "" ? "This field is required" : "Must be a valid day"
    }`;
    dayParagraph.classList.add("red-text");
    dayInput.appendChild(dayParagraph);
    noResults();
  } else {
    if ((dayIsValid = 0));
    init(dayText, dayBox, dayInput, dayParagraph);
    dayIsValid = 1;
    isAppendedDay = false;
    if (yearIsValid === 1 && monthIsValid === 1) results();
    else noResults();
    dayParagraph = null;
  }

  // MONTH FIELD
  if (monthOfBirth === "" || !validateInputValue(monthOfBirth, 1, 12)) {
    monthIsValid = 0;
    monthText.style.color = "red";
    monthBox.style.border = "1px solid red";
    if (!isAppendedMonth) {
      monthParagraph = document.createElement("p");
      isAppendedMonth = true;
      noResults();
    }
    monthParagraph.textContent = `${
      monthOfBirth === "" ? "This field is required" : "Must be a valid month"
    }`;
    monthParagraph.classList.add("red-text");
    monthInput.appendChild(monthParagraph);
    noResults();
  } else {
    if ((monthIsValid = 0));
    init(monthText, monthBox, monthInput, monthParagraph);
    monthIsValid = 1;
    isAppendedMonth = false;
    if (dayIsValid === 1 && yearIsValid === 1) results();
    else noResults();
    monthParagraph = null;
  }

  //YEAR FIELD
  if (
    yearOfBirth === "" ||
    !validateInputValue(yearOfBirth, 1000, now.getFullYear())
  ) {
    yearIsValid = 0;
    yearText.style.color = "red";
    yearBox.style.border = "1px solid red";
    if (!isAppendedYear) {
      yearParagraph = document.createElement("p");
      isAppendedYear = true;
    }
    if (yearOfBirth > now.getFullYear()) {
      yearParagraph.textContent = "Must be in the past";
      // noResults();
    } else {
      yearParagraph.textContent = `${
        yearOfBirth === "" ? "This field is required" : "Must be a valid year"
      }`;
      // noResults();
    }
    yearParagraph.classList.add("red-text");
    yearInput.appendChild(yearParagraph);
    noResults();
  } else {
    if ((yearIsValid = 0));
    init(yearText, yearBox, yearInput, yearParagraph);
    yearIsValid = 1;
    isAppendedYear = false;
    if (dayIsValid === 1 && monthIsValid === 1) results();
    else noResults();
    yearParagraph = null;
  }
};

button.addEventListener("click", calculateAge);

parentEl.forEach((parent) => {
  parent.addEventListener("keydown", (e) => {
    if (e.key === "Enter") calculateAge();
  });
});
